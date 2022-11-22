import React, { useEffect, useState } from "react";
import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
  Button,
  Spinner,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import auth_token, { api } from "../../API/APIToken";
import { SidebarContent, MobileNav } from "../Templates/HeaderComponent";
import axios from "axios";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function VisitorDetailsPage(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const id = props.match.params.id;
  const [showsnipper, setshowsnipper] = useState(false);
  const [visitor_det, setvisitors_det] = useState(0);
  const [username, setusername] = useState("");

  const jwttoken = cookies.get("jwttoken");
  //console.log(jwttoken);
  if (jwttoken === undefined) {
    props.history.push("/loginpage");
  }

  const userdata = () => {
    var config = {
      method: "get",
      url: `${api}getreceptionistbytoken/${jwttoken}`,
      headers: {
        token: auth_token,
      },
    };
    axios(config)
      .then(function (response) {
        //console.log(response.data);
        setusername(
          response.data.userdata.firstname +
            " " +
            response.data.userdata.lastname
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  //console.log(username);

  const getvisitordet = () => {
    var config = {
      method: "get",
      url: `${api}getvisitorbyid/${id}`,
      headers: {
        token: auth_token,
      },
    };
    axios(config)
      .then(function (response) {
        //console.log(response.data);
        setvisitors_det(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  //console.log(visitor_det);

  useEffect(() => {
    userdata();
    getvisitordet();
  }, []);

  function Checkin(id) {
    alert("Are you sure to check in now");
    //setshowsnipper(true);
    const data = { status: 1, checkindatetime: Date.now() };
    var config = {
      method: "patch",
      url: `${api}editvisitor/${id}`,
      headers: {
        token: auth_token,
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
        if (response.status === 202) {
          toast.success("Visitor Check In Successfully !");
          getvisitordet();
          //setshowsnipper(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function Checkout(id) {
    alert("Are you sure to check out now");
    //setshowsnipper(true);
    const data = { status: 0, checkoutdatetime: Date.now() };
    var config = {
      method: "patch",
      url: `${api}editvisitor/${id}`,
      headers: {
        token: auth_token,
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
        if (response.status === 202) {
          toast.success("Visitor Check Out Successfully !");
          getvisitordet();
          //setshowsnipper(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
        {/*sidebar data component */}
        <SidebarContent
          onClose={() => onClose}
          display={{ base: "none", md: "block" }}
        />
        <Drawer
          autoFocus={false}
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full"
        >
          <DrawerContent>
            <SidebarContent onClose={onClose} />
          </DrawerContent>
        </Drawer>
        {/* mobile nav */}
        <MobileNav onOpen={onOpen} user={username} />
        {/*main data component*/}
        <Box ml={{ base: 0, md: 60 }} p="4">
          {/*main data part */}
          <section>
            <div class="container py-2">
              <div class="row">
                <div class="col-lg-4">
                  <div class="card mb-4">
                    <div class="card-body ">
                      <h5 class="my-3">
                        Hii,{" "}
                        {visitor_det && visitor_det[0] && visitor_det[0].name}
                      </h5>
                      <p class="text-muted mb-1">Welcome To Our Hotel</p>
                      <p class="text-muted mb-4">Enjoy & Fun</p>

                      {visitor_det &&
                      visitor_det[0] &&
                      visitor_det[0].status === 0 ? (
                        <Button
                          colorScheme="teal"
                          variant="solid"
                          size="sm"
                          onClick={() =>
                            Checkin(
                              visitor_det &&
                                visitor_det[0] &&
                                visitor_det[0]._id
                            )
                          }
                        >
                          Check In{" "}
                          {showsnipper === true ? (
                            <Spinner
                              color="white.500"
                              size="sm"
                              style={{ marginLeft: "10px" }}
                            />
                          ) : (
                            ""
                          )}
                        </Button>
                      ) : (
                        <Button
                          colorScheme="teal"
                          variant="solid"
                          size="sm"
                          onClick={() =>
                            Checkout(
                              visitor_det &&
                                visitor_det[0] &&
                                visitor_det[0]._id
                            )
                          }
                        >
                          Check Out{" "}
                          {showsnipper === true ? (
                            <Spinner
                              color="white.500"
                              size="sm"
                              style={{ marginLeft: "10px" }}
                            />
                          ) : (
                            ""
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                <div class="col-lg-8">
                  <div class="card mb-4">
                    <div class="card-body">
                      <div class="row">
                        <div class="col-sm-3">
                          <p class="mb-0">Name</p>
                        </div>
                        <div class="col-sm-9">
                          <p class="text-muted mb-0">
                            {visitor_det &&
                              visitor_det[0] &&
                              visitor_det[0].name}
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div class="row">
                        <div class="col-sm-3">
                          <p class="mb-0">Email</p>
                        </div>
                        <div class="col-sm-9">
                          <p class="text-muted mb-0">
                            {" "}
                            {visitor_det &&
                              visitor_det[0] &&
                              visitor_det[0].email}
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div class="row">
                        <div class="col-sm-3">
                          <p class="mb-0">Number</p>
                        </div>
                        <div class="col-sm-9">
                          <p class="text-muted mb-0">
                            {visitor_det &&
                              visitor_det[0] &&
                              visitor_det[0].number}
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div class="row">
                        <div class="col-sm-3">
                          <p class="mb-0">DOB</p>
                        </div>
                        <div class="col-sm-9">
                          <p class="text-muted mb-0">
                            {moment(
                              visitor_det &&
                                visitor_det[0] &&
                                visitor_det[0].dob
                            ).format("DD/MM/YYYY")}
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div class="row">
                        <div class="col-sm-3">
                          <p class="mb-0">Age</p>
                        </div>
                        <div class="col-sm-9">
                          <p class="text-muted mb-0">
                            {visitor_det &&
                              visitor_det[0] &&
                              visitor_det[0].age}
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div class="row">
                        <div class="col-sm-3">
                          <p class="mb-0">Address</p>
                        </div>
                        <div class="col-sm-9">
                          <p class="text-muted mb-0">
                            {visitor_det &&
                              visitor_det[0].address +
                                " , " +
                                visitor_det[0].city +
                                " , " +
                                visitor_det[0].state +
                                " , " +
                                visitor_det[0].country +
                                " , " +
                                visitor_det[0].postalcode}
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div class="row">
                        <div class="col-sm-3">
                          <p class="mb-0">Registration date time</p>
                        </div>
                        <div class="col-sm-9">
                          <p class="text-muted mb-0">
                            {moment(
                              visitor_det &&
                                visitor_det[0] &&
                                visitor_det[0].datetime
                            ).format("DD/MM/YYYY, hh:mm")}
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div class="row">
                        <div class="col-sm-3">
                          <p class="mb-0">Check In date time</p>
                        </div>
                        <div class="col-sm-9">
                          <p class="text-muted mb-0">
                            {moment(
                              visitor_det &&
                                visitor_det[0] &&
                                visitor_det[0].checkindatetime
                            ).format("DD/MM/YYYY") === "01/01/1970"
                              ? ""
                              : moment(
                                  visitor_det &&
                                    visitor_det[0] &&
                                    visitor_det[0].checkindatetime
                                ).format("DD/MM/YYYY,hh:mm")}
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div class="row">
                        <div class="col-sm-3">
                          <p class="mb-0">Check out date time</p>
                        </div>
                        <div class="col-sm-9">
                          <p class="text-muted mb-0">
                            {moment(
                              visitor_det &&
                                visitor_det[0] &&
                                visitor_det[0].checkindatetime
                            ).format("DD/MM/YYYY") === "01/01/1970"
                              ? ""
                              : moment(
                                  visitor_det &&
                                    visitor_det[0] &&
                                    visitor_det[0].checkoutdatetime
                                ).format("DD/MM/YYYY, hh:mm")}
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div class="row">
                        <div class="col-sm-3">
                          <p class="mb-0">Purpose to visit</p>
                        </div>
                        <div class="col-sm-9">
                          <p class="text-muted mb-0">
                            {visitor_det &&
                              visitor_det[0] &&
                              visitor_det[0].purposetovisit}
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div class="row">
                        <div class="col-sm-3">
                          <p class="mb-0">Assets</p>
                        </div>
                        <div class="col-sm-9">
                          <p class="text-muted mb-0">
                            {visitor_det &&
                              visitor_det[0] &&
                              visitor_det[0].assets}
                          </p>
                        </div>
                      </div>
                      <hr />
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4">
                  <div class="card mb-4 mb-md-0">
                    <div class="card-body">
                      <p class="mb-4">
                        <span class="text-primary font-italic me-1">
                          <b>Generate</b>
                        </span>
                        QR Code For Detail
                      </p>
                      <Link to={`/dashboard/scanqrcode/${id}`}>
                        <Button
                          colorScheme="facebook"
                          // onClick={() =>
                          //   SensmailandGenQRcode(
                          //     visitor_det && visitor_det[0] && visitor_det[0]._id
                          //   )
                          // }
                        >
                          Generate QR Code{" "}
                          {showsnipper === true ? (
                            <Spinner
                              color="white.500"
                              size="sm"
                              style={{ marginLeft: "10px" }}
                            />
                          ) : (
                            ""
                          )}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="card mb-4 mb-md-0">
                    <div class="card-body">
                      <p class="mb-4">
                        <span class="text-primary font-italic me-1">
                          {" "}
                          <b>Edit</b>
                        </span>
                        Visitor
                      </p>
                      <Link to={`/dashboard/visitor/editvisitor/${id}`}>
                        <Button colorScheme="facebook">Edit</Button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="card mb-4 mb-md-0">
                    <div class="card-body">
                      <p class="mb-4">
                        <span class="text-primary font-italic me-1">
                          <b>Checkout</b>
                        </span>
                        Visitor
                      </p>
                      {/* <Link to={`/dashboard/visitor/checkout/${id}`}> */}
                      <Button
                        colorScheme="facebook"
                        onClick={() =>
                          Checkout(
                            visitor_det && visitor_det[0] && visitor_det[0]._id
                          )
                        }
                      >
                        Check Out{" "}
                        {showsnipper === true ? (
                          <Spinner
                            color="white.500"
                            size="sm"
                            style={{ marginLeft: "10px" }}
                          />
                        ) : (
                          ""
                        )}
                      </Button>
                      {/* </Link> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Box>
      </Box>
      <ToastContainer />
    </>
  );
}

export default VisitorDetailsPage;
