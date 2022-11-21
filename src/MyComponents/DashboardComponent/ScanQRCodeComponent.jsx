import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
  Stack,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";
import auth_token, { api } from "../../API/APIToken";
import { SidebarContent, MobileNav } from "../Templates/HeaderComponent";
import QRCode from "qrcode.react";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function ScanQRCodePage(props) {
  const jwttoken = cookies.get("jwttoken");
  //console.log(jwttoken);
  if (jwttoken === undefined) {
    props.history.push("/loginpage");
  }
  const { isOpen, onOpen, onClose } = useDisclosure();
  const id = props.match.params.id;
  const [username, setusername] = useState("");

  useEffect(() => {
    sendmail();
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
        setusername(response.data.user);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  //console.log(username);

  const visitordet = {
    id: id,
    qrcode: `https://myassessment.vercel.app/dashboard/visitors/visitordetails/${id}`,
  };

  const sendmail = () => {
    var config = {
      method: "post",
      url: `${api}sendmail`,
      headers: {
        token: auth_token,
      },
      data: visitordet,
    };
    axios(config)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
          <Flex align={"center"} justify={"center"} py={12}>
            <Stack
              boxShadow={"2xl"}
              bg={useColorModeValue("white", "gray.700")}
              rounded={"xl"}
              p={10}
              spacing={8}
              align={"center"}
            >
              <Stack align={"center"} spacing={2}>
                <Heading
                  textTransform={"uppercase"}
                  fontSize={"3xl"}
                  color={useColorModeValue("gray.800", "gray.200")}
                >
                  Scan QR code and get details
                </Heading>
                {/* <Box
                  bg={useColorModeValue("white", "gray.800")}
                  borderWidth="1px"
                  rounded="lg"
                  shadow="lg"
                  position="relative"
                >
                  <Image
                    src={visitor_det}
                    roundedTop="lg"
                    style={{ width: "145px;" }}
                  />
                </Box> */}
                <QRCode
                  value={`https://myassessment.vercel.app/dashboard/visitors/visitordetails/${id}`}
                  style={{ marginRight: 50 }}
                />
              </Stack>
              <Stack
                spacing={4}
                direction={{ base: "column", md: "row" }}
                w={"full"}
              ></Stack>
            </Stack>
          </Flex>
        </Box>
      </Box>
    </>
  );
}
export default ScanQRCodePage;
