import React, { Component } from "react";
import {
  Flex,
  HStack,
  Drawer,
  DrawerContent,
  Text,
  Input,
  Container,
  Spacer,
  Box,
  Select,
  FormControl,
  FormLabel,
  Stack,
  Button,
  Textarea,
  Spinner,
  Heading,
} from "@chakra-ui/react";

import { SidebarContent, MobileNav } from "../../Templates/HeaderComponent";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { visitorregistration } from "../../../Redux/Actions/useractions";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import Cookies from "universal-cookie";
import auth_token, { api } from "../../../API/APIToken";
import axios from "axios";
const cookies = new Cookies();

class Addvisitor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showsnipper: false,
      username: "",
    };

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
          this.setState({ username: response.data.userdata.firstname });
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    userdata();
    //console.log(this.props.username);
  }

  render() {
    return (
      <>
        <Box minH="100vh" style={{ backgroundColor: "#efefef" }}>
          {/*sidebar data component */}
          <SidebarContent
            // onClose={() => onClose}
            display={{ base: "none", md: "block" }}
          />
          <Drawer
            autoFocus={false}
            // isOpen={isOpen}
            placement="left"
            // onClose={onClose}
            returnFocusOnClose={false}
            // onOverlayClick={onClose}
            size="full"
          >
            <DrawerContent>
              <SidebarContent />
            </DrawerContent>
          </Drawer>
          {/* mobile nav */}
          <MobileNav />
          {/*main data component*/}
          <Box ml={{ base: 0, md: 60 }} p="4">
            {/*main data part */}
            <Container mb={5} maxW="6xl">
              <Flex mb={4}>
                <Box>
                  <Link to="/dashboard/visitors">
                    <Button
                      type="submit"
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                      size={"md"}
                    >
                      <IoMdArrowRoundBack />
                      Show Visitor List
                    </Button>
                  </Link>
                </Box>
                <Spacer />
              </Flex>
              <hr />
              <Stack py={4} textAlign={"center"}>
                <Heading size={"1xl"}>Visitor Registration Form</Heading>
              </Stack>
              <Flex
                align={"center"}
                justify={"center"}
                // bg={useColorModeValue("gray.50", "gray.800")}
              >
                <Stack maxW={"9xl"}>
                  <Formik
                    initialValues={{
                      name: "",
                      email: "",
                      number: "",
                      dob: "",
                      age: "",
                      address: "",
                      country: "",
                      state: "",
                      city: "",
                      postalcode: "",
                      datetime: "",
                      idname: "",
                      idnumber: "",
                      purposetovisit: "",
                      assets: "",
                    }}
                    validate={(values) => {
                      const errors = {};

                      if (!values.name) {
                        errors.name = " Required";
                      }

                      if (!values.email) {
                        errors.email = " Required";
                      } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                          values.email
                        )
                      ) {
                        errors.email = " Invalid email";
                      }

                      if (!values.number) {
                        errors.number = "Required";
                      }

                      if (!values.dob) {
                        errors.dob = "Required";
                      }

                      if (!values.age) {
                        errors.age = "Required";
                      }

                      if (!values.address) {
                        errors.address = "Required";
                      }

                      if (!values.country) {
                        errors.country = "Required";
                      }

                      if (!values.state) {
                        errors.state = "Required";
                      }

                      if (!values.city) {
                        errors.city = "Required";
                      }

                      if (!values.postalcode) {
                        errors.postalcode = "Required";
                      }

                      if (!values.datetime) {
                        errors.datetime = "Required";
                      }

                      if (!values.purposetovisit) {
                        errors.purposetovisit = "Required";
                      }

                      if (!values.assets) {
                        errors.assets = "Required";
                      }

                      return errors;
                    }}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                      this.setState({ showsnipper: true });
                      //console.log(values);
                      const reqdata = {
                        name: values.name,
                        email: values.email,
                        number: values.number,
                        dob: values.dob,
                        age: Number(values.age),
                        address: values.address,
                        country: values.country,
                        state: values.state,
                        city: values.city,
                        postalcode: values.postalcode,
                        datetime: values.datetime,
                        purposetovisit: values.purposetovisit,
                        assets: values.assets,
                      };
                      //console.log(reqdata);
                      //return false;
                      this.props.visitorregistration(reqdata, (response) => {
                        //console.log(response);
                        //console.log(response.status);
                        if (response.status === 200) {
                          toast.warning("Email allready registred");
                          this.setState({ showsnipper: false });
                        } else if (response.status === 201) {
                          toast.success(" Visitor Registration Successfull !");
                          setTimeout(() => {
                            this.props.history.push("/dashboard/visitors");
                          }, "1000");
                          this.setState({ showsnipper: false });
                          resetForm({ values: "" });
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
                        <Box
                          rounded={"lg"}
                          boxShadow={"lg"}
                          p={10}
                          style={{ backgroundColor: "white" }}
                        >
                          <HStack>
                            <Box>
                              <FormControl id="Name">
                                <FormLabel>
                                  Name{" "}
                                  <Text as={"span"} style={{ color: "red" }}>
                                    *{" "}
                                    <span
                                      style={{
                                        color: "red",
                                        fontSize: "13px",
                                        paddingBottom: "10px",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {errors.name &&
                                        touched.name &&
                                        errors.name}
                                    </span>
                                  </Text>
                                </FormLabel>
                                <Input
                                  type="text"
                                  name="name"
                                  value={values.name}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              </FormControl>
                            </Box>
                            <Box>
                              <FormControl id="Email">
                                <FormLabel>
                                  Email{" "}
                                  <Text as={"span"} style={{ color: "red" }}>
                                    *
                                  </Text>
                                  <span
                                    style={{
                                      color: "red",
                                      fontSize: "13px",
                                      paddingBottom: "10px",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {errors.email &&
                                      touched.email &&
                                      errors.email}
                                  </span>
                                </FormLabel>
                                <Input
                                  type="text"
                                  name="email"
                                  value={values.email}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              </FormControl>
                            </Box>
                            <Box>
                              <FormControl id="number">
                                <FormLabel>
                                  Number{" "}
                                  <Text as={"span"} style={{ color: "red" }}>
                                    *
                                  </Text>
                                  <span
                                    style={{
                                      color: "red",
                                      fontSize: "13px",
                                      paddingBottom: "10px",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {errors.number &&
                                      touched.number &&
                                      errors.number}
                                  </span>
                                </FormLabel>
                                <Input
                                  type="text"
                                  name="number"
                                  value={values.number}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              </FormControl>
                            </Box>
                            <Box>
                              <FormControl id="dob">
                                <FormLabel>
                                  DOB{" "}
                                  <Text as={"span"} style={{ color: "red" }}>
                                    *{" "}
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
                                  </Text>
                                </FormLabel>
                                <Input
                                  style={{ width: "226px" }}
                                  type="date"
                                  name="dob"
                                  value={values.dob}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              </FormControl>
                            </Box>
                          </HStack>
                          <HStack mt={6}>
                            <Box>
                              <FormControl id="age">
                                <FormLabel>
                                  Age{" "}
                                  <Text as={"span"} style={{ color: "red" }}>
                                    *
                                    <span
                                      style={{
                                        color: "red",
                                        fontSize: "13px",
                                        paddingBottom: "10px",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {errors.age && touched.age && errors.age}
                                    </span>
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
                            <Box>
                              <FormControl id="address">
                                <FormLabel>
                                  Address{" "}
                                  <Text as={"span"} style={{ color: "red" }}>
                                    *{" "}
                                    <span
                                      style={{
                                        color: "red",
                                        fontSize: "13px",
                                        paddingBottom: "10px",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {errors.address &&
                                        touched.address &&
                                        errors.address}
                                    </span>
                                  </Text>
                                </FormLabel>
                                <Input
                                  type="text"
                                  name="address"
                                  value={values.address}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              </FormControl>
                            </Box>
                            <Box>
                              <FormControl id="country">
                                <FormLabel>
                                  Country{" "}
                                  <Text as={"span"} style={{ color: "red" }}>
                                    *
                                  </Text>
                                  <span
                                    style={{
                                      color: "red",
                                      fontSize: "13px",
                                      paddingBottom: "10px",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {errors.country &&
                                      touched.country &&
                                      errors.country}
                                  </span>
                                </FormLabel>
                                <CountryDropdown
                                  name="country"
                                  defaultOptionLabel="Select a country"
                                  value={values.country}
                                  onChange={(_, e) => handleChange(e)}
                                  onBlur={handleBlur}
                                  style={{
                                    width: "235px",
                                    borderRadius: "4px",
                                    height: "39px",
                                    border: "0.5px solid #d0dfe3",
                                  }}
                                />
                              </FormControl>
                            </Box>
                            <Box>
                              <FormControl id="state">
                                <FormLabel>
                                  State{" "}
                                  <Text as={"span"} style={{ color: "red" }}>
                                    *{" "}
                                    <span
                                      style={{
                                        color: "red",
                                        fontSize: "13px",
                                        paddingBottom: "10px",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {errors.state &&
                                        touched.state &&
                                        errors.state}
                                    </span>
                                  </Text>
                                </FormLabel>
                                <RegionDropdown
                                  name="state"
                                  defaultOptionLabel="select a state"
                                  blankOptionLabel="Select a state"
                                  country={values.country}
                                  value={values.state}
                                  onChange={(_, e) => handleChange(e)}
                                  onBlur={handleBlur}
                                  style={{
                                    width: "235px",
                                    borderRadius: "4px",
                                    height: "39px",
                                    border: "0.5px solid #d0dfe3",
                                  }}
                                />
                              </FormControl>
                            </Box>
                          </HStack>
                          <HStack mt={6}>
                            <Box>
                              <FormControl id="city">
                                <FormLabel>
                                  City{" "}
                                  <Text as={"span"} style={{ color: "red" }}>
                                    *
                                    <span
                                      style={{
                                        color: "red",
                                        fontSize: "13px",
                                        paddingBottom: "10px",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {errors.city &&
                                        touched.city &&
                                        errors.city}
                                    </span>
                                  </Text>
                                </FormLabel>
                                <Input
                                  type="text"
                                  name="city"
                                  value={values.city}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              </FormControl>
                            </Box>
                            <Box>
                              <FormControl id="postalcode">
                                <FormLabel>
                                  Postal Code{" "}
                                  <Text as={"span"} style={{ color: "red" }}>
                                    *
                                    <span
                                      style={{
                                        color: "red",
                                        fontSize: "13px",
                                        paddingBottom: "10px",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {errors.postalcode &&
                                        touched.postalcode &&
                                        errors.postalcode}
                                    </span>
                                  </Text>
                                </FormLabel>
                                <Input
                                  type="text"
                                  name="postalcode"
                                  value={values.postalcode}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              </FormControl>
                            </Box>
                            <Box>
                              <FormControl id="datetime">
                                <FormLabel>
                                  Date,Time{" "}
                                  <Text as={"span"} style={{ color: "red" }}>
                                    *
                                    <span
                                      style={{
                                        color: "red",
                                        fontSize: "13px",
                                        paddingBottom: "10px",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {errors.datetime &&
                                        touched.datetime &&
                                        errors.datetime}
                                    </span>
                                  </Text>
                                </FormLabel>
                                <Input
                                  type="datetime-local"
                                  name="datetime"
                                  value={values.datetime}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              </FormControl>
                            </Box>
                            <Box width={"250px"}>
                              <FormControl id="id">
                                <FormLabel>Select Id </FormLabel>
                                <Select>
                                  <option value="option1">Aadhar Card</option>
                                  <option value="option2">Pan card </option>
                                  <option value="option3">
                                    Votar Id Card{" "}
                                  </option>
                                  <option value="option3">Passport </option>
                                </Select>
                              </FormControl>
                            </Box>
                            <Box>
                              <FormControl id="idnumber">
                                <FormLabel>Id Number</FormLabel>
                                <Input type="text" />
                              </FormControl>
                            </Box>
                          </HStack>
                          <FormControl id="purposetovisit" mt={6}>
                            <FormLabel>
                              Purpose To Visit{" "}
                              <Text as={"span"} style={{ color: "red" }}>
                                *
                                <span
                                  style={{
                                    color: "red",
                                    fontSize: "13px",
                                    paddingBottom: "10px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {errors.purposetovisit &&
                                    touched.purposetovisit &&
                                    errors.purposetovisit}
                                </span>
                              </Text>
                            </FormLabel>
                            <Textarea
                              placeholder="Here is a sample placeholder"
                              size="sm"
                              rows={2}
                              name="purposetovisit"
                              value={values.purposetovisit}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </FormControl>
                          <FormControl id="assests" mt={6}>
                            <FormLabel>
                              Assets{" "}
                              <Text as={"span"} style={{ color: "red" }}>
                                *
                                <span
                                  style={{
                                    color: "red",
                                    fontSize: "13px",
                                    paddingBottom: "10px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {errors.assets &&
                                    touched.assets &&
                                    errors.assets}
                                </span>
                              </Text>
                            </FormLabel>
                            <Textarea
                              placeholder="Here is a sample placeholder"
                              size="sm"
                              rows={2}
                              type="text"
                              name="assets"
                              value={values.assets}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </FormControl>
                          <Stack pt={5}>
                            <Button
                              loadingText="Submitting"
                              size="md"
                              bg={"blue.400"}
                              color={"white"}
                              _hover={{
                                bg: "blue.500",
                              }}
                              type="submit"
                              disabled={isSubmitting}
                            >
                              Add Visitor
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
                        </Box>
                      </form>
                    )}
                  </Formik>
                </Stack>
              </Flex>
            </Container>
          </Box>
        </Box>
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
  visitorregistration,
})(Addvisitor);
