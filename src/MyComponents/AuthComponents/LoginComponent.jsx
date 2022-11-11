import React from "react";
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
  HStack,
  Spinner,
} from "@chakra-ui/react";

function LoginComponent() {
  return (
    <>
      <Flex minH={"90vh"} align={"center"} justify={"center"}>
        <Stack spacing={5} mx={"auto"} maxW={"lg"} py={5} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Login your account</Heading>
          </Stack>
          <Box rounded={"lg"} boxShadow={"lg"} p={8}>
            <Stack spacing={4}>
              <Formik
                initialValues={{
                  username: "",
                  email: "",
                  password: "",
                }}
                validate={(values) => {
                  const errors = {};
                  if (!values.username) {
                    errors.username = "username feils is required  **";
                  }
                  if (!values.email) {
                    errors.email = "email feild is required  **";
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                      values.email
                    )
                  ) {
                    errors.email = "Invalid email address **";
                  }
                  if (!values.password) {
                    errors.password = "password feild is required  **";
                  }

                  return errors;
                }}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  console.log(values);
                  //alert(JSON.stringify(values, null, 2));
                  //   return false;
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
                      <FormControl id="username" mt={2}>
                        <FormLabel>UserName</FormLabel>
                        <Input
                          type="text"
                          name="username"
                          value={values.username}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </FormControl>
                    </HStack>
                    <Stack>
                      <Box>
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
                      </Box>
                    </Stack>
                    <FormControl id="email" mt={2}>
                      <FormLabel>Email Address</FormLabel>
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
                    <FormControl id="password" mt={2}>
                      <FormLabel>Password</FormLabel>
                      <Input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                      />
                      <span
                        style={{
                          color: "red",
                          fontSize: "13px",
                          paddingBottom: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        {errors.password && touched.password && errors.password}
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

export default LoginComponent;
