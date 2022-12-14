import React, { useEffect, useState } from "react";
import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
} from "@chakra-ui/react";

import { SidebarContent, MobileNav } from "../Templates/HeaderComponent";
import Homepage from "./HomePage";
import Cookies from "universal-cookie";
import auth_token, { api } from "../../API/APIToken";
import axios from "axios";
const cookies = new Cookies();

export default function Dashboard(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [username, setusername] = useState("");
  const [userimg, setuserimg] = useState("");
  const jwttoken = cookies.get("jwttoken");
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
  useEffect(() => {
    userdata();
  }, []);
  //console.log(username);

  return (
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
        <Homepage />
      </Box>
    </Box>
  );
}
