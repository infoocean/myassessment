import React, { Component } from "react";
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
  HStack,
  Spinner,
  Spacer,
  Textarea,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
class RegistrationComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showsnipper: false,
      showPassword: false,
      showConfirmPassword: false,
      number: "",
      number_val: "",
      country_code: "",
    };
  }
  handleNumberChange = (value, data, event, formattedValue) => {
    this.setState({ country_code: data.dialCode });
    this.setState({ number_val: value.slice(data.dialCode.length) });
  };

  render() {
    //console.log(this.state.number);

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;

    return (
      <>
        <Flex minH={"90vh"} align={"center"} justify={"center"}>
          <Stack spacing={5} mx={"auto"} maxW={"lg"} py={5} px={6}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"}>Create your account</Heading>
            </Stack>
            <Box rounded={"lg"} boxShadow={"lg"} p={8}>
              <Stack spacing={4}>
                <Formik
                  initialValues={{
                    firstname: "",
                    lastname: "",
                    username: "",
                    email: "",
                    number: "",
                    password: "",
                    confirmpassword: "",
                    age: "",
                    addressofarea: "",
                    dateofbirth: today,
                  }}
                  validate={(values) => {
                    const errors = {};

                    if (!values.firstname) {
                      errors.firstname = "feild is required  **";
                    }
                    if (!values.lastname) {
                      errors.lastname = "feild is required  **";
                    }
                    if (!values.username) {
                      errors.username = "feild is required  **";
                    }
                    if (!values.email) {
                      errors.email = "email feild is required **";
                    } else if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                        values.email
                      )
                    ) {
                      errors.email = "Invalid email address **";
                    }
                    if (!this.state.number_val) {
                      errors.number = " number feild is mandatory **";
                    }
                    const strongRegex = new RegExp(
                      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{10,})"
                    );
                    if (!values.password) {
                      errors.password = "password feild is required  **";
                    } else if (!strongRegex.test(values.password)) {
                      errors.password =
                        "Password should have at least 10 character and contain one uppercase, one lowercase one number and one special character**";
                    }
                    if (!values.confirmpassword) {
                      errors.confirmpassword =
                        "confirm password feild is required  **";
                    }
                    if (values.confirmpassword) {
                      if (values.password !== values.confirmpassword) {
                        errors.confirmpassword =
                          "password and confirm password are not match **";
                      }
                    }

                    return errors;
                  }}
                  onSubmit={async (values, { setSubmitting, resetForm }) => {
                    console.log(values);
                    alert(JSON.stringify(values, null, 2));

                    //   //console.log(reqdata);
                    //   //return false;
                    //   this.props.register(reqdata, (response) => {
                    //     //console.log(response);
                    //     //console.log(response.status);
                    //     if (response.status === 200) {
                    //       toast.warning("Email allready registred");
                    //       this.setState({ showsnipper: false });
                    //     } else if (response.status === 201) {
                    //       this.props.emailstore(values.email, (res) => {});
                    //       toast.success("Registration Successfull !");
                    //       this.setState({ showsnipper: false });
                    //       resetForm({ values: "" });
                    //       setTimeout(() => {
                    //         this.props.history.push("/loginpage");
                    //       }, "2000");
                    //     }
                    //     if (response.status === 500) {
                    //       this.setState({ showsnipper: false });
                    //       toast.error("server not responding");
                    //     }
                    //     this.setState({ showsnipper: false });
                    //     //window.location.replace("loginpage");
                    //     //<Navigate to="/loginpage" replace={true} />;
                    //     //redirect("/loginpage");
                    //     // if (this.props.redirect_url === true) {
                    //     // }
                    //     //<Redirect to="/users" />;
                    //     //console.log("run");
                    //   });
                    //   setSubmitting(false);
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
                      <HStack>
                        <Box>
                          <FormControl id="firstName" mt={2}>
                            <FormLabel>
                              First Name{" "}
                              <Text as={"span"} style={{ color: "red" }}>
                                *
                              </Text>
                            </FormLabel>
                            <Input
                              type="text"
                              name="firstname"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.firstname}
                            />
                          </FormControl>
                        </Box>
                        <Box>
                          <FormControl id="lastName" mt={2}>
                            <FormLabel>
                              Last Name{" "}
                              <Text as={"span"} style={{ color: "red" }}>
                                *
                              </Text>
                            </FormLabel>
                            <Input
                              type="text"
                              name="lastname"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.lastname}
                            />
                          </FormControl>
                        </Box>
                      </HStack>
                      <Stack>
                        <Flex>
                          <Box>
                            <span
                              style={{
                                color: "red",
                                fontSize: "13px",
                                paddingBottom: "10px",
                                fontWeight: "bold",
                              }}
                            >
                              {errors.firstname &&
                                touched.firstname &&
                                errors.firstname}
                            </span>
                          </Box>
                          <Spacer />
                          <Box>
                            <span
                              style={{
                                color: "red",
                                fontSize: "13px",
                                paddingBottom: "10px",
                                fontWeight: "bold",
                                paddingRight: "83px",
                              }}
                            >
                              {errors.lastname &&
                                touched.lastname &&
                                errors.lastname}
                            </span>
                          </Box>
                        </Flex>
                      </Stack>
                      <FormControl id="username">
                        <FormLabel>
                          UserName{" "}
                          <Text as={"span"} style={{ color: "red" }}>
                            *
                          </Text>
                        </FormLabel>
                        <Input
                          type="text"
                          name="username"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.username}
                        />
                        <span
                          style={{
                            color: "red",
                            fontSize: "13px",
                            paddingBottom: "10px",
                            fontWeight: "bold",
                          }}
                        >
                          {errors.username &&
                            touched.username &&
                            errors.username}
                        </span>
                      </FormControl>
                      <FormControl id="email" mt={3}>
                        <FormLabel>
                          Email address{" "}
                          <Text as={"span"} style={{ color: "red" }}>
                            *
                          </Text>
                        </FormLabel>
                        <Input
                          type="email"
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                        />
                        <span
                          style={{
                            color: "red",
                            fontSize: "13px",
                            paddingBottom: "10px",
                            fontWeight: "bold",
                          }}
                        >
                          {errors.email && touched.email && errors.email}
                        </span>
                      </FormControl>
                      <HStack>
                        <FormControl id="numbers" mt={3}>
                          <FormLabel>
                            Phone Number{" "}
                            <Text as={"span"} style={{ color: "red" }}>
                              *
                            </Text>
                          </FormLabel>
                          <PhoneInput
                            country={"us"}
                            value={this.state.number}
                            onChange={this.handleNumberChange}
                          />
                        </FormControl>
                      </HStack>
                      <Stack>
                        <span
                          style={{
                            color: "red",
                            fontSize: "13px",
                            paddingBottom: "10px",
                            fontWeight: "bold",
                          }}
                        >
                          {errors.number && touched.number && errors.number}
                        </span>
                      </Stack>
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
                      <FormControl id="confirmpassword" mt={3}>
                        <FormLabel>
                          Confirm Password{" "}
                          <Text as={"span"} style={{ color: "red" }}>
                            *
                          </Text>
                        </FormLabel>
                        <InputGroup>
                          <Input
                            type={
                              this.state.showConfirmPassword
                                ? "text"
                                : "password"
                            }
                            name="confirmpassword"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.confirmpassword}
                          />
                          <InputRightElement h={"full"}>
                            <Button
                              variant={"ghost"}
                              onClick={() =>
                                this.setState({
                                  showConfirmPassword:
                                    !this.state.showConfirmPassword,
                                })
                              }
                            >
                              {this.state.showConfirmPassword ? (
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
                          {errors.confirmpassword &&
                            touched.confirmpassword &&
                            errors.confirmpassword}
                        </span>
                      </FormControl>
                      <HStack mt={2}>
                        <Box>
                          <FormControl id="dob" mt={2}>
                            <FormLabel>
                              Date of birth{" "}
                              <Text as={"span"} style={{ color: "red" }}>
                                *
                              </Text>
                            </FormLabel>
                            <Input
                              type="date"
                              name="dob"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.dateofbirth}
                            />
                          </FormControl>
                        </Box>
                        <Box>
                          <FormControl id="firstName" mt={2}>
                            <FormLabel>
                              Age{" "}
                              <Text as={"span"} style={{ color: "red" }}>
                                *
                              </Text>
                            </FormLabel>
                            <Input
                              type="text"
                              name="age"
                              value={values.age}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </FormControl>
                        </Box>
                      </HStack>
                      <Stack>
                        <Flex>
                          <Box>
                            {/* <span
                              style={{
                                color: "red",
                                fontSize: "13px",
                                paddingBottom: "10px",
                                fontWeight: "bold",
                              }}
                            >
                              {errors.firstname &&
                                touched.firstname &&
                                errors.firstname}
                            </span> */}
                          </Box>
                          <Spacer />
                          <Box>
                            {/* <span
                              style={{
                                color: "red",
                                fontSize: "13px",
                                paddingBottom: "10px",
                                fontWeight: "bold",
                                paddingRight: "83px",
                              }}
                            >
                              {errors.lastname &&
                                touched.lastname &&
                                errors.lastname}
                            </span> */}
                          </Box>
                        </Flex>
                      </Stack>
                      <FormControl id="addressofarea" mt={2}>
                        <FormLabel>Address of area</FormLabel>
                        <Textarea
                          value={values.addressofarea}
                          onChange={handleChange}
                          size="sm"
                        />
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
                          SignUp
                          {/* {this.state.showsnipper === true ? (
                          <Spinner
                            color="white.500"
                            size="sm"
                            style={{ marginLeft: "10px" }}
                          />
                        ) : (
                          ""
                        )} */}
                        </Button>
                      </Stack>
                      <Stack pt={1}>
                        <Text align={"left"}>
                          Already a user?{" "}
                          <Link to="/loginpage">
                            <Text as={"span"} color={"blue.400"}>
                              Login
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

export default RegistrationComponent;
