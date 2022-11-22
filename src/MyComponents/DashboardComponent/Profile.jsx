import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
  Button,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import auth_token, { api } from "../../API/APIToken";
import { SidebarContent, MobileNav } from "../Templates/HeaderComponent";
import Cookies from "universal-cookie";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { AiFillLock } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const cookies = new Cookies();

function Profile(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const id = props.match.params.id;
  const [username, setusername] = useState("");
  const [usersdata, setuserdata] = useState("");
  const [showsnipper, setshowsnipper] = useState(false);
  const jwttoken = cookies.get("jwttoken");
  //console.log(jwttoken);
  if (jwttoken === undefined) {
    props.history.push("/loginpage");
  }

  useEffect(() => {
    userdata();
  }, []);

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
        setuserdata(response.data.userdata);
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
  //console.log(usersdata);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: usersdata.firstname,
      lastname: usersdata.lastname,
      email: usersdata.email,
      number: usersdata.number,
      dob: usersdata.dob,
      age: usersdata.age,
      address1: usersdata.address1,
      address2: usersdata.address2,
      country: usersdata.country,
      state: usersdata.state,
      city: usersdata.city,
      postalcode: usersdata.postalcode,
    },
    onSubmit: (values) => {
      setshowsnipper(true);
      //alert(JSON.stringify(values, null, 2));
      const data = values;
      //console.log(data);
      //return false;
      axios({
        method: "put",
        url: `${api}updatereceptionist/${usersdata._id}`,
        data: data,
        headers: {
          token: auth_token,
        },
      })
        .then(function (response) {
          //console.log(response);
          if (response.status === 202) {
            toast.success(" User Profile updated  !");
            setshowsnipper(false);
            //resetForm({ values: "" });
          } else if (response.status === 500) {
            setshowsnipper(false);
            toast.error("server not responding");
          }
        })
        .catch(function (error) {
          setshowsnipper(false);
          toast.error("server not responding");
        });
    },
  });

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
          <div class="row gutters">
            <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
              <div class="card ">
                <div class="card-body">
                  <div class="account-settings">
                    <div class="user-profile">
                      <div class="user-avatar">
                        <img
                          src="https://bootdey.com/img/Content/avatar/avatar7.png"
                          alt="Maxwell Admin"
                        />
                      </div>
                      <h5 class="user-name">Hii, {usersdata.firstname}</h5>
                      <h6 class="user-email">{usersdata.email}</h6>
                    </div>
                    <div>
                      <Button
                        leftIcon={<AiFillLock />}
                        colorScheme="teal"
                        variant="solid"
                      >
                        Change Password
                      </Button>
                    </div>
                    <div className="mt-3">
                      <Button
                        leftIcon={<FaUserAlt />}
                        colorScheme="pink"
                        variant="solid"
                      >
                        Change Username
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
              <form onSubmit={formik.handleSubmit}>
                <div class="card ">
                  <div class="card-body">
                    <div class="row gutters">
                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <h6 class="mb-3 text-primary">Personal Details</h6>
                      </div>
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div class="form-group">
                          <label for="fullName">First Name </label>
                          <input
                            type="text"
                            class="form-control"
                            onChange={formik.handleChange}
                            value={formik.values.firstname}
                          />
                        </div>
                      </div>
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div class="form-group">
                          <label for="eMail">Last Name</label>
                          <input
                            type="text"
                            class="form-control"
                            onChange={formik.handleChange}
                            value={formik.values.lastname}
                          />
                        </div>
                      </div>
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mt-3">
                        <div class="form-group">
                          <label for="phone">Email</label>
                          <input
                            type="email"
                            class="form-control"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                          />
                        </div>
                      </div>
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mt-3">
                        <div class="form-group">
                          <label for="website">Number</label>
                          <input
                            type="text"
                            class="form-control"
                            onChange={formik.handleChange}
                            value={formik.values.number}
                          />
                        </div>
                      </div>
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mt-3">
                        <div class="form-group">
                          <label for="Street">Date Of Birth</label>
                          <input
                            type="date"
                            name="dob"
                            class="form-control"
                            onChange={formik.handleChange}
                            value={formik.values.dob}
                          />
                        </div>
                      </div>
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mt-3">
                        <div class="form-group">
                          <label for="ciTy">Age</label>
                          <input
                            type="text"
                            class="form-control"
                            onChange={formik.handleChange}
                            value={formik.values.age}
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row gutters">
                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <h6 class="mt-4 mb-3 text-primary">Address</h6>
                      </div>
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div class="form-group">
                          <label for="Street">Address1</label>
                          <input
                            type="text"
                            class="form-control"
                            onChange={formik.handleChange}
                            value={formik.values.address1}
                          />
                        </div>
                      </div>
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div class="form-group">
                          <label for="ciTy">Address2</label>
                          <input
                            type="text"
                            class="form-control"
                            onChange={formik.handleChange}
                            value={formik.values.address2}
                          />
                        </div>
                      </div>
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mt-3">
                        <div class="form-group">
                          <label for="sTate">Country</label>
                          <br />
                          <CountryDropdown
                            name="country"
                            defaultOptionLabel="Select a country"
                            value={formik.values.country}
                            onChange={(_, e) => formik.handleChange(e)}
                            style={{
                              width: "365px",
                              borderRadius: "4px",
                              height: "39px",
                              border: "0.5px solid #d0dfe3",
                            }}
                          />
                        </div>
                      </div>
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mt-3">
                        <div class="form-group">
                          <label for="zIp">State</label>
                          <br />
                          <RegionDropdown
                            name="state"
                            defaultOptionLabel="select a state"
                            blankOptionLabel="Select a state"
                            country={formik.values.country}
                            value={formik.values.state}
                            onChange={(_, e) => formik.handleChange(e)}
                            style={{
                              width: "365px",
                              borderRadius: "4px",
                              height: "39px",
                              border: "0.5px solid #d0dfe3",
                            }}
                          />
                        </div>
                      </div>
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mt-3">
                        <div class="form-group">
                          <label for="Street">City</label>
                          <input
                            type="text"
                            class="form-control"
                            onChange={formik.handleChange}
                            value={formik.values.city}
                          />
                        </div>
                      </div>
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mt-3">
                        <div class="form-group">
                          <label for="ciTy">Postal Code</label>
                          <input
                            type="text"
                            class="form-control"
                            onChange={formik.handleChange}
                            value={formik.values.postalcode}
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row gutters">
                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-4 mb-0 pb-0">
                        <div class="text-right">
                          <button
                            type="submit"
                            id="submit"
                            name="submit"
                            class="btn btn-primary w-100"
                          >
                            <b>
                              Update{" "}
                              {showsnipper === true ? (
                                <Spinner
                                  color="white.500"
                                  size="sm"
                                  style={{ marginLeft: "10px" }}
                                />
                              ) : (
                                ""
                              )}
                            </b>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Box>
      </Box>
      <ToastContainer />
    </>
  );
}
export default Profile;
