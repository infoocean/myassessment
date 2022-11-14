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
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { connect } from "react-redux";
import { login } from "../../Redux/Actions/useractions";

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
      this.props.userLoginReducer.userInfo.savedata &&
      this.props.userLoginReducer.userInfo.savedata.email
    ) {
      autofillemail = this.props.userLoginReducer.userInfo.savedata.email;
    } else {
      autofillemail = "";
    }

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
                    usernameemail: "",
                    password: "",
                  }}
                  validate={(values) => {
                    const errors = {};
                    if (!values.usernameemail) {
                      errors.usernameemail =
                        "username / email feild is required  **";
                    }
                    // if (!values.email) {
                    //   errors.email = " feild is required  **";
                    // } else if (
                    //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                    //     values.email
                    //   )
                    // ) {
                    //   errors.email = "Invalid email address **";
                    // }
                    if (!values.password) {
                      errors.password = "password feild is required  **";
                    }
                    return errors;
                  }}
                  onSubmit={async (values, { setSubmitting, resetForm }) => {
                    this.setState({ showsnipper: true });
                    //console.log(values);
                    //alert(JSON.stringify(values, null, 2));
                    //return false;
                    const reqdata = {
                      usernameemail: values.usernameemail,
                      password: values.password,
                    };
                    this.props.login(reqdata, (response) => {
                      if (response.status === 200) {
                        toast.success("Login Successfull !");
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
                        <FormLabel>
                          UserName / Email Address
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
                      </FormControl>
                      <FormControl id="password" mt={2}>
                        <FormLabel>
                          Password
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
                      </FormControl>
                      <Stack spacing={10} mt={3}>
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
