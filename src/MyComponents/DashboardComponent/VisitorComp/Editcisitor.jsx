import React, { useEffect, useState } from "react";
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

import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import moment from "moment";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { SidebarContent, MobileNav } from "../../Templates/HeaderComponent";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import auth_token, { api } from "../../../API/APIToken";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function Editvisitor(props) {
  const id = props.match.params.id;
  //console.log(id);
  const [visitor_det, setvisitors_det] = useState([]);
  const [showsnipper, setshowsnipper] = useState(false);
  const [username, setusername] = useState("");
  const [userimg, setuserimg] = useState("");
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

  const getvisitordet = () => {
    var config = {
      method: "get",
      url: `${api}getvisitorbyid/${id}`,
      headers: {
        Authorization: auth_token,
      },
    };
    axios(config)
      .then(function (response) {
        //console.log(response.data);
        setvisitors_det(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  //console.log(visitor_det);

  useEffect(() => {
    getvisitordet();
    userdata();
  }, []);

  const data = {
    name: visitor_det && visitor_det[0] && visitor_det[0].name,
    email: visitor_det && visitor_det[0] && visitor_det[0].email,
    number: visitor_det && visitor_det[0] && visitor_det[0].number,
    dob: moment(visitor_det && visitor_det[0] && visitor_det[0].dob).format(
      "YYYY-MM-DD"
    ),
    age: visitor_det && visitor_det[0] && visitor_det[0].age,
    address: visitor_det && visitor_det[0] && visitor_det[0].address,
    country: visitor_det && visitor_det[0] && visitor_det[0].country,
    state: visitor_det && visitor_det[0] && visitor_det[0].state,
    city: visitor_det && visitor_det[0] && visitor_det[0].city,
    postalcode: visitor_det && visitor_det[0] && visitor_det[0].postalcode,
    datetime: moment(
      visitor_det && visitor_det[0] && visitor_det[0].datetime
    ).format("YYYY-MM-DDThh:mm"),
    purposetovisit:
      visitor_det && visitor_det[0] && visitor_det[0].purposetovisit,
    assets: visitor_det && visitor_det[0] && visitor_det[0].assets,
  };

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
        <MobileNav user={username} userimg={userimg} />
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
              <Heading size={"1xl"}>Update Visitor Form</Heading>
            </Stack>
            <Flex
              align={"center"}
              justify={"center"}
              // bg={useColorModeValue("gray.50", "gray.800")}
            >
              <Stack maxW={"9xl"}>
                <Formik
                  enableReinitialize={true}
                  initialValues={data}
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
                      errors.number = " Required";
                    }

                    if (!values.dob) {
                      errors.dob = " Required";
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
                    setshowsnipper(true);
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
                    axios({
                      method: "patch",
                      url: `${api}editvisitor/${id}`,
                      data: reqdata,
                      headers: {
                        Authorization: auth_token,
                      },
                    })
                      .then(function (response) {
                        //console.log(response);
                        if (response.status === 202) {
                          toast.success(" Visitor Data updated Successfull !");
                          setshowsnipper(false);
                          //resetForm({ values: "" });
                          getvisitordet();
                        } else if (response.status === 500) {
                          setshowsnipper(false);
                          toast.error("server not responding");
                        }
                      })
                      .catch(function (error) {
                        setshowsnipper(false);
                        toast.error("server not responding");
                      });

                    // this.props.visitorregistration(reqdata, (response) => {
                    //   //console.log(response);
                    //   //console.log(response.status);
                    //   if (response.status === 200) {
                    //     toast.success(" Visitor Registration Successfull !");
                    //     setshowsnipper(false);
                    //     resetForm({ values: "" });
                    //   } else if (response.status === 500) {
                    //     setshowsnipper(false);
                    //     toast.error("server not responding");
                    //   }
                    //   setshowsnipper(false);
                    // });
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
                                    {errors.name && touched.name && errors.name}
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
                                </Text>{" "}
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
                                  *{" "}
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
                                  *
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
                                    {errors.city && touched.city && errors.city}
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
                            <FormControl id="firstName">
                              <FormLabel>
                                Date,Time{" "}
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
                            <FormControl id="firstName">
                              <FormLabel>Select Id </FormLabel>
                              <Select>
                                <option value="option1">Aadhar Card</option>
                                <option value="option2">Pan card </option>
                                <option value="option3">Votar Id Card </option>
                                <option value="option3">Passport </option>
                              </Select>
                            </FormControl>
                          </Box>
                          <Box>
                            <FormControl id="firstName">
                              <FormLabel>Id Number</FormLabel>
                              <Input type="text" />
                            </FormControl>
                          </Box>
                          {/* <Box>
                            <FormControl id="firstName">
                              <FormLabel>Visitor Photo</FormLabel>
                              <Input type="file" />
                            </FormControl>
                          </Box> */}
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
                            Update Visitor
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
export default Editvisitor;
