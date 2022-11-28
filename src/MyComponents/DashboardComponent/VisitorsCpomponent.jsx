import React, { useEffect, useState } from "react";
import {
  Flex,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
  Container,
  Spacer,
  Box,
  Button,
  Text,
} from "@chakra-ui/react";

import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import auth_token, { api } from "../../API/APIToken";
import { SidebarContent, MobileNav } from "../Templates/HeaderComponent";
import axios from "axios";
import SearchApp from "./VisitorComp/Searchvisitortable";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const getvisitorsendpoint = "getvisitors";

function VisitorsPage(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [getvisitors, setgetvisitors] = useState([]);
  const [username, setusername] = useState("");
  const [userimg, setuserimg] = useState("");
  const [datamsg, setdatamsg] = useState("");

  const jwttoken = cookies.get("jwttoken");
  //console.log(jwttoken);
  if (jwttoken === undefined) {
    props.history.push("/loginpage");
  }

  const userdata = () => {
    var config = {
      method: "get",
      url: `${api}getreceptionistbytoken`,
      headers: {
        Authorization: auth_token,
        "x-access-token": jwttoken,
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
        setuserimg(response.data.userdata.image);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  //console.log(username);

  const getvisitorsdata = () => {
    var config = {
      method: "get",
      url: `${api}${getvisitorsendpoint}`,
      headers: {
        Authorization: auth_token,
      },
    };
    axios(config)
      .then(function (response) {
        //console.log(response.data);
        setgetvisitors(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
        setdatamsg("Data Not Found");
      });
  };
  useEffect(() => {
    getvisitorsdata();
    userdata();
  }, []);
  //console.log(getvisitors);

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
        <MobileNav onOpen={onOpen} user={username} userimg={userimg} />
        {/*main data component*/}
        <Box ml={{ base: 0, md: 60 }} p="4">
          {/*main data part */}
          <Container maxW="7xl">
            <Flex>
              <Box>
                <Link to="/dashboard/home">
                  <Button
                    type="submit"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    <IoMdArrowRoundBack /> Recent Check In Visitor
                  </Button>
                </Link>
              </Box>
              <Spacer />
              <Box>
                <Link to="/dashboard/visitors/addvisitor">
                  <Button
                    type="submit"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Add Visitor +
                  </Button>
                </Link>
              </Box>
            </Flex>
          </Container>
          <SearchApp data={getvisitors} datamsg={datamsg} />
          <Text ml={5} mt={2}>
            {datamsg !== "" ? <tr>{datamsg}</tr> : ""}
          </Text>
        </Box>
      </Box>
    </>
  );
}
export default VisitorsPage;
