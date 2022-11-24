import React, { useEffect, useState } from "react";
import { api } from "../../../API/APIToken";
import auth_token from "../../../API/APIToken";
import axios from "axios";
import {
  Box,
  Button,
  Flex,
  Heading,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { AiTwotoneDelete } from "react-icons/ai";
import { BiEdit, BiShow } from "react-icons/bi";
import moment from "moment";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const getrecvisitorsendpoint = "getrecentcheckingvisitors";
const deletevisitorsendpoint = "deletevisitor";

function Headercard() {
  const [recentvisitors, setrecentvisitors] = useState([]);
  const [totalrecentvisitors, settotalrecentvisitors] = useState(0);
  const [datamsg, setdatamsg] = useState("");

  const getrecentvisitors = () => {
    var config = {
      method: "get",
      url: `${api}${getrecvisitorsendpoint}`,
      headers: {
        token: auth_token,
      },
    };
    axios(config)
      .then(function (response) {
        //console.log(response.data);
        setrecentvisitors(response.data.recent_visitor);
        settotalrecentvisitors(response.data.recent_visitor.length);
      })
      .catch(function (error) {
        console.log(error);
        setdatamsg("Data Not Found");
      });
  };

  useEffect(() => {
    getrecentvisitors();
  }, []);

  function Deletevisitor(id) {
    //alert(id);
    const visitordelete = window.confirm("Are You Sure To Delete ");
    if (visitordelete) {
      var config = {
        method: "delete",
        url: `${api}${deletevisitorsendpoint}/${id}`,
        headers: {
          token: auth_token,
        },
      };
      axios(config)
        .then(function (response) {
          console.log(response);
          if (response.status === 200) {
            toast.success(" Visitor Deleted Successfull !");
            getrecentvisitors();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  return (
    <>
      <Flex>
        <Box>
          <div className="card l-bg-blue-dark">
            <div className="card-statistic-3 p-4">
              <div className="">
                <h5 className="card-title mb-0">
                  <b>Recent Checking Visitors : {totalrecentvisitors}</b>
                </h5>
              </div>
            </div>
          </div>
        </Box>
        <Spacer />
        <Box>
          <Link to="/dashboard/visitors/addvisitor">
            <Button colorScheme="blue">Add New Visitor + </Button>
          </Link>
        </Box>
      </Flex>
      <hr />
      <Stack py={5}>
        <Heading size={"1xl"}>Recent Checking Visitor List</Heading>
      </Stack>
      <table class="table align-middle mb-0 bg-white">
        <thead class="bg-light">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Number</th>
            <th>Age</th>
            <th>Check In Date-Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {recentvisitors &&
            recentvisitors.map((data, key) => {
              return (
                <tr key={key}>
                  <td>
                    <div class="d-flex align-items-center">
                      <img
                        src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                        alt=""
                        style={{ width: "40px", height: "40px" }}
                        class="rounded-circle"
                      />
                      <div class="ms-3">
                        <p class="fw-bold mb-1">{data.name}</p>
                        {/* <p class="text-muted mb-0">Software engineer</p> */}
                      </div>
                    </div>
                  </td>
                  <td>
                    <p class="fw-normal mb-1">{data.email}</p>
                  </td>
                  <td>{data.number}</td>
                  <td>{data.age}</td>
                  <td>
                    {" "}
                    {moment(data.checkindatetime).format("DD/MM/YYYY") +
                      " - " +
                      moment(data.checkindatetime).format("h:mm a")}
                  </td>
                  <td style={{ textAlign: "-webkit-center" }}>
                    <Link
                      style={{ fontSize: "22px" }}
                      to={`/dashboard/visitor/editvisitor/${data._id}`}
                    >
                      <BiEdit />
                    </Link>
                    <Link
                      to={`/dashboard/visitors/visitordetails/${data._id}`}
                      style={{ fontSize: "22px" }}
                    >
                      <BiShow />
                    </Link>
                    <Text
                      onClick={() => Deletevisitor(data._id)}
                      style={{ fontSize: "22px", cursor: "pointer" }}
                      _hover={{
                        color: "blue.600",
                      }}
                    >
                      <AiTwotoneDelete />
                    </Text>
                  </td>
                </tr>
              );
            })}
          <Text mt={2} mb={2} ml={1}>
            {" "}
            {datamsg !== "" ? <tr>{datamsg}</tr> : ""}
          </Text>
        </tbody>
      </table>
      <ToastContainer />
    </>
  );
}

export default Headercard;
