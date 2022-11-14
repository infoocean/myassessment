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
import { register } from "../../Redux/Actions/useractions";
import { connect } from "react-redux";

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
    return (
      <>
        <Flex minH={"90vh"} align={"center"} justify={"center"}>
          <Stack spacing={5} mx={"auto"} maxW={"lg"} py={5} px={6}>
            <Stack align={"center"}>
              <Heading fontSize={"3xl"}>Receptionist Create account</Heading>
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
                    dob: "",
                    age: 0,
                    address1: "",
                    address2: "",
                    city: "",
                    state: "",
                    country: "",
                  }}
                  validate={(values) => {
                    const errors = {};

                    if (!values.firstname) {
                      errors.firstname = "feild is required  **";
                    }

                    if (!values.lastname) {
                      errors.lastname = "feild is required  **";
                    }

                    const usernameRegex = new RegExp(
                      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{7,})"
                    );
                    if (!values.username) {
                      errors.username = "username feild is required  **";
                    } else if (!usernameRegex.test(values.username)) {
                      errors.username =
                        "username should have at least 7 character and contain one uppercase, one lowercase, one number and one special character**";
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
                        "Password should have at least 10 character and contain one uppercase, one lowercase, one number and one special character**";
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

                    //find year
                    const calculate_age = (dob) => {
                      const birthDate = new Date(dob);
                      const difference = Date.now() - birthDate.getTime();
                      const age = new Date(difference);
                      return Math.abs(age.getUTCFullYear() - 1970);
                    };
                    let age = calculate_age(values.dob);
                    //console.log(age);
                    values.age = Number(age);

                    if (!values.dob) {
                      errors.dob = "dob feild is required **";
                    } else if (age < 18) {
                      errors.dob =
                        "Only 18 year old person be can registred **";
                    }

                    if (!values.address1) {
                      errors.address1 = "address1 feild is required  **";
                    }

                    if (!values.city) {
                      errors.city = "city feild is required  **";
                    }

                    if (!values.state) {
                      errors.state = "state feild is required  **";
                    }

                    if (!values.state) {
                      errors.state = "state feild is required  **";
                    }

                    if (!values.country) {
                      errors.country = "country feild is required  **";
                    }

                    return errors;
                  }}
                  onSubmit={async (values, { setSubmitting, resetForm }) => {
                    this.setState({ showsnipper: true });
                    //console.log(values);
                    //alert(JSON.stringify(values, null, 2));
                    let numberformat =
                      "+" +
                      this.state.country_code +
                      "-" +
                      this.state.number_val;
                    const reqdata = {
                      firstname: values.firstname,
                      lastname: values.lastname,
                      username: values.username,
                      email: values.email,
                      number: numberformat,
                      password: values.password,
                      confirmpassword: values.confirmpassword,
                      dob: values.dob,
                      age: Number(values.age),
                      address1: values.address1,
                      address2: values.address2,
                      city: values.city,
                      state: values.state,
                      country: values.country,
                    };
                    // console.log(reqdata);
                    // return false;
                    this.props.register(reqdata, (response) => {
                      //console.log(response);
                      //console.log(response.status);
                      if (response.status === 200) {
                        toast.warning("Email allready registred");
                        this.setState({ showsnipper: false });
                      } else if (response.status === 201) {
                        toast.success("Registration Successfull !");
                        this.setState({ showsnipper: false });
                        resetForm({ values: "" });
                        setTimeout(() => {
                          this.props.history.push("/loginpage");
                        }, "1000");
                      }
                      if (response.status === 500) {
                        this.setState({ showsnipper: false });
                        toast.error("server not responding");
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
                      <HStack>
                        <Box>
                          <FormControl id="firstName">
                            <FormLabel>
                              First Name
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
                          <FormControl id="lastName">
                            <FormLabel>
                              Last Name
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
                      <FormControl id="username" mt={1}>
                        <FormLabel>
                          UserName
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
                          Confirm Password
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
                              Date of birth
                              <Text as={"span"} style={{ color: "red" }}>
                                *
                              </Text>
                            </FormLabel>
                            <Input
                              type="date"
                              name="dob"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.dob}
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
                              value={Number(values.age)}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              readOnly
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
                              {errors.dob && touched.dob && errors.dob}
                            </span>
                          </Box>
                        </Flex>
                      </Stack>
                      <FormControl id="address1" mt={2}>
                        <FormLabel>
                          Address1
                          <Text as={"span"} style={{ color: "red" }}>
                            *
                          </Text>
                        </FormLabel>
                        <Textarea
                          value={values.address1}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          size="sm"
                          rows="2"
                        />
                        <span
                          style={{
                            color: "red",
                            fontSize: "13px",
                            paddingBottom: "10px",
                            fontWeight: "bold",
                          }}
                        >
                          {errors.address1 &&
                            touched.address1 &&
                            errors.address1}
                        </span>
                      </FormControl>
                      <FormControl id="address2" mt={2}>
                        <FormLabel>Address2 </FormLabel>
                        <Textarea
                          value={values.address2}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          size="sm"
                          rows="2"
                        />
                      </FormControl>
                      <FormControl id="city" mt={3}>
                        <FormLabel>
                          City
                          <Text as={"span"} style={{ color: "red" }}>
                            *
                          </Text>
                        </FormLabel>
                        <Input
                          type="text"
                          name="city"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.city}
                        />
                        <span
                          style={{
                            color: "red",
                            fontSize: "13px",
                            paddingBottom: "10px",
                            fontWeight: "bold",
                          }}
                        >
                          {errors.city && touched.city && errors.city}
                        </span>
                      </FormControl>
                      <FormControl id="state" mt={3}>
                        <FormLabel>
                          State
                          <Text as={"span"} style={{ color: "red" }}>
                            *
                          </Text>
                        </FormLabel>
                        <Input
                          type="text"
                          name="state"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.state}
                        />
                        <span
                          style={{
                            color: "red",
                            fontSize: "13px",
                            paddingBottom: "10px",
                            fontWeight: "bold",
                          }}
                        >
                          {errors.state && touched.state && errors.state}
                        </span>
                      </FormControl>
                      <FormControl id="country" mt={3}>
                        <FormLabel>
                          Country
                          <Text as={"span"} style={{ color: "red" }}>
                            *
                          </Text>
                        </FormLabel>
                        <Input
                          type="text"
                          name="country"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.country}
                        />
                        <span
                          style={{
                            color: "red",
                            fontSize: "13px",
                            paddingBottom: "10px",
                            fontWeight: "bold",
                          }}
                        >
                          {errors.country && touched.country && errors.country}
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
                          SignUp
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

const mapDispatchToProps = (store) => {
  var registerData = store;
  return registerData;
};

export default connect(mapDispatchToProps, {
  register,
})(RegistrationComponent);
