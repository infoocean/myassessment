import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  Spinner,
  InputGroup,
  InputRightElement,
  Checkbox,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { connect } from "react-redux";
import { login } from "../../Redux/Actions/useractions";
import Cookies from "universal-cookie";
const cookies = new Cookies();
class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      showsnipper: false,
    };
  }
  render() {
    let autofillemail;
    if (
      this.props &&
      this.props.userLoginReducer &&
      this.props.userLoginReducer.userInfo &&
      this.props.userLoginReducer.userInfo.data &&
      this.props.userLoginReducer.userInfo.data.email
    ) {
      autofillemail = this.props.userLoginReducer.userInfo.data.email;
    } else {
      autofillemail = "";
    }
    //console.log(this.props.userLoginReducer.userInfo.data.email);
    return (
      <>
        <Flex minH={"90vh"} align={"center"} justify={"center"}>
          <Stack spacing={5} mx={"auto"} maxW={"md"} py={5} px={6}>
            <Stack align={"center"}>
              <Heading fontSize={"3xl"}>Receptionist Login account</Heading>
            </Stack>
            <Box rounded={"lg"} boxShadow={"lg"} p={8}>
              <Stack spacing={4}>
                <Formik
                  initialValues={{
                    usernameemail: autofillemail,
                    password: "",
                  }}
                  validate={(values) => {
                    const errors = {};
                    if (!values.usernameemail) {
                      errors.usernameemail =
                        "User Name / Email feild is required  **";
                    }
                    if (!values.password) {
                      errors.password = "Password feild is required  **";
                    }
                    return errors;
                  }}
                  onSubmit={async (values, { setSubmitting, resetForm }) => {
                    this.setState({ showsnipper: true });
                    const reqdata = {
                      usernameemail: values.usernameemail,
                      password: values.password,
                    };
                    this.props.login(reqdata, (response) => {
                      if (response.status === 200) {
                        //console.log(response.data.token);
                        //return false;
                        toast.success("Login Successfull !");
                        cookies.set("jwttoken", response.data.token);
                        resetForm({ values: "" });
                        this.setState({ showsnipper: false });
                        setTimeout(() => {
                          this.props.history.push("/dashboard");
                        }, "1000");
                      } else {
                        toast.error("invalid crendentials!");
                        this.setState({ showsnipper: false });
                      }
                      this.setState({ showsnipper: false });
                    });
                    setSubmitting(false);
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <FormControl id="usernameemail" mt={2}>
                        <FormLabel mb={0} pb={0}>
                          User Name / Email Address {""}
                          <Text as={"span"} style={{ color: "red" }}>
                            *
                          </Text>
                        </FormLabel>
                        <Input
                          type="text"
                          name="usernameemail"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.usernameemail}
                        />
                      </FormControl>
                      <Stack h={2}>
                        <span
                          style={{
                            color: "red",
                            fontSize: "13px",
                            paddingBottom: "10px",
                            fontWeight: "bold",
                          }}
                        >
                          {errors.usernameemail &&
                            touched.usernameemail &&
                            errors.usernameemail}
                        </span>
                      </Stack>
                      <FormControl id="password" mt={4}>
                        <FormLabel mb={0} pb={0}>
                          Password {""}
                          <Text as={"span"} style={{ color: "red" }}>
                            *
                          </Text>
                        </FormLabel>
                        <InputGroup>
                          <Input
                            type={this.state.showPassword ? "text" : "password"}
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                          />
                          <InputRightElement h={"full"}>
                            <Button
                              variant={"ghost"}
                              onClick={() =>
                                this.setState({
                                  showPassword: !this.state.showPassword,
                                })
                              }
                            >
                              {this.state.showPassword ? (
                                <ViewIcon />
                              ) : (
                                <ViewOffIcon />
                              )}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                      </FormControl>
                      <Stack h={2}>
                        <span
                          style={{
                            color: "red",
                            fontSize: "13px",
                            paddingBottom: "10px",
                            fontWeight: "bold",
                          }}
                        >
                          {errors.password &&
                            touched.password &&
                            errors.password}
                        </span>
                      </Stack>
                      <Stack spacing={5} mt={3}>
                        <Stack
                          direction={{ base: "column", sm: "row" }}
                          align={"start"}
                          justify={"space-between"}
                        >
                          <Checkbox>Remember me</Checkbox>
                          <Link to="/forgotpassword">
                            <Text color={"blue.500"}>Forgot password?</Text>
                          </Link>
                        </Stack>
                        <Button
                          type="submit"
                          bg={"blue.400"}
                          color={"white"}
                          _hover={{
                            bg: "blue.500",
                          }}
                          disabled={isSubmitting}
                        >
                          Login
                          {this.state.showsnipper === true ? (
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
                      <Stack pt={1}>
                        <Text align={"left"}>
                          Don't have an account?{" "}
                          <Link to="/registrationpage">
                            <Text as={"span"} color={"blue.400"}>
                              SignUp
                            </Text>
                          </Link>
                        </Text>
                      </Stack>
                    </form>
                  )}
                </Formik>
              </Stack>
            </Box>
          </Stack>
        </Flex>
        <ToastContainer />
      </>
    );
  }
}

const mapDispatchToProps = (store) => {
  var registerData = store;
  return registerData;
};
export default connect(mapDispatchToProps, {
  login,
})(LoginComponent);
