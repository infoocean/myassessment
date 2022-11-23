import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Stack,
  Text,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import axios from "axios";
import auth_token, { api } from "../../API/APIToken";
import { SidebarContent, MobileNav } from "../Templates/HeaderComponent";
import Cookies from "universal-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
const cookies = new Cookies();

function ChangePasswordComp(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [username, setusername] = useState("");
  const [usersdata, setuserdata] = useState("");
  const [showsnipper, setshowsnipper] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showcPassword, setShowcPassword] = useState(false);
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
  const validate = (values) => {
    const errors = {};
    const strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{10,})"
    );
    if (!values.password) {
      errors.password = "Password feild is required  **";
    } else if (!strongRegex.test(values.password)) {
      errors.password =
        "Password should have at least 10 character and contain one uppercase, one lowercase, one number and one special character**";
    }

    if (!values.confirmpassword) {
      errors.confirmpassword = "Confirm password feild is required  **";
    }

    if (values.confirmpassword) {
      if (values.password !== values.confirmpassword) {
        errors.confirmpassword =
          "Password and Confirm Password are not match **";
      }
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmpassword: "",
    },
    validate,
    onSubmit: (values) => {
      setshowsnipper(true);
      //alert(JSON.stringify(values, null, 2));
      const data = {
        password: values.password,
        confirmpassword: values.confirmpassword,
      };

      var config = {
        method: "post",
        url: `${api}changepassword/${usersdata._id}`,
        headers: {
          token: auth_token,
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          //console.log(response.data);
          setshowsnipper(false);
          toast.success("Password Change Successfull!");
          setTimeout(() => {
            props.history.push("/profile");
          }, "2000");
        })
        .catch(function (error) {
          console.log(error);
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
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
              <Flex
                align={"center"}
                justify={"center"}
                bg={useColorModeValue("gray.50", "gray.800")}
              >
                <Stack
                  spacing={4}
                  w={"full"}
                  maxW={"md"}
                  rounded={"xl"}
                  boxShadow={"lg"}
                  p={6}
                  my={5}
                >
                  <Heading
                    lineHeight={1.1}
                    fontSize={{ base: "2xl", md: "3xl" }}
                    mb={3}
                  >
                    Change Password
                  </Heading>
                  <form onSubmit={formik.handleSubmit}>
                    <FormControl id="password">
                      <FormLabel mb={0} pb={0}>
                        Password{" "}
                        <Text as={"span"} style={{ color: "red" }}>
                          *
                        </Text>
                      </FormLabel>
                      <InputGroup>
                        <Input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.password}
                        />
                        <InputRightElement h={"full"}>
                          <Button
                            variant={"ghost"}
                            onClick={() =>
                              setShowPassword((showPassword) => !showPassword)
                            }
                          >
                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                    <span
                      style={{
                        color: "red",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      {formik.errors.password ? (
                        <div>{formik.errors.password}</div>
                      ) : null}
                    </span>
                    <FormControl id="confirmnewpassword" mt={4}>
                      <FormLabel mb={0} pb={0}>
                        Confirm Password{" "}
                        <Text as={"span"} style={{ color: "red" }}>
                          *
                        </Text>
                      </FormLabel>
                      <InputGroup>
                        <Input
                          type={showcPassword ? "text" : "password"}
                          id="confirmpassword"
                          name="confirmpassword"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.confirmpassword}
                        />
                        <InputRightElement h={"full"}>
                          <Button
                            variant={"ghost"}
                            onClick={() =>
                              setShowcPassword(
                                (showcPassword) => !showcPassword
                              )
                            }
                          >
                            {showcPassword ? <ViewIcon /> : <ViewOffIcon />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                    <Stack h={2}>
                      <span
                        style={{
                          color: "red",
                          fontSize: "13px",
                          fontWeight: "bold",
                        }}
                      >
                        {formik.errors.confirmpassword ? (
                          <div>{formik.errors.confirmpassword}</div>
                        ) : null}
                      </span>
                    </Stack>
                    <Stack spacing={6} mt={5}>
                      <Button
                        bg={"blue.400"}
                        color={"white"}
                        _hover={{
                          bg: "blue.500",
                        }}
                        type="submit"
                      >
                        Submit{" "}
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
                    </Stack>
                  </form>
                </Stack>
                <ToastContainer />
              </Flex>
            </div>
          </div>
        </Box>
      </Box>
      <ToastContainer />
    </>
  );
}
export default ChangePasswordComp;
