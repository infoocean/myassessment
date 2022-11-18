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
import { woocemmerceapi } from "../../API/APIToken";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

class RegistrationComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showsnipper: false,
      showPassword: false,
      showConfirmPassword: false,
      charLengthValid: false,
      specialCharValid: false,
      uppercaseValid: false,
      lowecaseValid: false,
      numberValid: false,
      number: "",
      number_val: "",
      country_code: "",
      // counrtries: "",
      // counrtriesbystates: "",
      // country: "",
      // mystate: "",
    };
    // this.handlecountryChange = this.handlecountryChange.bind(this);
    // this.handlestateChange = this.handlestateChange.bind(this);
  }
  handleNumberChange = (value, data, event, formattedValue) => {
    this.setState({ country_code: data.dialCode });
    this.setState({ number_val: value.slice(data.dialCode.length) });
  };
  // async componentDidMount() {
  //   try {
  //     let counrtries = await woocemmerceapi.get("data/countries", {});
  //     //console.log(counrtries);
  //     this.setState({ counrtries: counrtries.data });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // async handlecountryChange(event) {
  //   console.log(event.target.value);
  //   this.setState({ country: event.target.value });
  //   try {
  //     let counrtriesstates = await woocemmerceapi.get(
  //       `data/countries/${event.target.value}`,
  //       {}
  //     );
  //     //console.log(counrtriesstates.data.states);
  //     this.setState({ counrtriesbystates: counrtriesstates.data.states });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // handlestateChange(event) {
  //   this.setState({ mystate: event.target.value });
  // }

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
                    age: "",
                    address1: "",
                    address2: "",
                    country: "",
                    state: "",
                    city: "",
                    postalcode: "",
                  }}
                  validate={(values) => {
                    const errors = {};

                    if (!values.firstname) {
                      errors.firstname = "First Name feild is required  **";
                    }
                    if (!values.lastname) {
                      errors.lastname = "Last Name feild is required  **";
                    }
                    const usernameRegex = new RegExp(
                      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{7,})"
                    );
                    if (!values.username) {
                      errors.username = "User Name feild is required  **";
                    } else if (!usernameRegex.test(values.username)) {
                      errors.username =
                        "User Name should have at least 7 character and contain one uppercase, one lowercase, one number and one special character**";
                    }
                    if (!values.email) {
                      errors.email = "Email feild is required **";
                    } else if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                        values.email
                      )
                    ) {
                      errors.email = "Invalid email address **";
                    }

                    if (!this.state.number_val) {
                      errors.number = " Number feild is mandatory **";
                    }

                    //password validation
                    if (!values.password) {
                      errors.password = " Password feild is mandatory **";
                    }
                    // Check the length of the input
                    if (values.password.length >= 10) {
                      this.setState({
                        charLengthValid: true,
                      });
                    } else {
                      this.setState({
                        charLengthValid: false,
                      });
                    }
                    // Check for special characters
                    const specialcharacterspattern = /[ !@#$%^&*]/g;
                    if (specialcharacterspattern.test(values.password)) {
                      this.setState({
                        specialCharValid: true,
                      });
                    } else {
                      this.setState({
                        specialCharValid: false,
                      });
                    }
                    // Check for an uppercase lowecase character
                    const uppercasecharacterpattern = /[A-Z]/;
                    if (uppercasecharacterpattern.test(values.password)) {
                      this.setState({
                        uppercaseValid: true,
                      });
                    } else {
                      this.setState({
                        uppercaseValid: false,
                      });
                    }
                    const lowercasecharacterpattern = /[a-z]/;
                    if (lowercasecharacterpattern.test(values.password)) {
                      this.setState({
                        lowecaseValid: true,
                      });
                    } else {
                      this.setState({
                        lowecaseValid: false,
                      });
                    }
                    // Check for a number
                    const numberpattern = /[0-9]/;
                    if (numberpattern.test(values.password)) {
                      this.setState({
                        numberValid: true,
                      });
                    } else {
                      this.setState({
                        numberValid: false,
                      });
                    }
                    // const strongRegex = new RegExp(
                    //   "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{10,})"
                    // );
                    // if (!values.password) {
                    //   errors.password = "password feild is required  **";
                    // } else if (!strongRegex.test(values.password)) {
                    //   errors.password =
                    //     "Password should have at least 10 character and contain one uppercase, one lowercase, one number and one special character**";
                    // }

                    if (!values.confirmpassword) {
                      errors.confirmpassword =
                        "Confirm password feild is required  **";
                    }
                    if (values.confirmpassword) {
                      if (values.password !== values.confirmpassword) {
                        errors.confirmpassword =
                          "Password and Confirm Password are not match **";
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
                    values.age = age;

                    if (!values.dob) {
                      errors.dob = "DOB feild is required **";
                    } else if (age < 18) {
                      errors.dob =
                        "Only 18 year old person be can registred **";
                    }
                    if (!values.address1) {
                      errors.address1 = "Address1 feild is required  **";
                    }
                    if (!values.city) {
                      errors.city = "City feild is required  **";
                    }

                    if (!values.state) {
                      errors.state = "State feild is required  **";
                    }

                    if (!values.country) {
                      errors.country = "country feild is required  **";
                    }

                    if (!values.postalcode) {
                      errors.postalcode = "Postal code feild is required  **";
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
                      postalcode: values.postalcode,
                    };
                    //console.log(reqdata);
                    //return false;
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
                            <FormLabel mb={0} pb={0}>
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
                          <FormControl id="lastName">
                            <FormLabel mb={0} pb={0}>
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
                                paddingRight: "12px",
                              }}
                            >
                              {errors.lastname &&
                                touched.lastname &&
                                errors.lastname}
                            </span>
                          </Box>
                        </Flex>
                      </Stack>
                      <HStack>
                        <FormControl id="username">
                          <FormLabel mb={0} pb={0}>
                            User Name{" "}
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
                          {errors.username &&
                            touched.username &&
                            errors.username}
                        </span>
                      </Stack>
                      <FormControl id="email" mt={5}>
                        <FormLabel mb={0} pb={0}>
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
                          {errors.email && touched.email && errors.email}
                        </span>
                      </Stack>
                      <FormControl id="number" mt={5}>
                        <FormLabel mb={0} pb={0}>
                          Phone Number{" "}
                          <Text as={"span"} style={{ color: "red" }}>
                            *
                          </Text>
                        </FormLabel>
                        <PhoneInput
                          style={{ width: "397px" }}
                          country={"us"}
                          value={this.state.number}
                          onChange={this.handleNumberChange}
                          onBlur={this.handleNumberBlur}
                        />
                      </FormControl>
                      <Stack>
                        <span
                          h={2}
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
                      <FormControl id="password" mt={4}>
                        <FormLabel mb={0} pb={0}>
                          Password{" "}
                          <Text as={"span"} style={{ color: "red" }}>
                            *
                          </Text>
                        </FormLabel>
                        <InputGroup mb={2}>
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
                        <Stack h={0.1} mb={5}>
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
                        <ul class="list-unstyled">
                          <li class="">
                            <span class="eight-character">
                              {this.state.charLengthValid === true ? (
                                <i
                                  style={{ color: "green" }}
                                  class="fa-sharp fa-solid fa-circle-check"
                                  aria-hidden="true"
                                ></i>
                              ) : (
                                <i
                                  style={{ color: "#232923" }}
                                  class="fa-sharp fa-solid fa-circle-info"
                                  aria-hidden="true"
                                ></i>
                              )}
                            </span>
                            &nbsp; Atleast 10 Character
                          </li>
                          <li class="">
                            <span class="low-upper-case">
                              {this.state.uppercaseValid === true &&
                              this.state.lowecaseValid === true ? (
                                <i
                                  style={{ color: "green" }}
                                  class="fa-sharp fa-solid fa-circle-check"
                                  aria-hidden="true"
                                ></i>
                              ) : (
                                <i
                                  style={{ color: "#232923" }}
                                  class="fa-sharp fa-solid fa-circle-info"
                                  aria-hidden="true"
                                ></i>
                              )}
                            </span>
                            &nbsp; 1 lowercase &amp; 1 uppercase
                          </li>

                          <li class="">
                            <span class="one-number">
                              {this.state.numberValid === true ? (
                                <i
                                  style={{ color: "green" }}
                                  class="fa-sharp fa-solid fa-circle-check"
                                  aria-hidden="true"
                                ></i>
                              ) : (
                                <i
                                  style={{ color: "#232923" }}
                                  class="fa-sharp fa-solid fa-circle-info"
                                  aria-hidden="true"
                                ></i>
                              )}
                            </span>{" "}
                            &nbsp;1 number (0-9)
                          </li>

                          <li class="specialchar">
                            <span class="one-special-char">
                              {this.state.specialCharValid === true ? (
                                <i
                                  style={{ color: "green" }}
                                  class="fa-sharp fa-solid fa-circle-check"
                                  aria-hidden="true"
                                ></i>
                              ) : (
                                <i
                                  style={{ color: "#232923" }}
                                  class="fa-sharp fa-solid fa-circle-info"
                                  aria-hidden="true"
                                ></i>
                              )}
                            </span>{" "}
                            &nbsp;1 Special Character (!@#$%^&*).
                          </li>
                        </ul>
                      </FormControl>
                      <FormControl id="confirmpassword" mt={5}>
                        <FormLabel mb={0} pb={0}>
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
                          {errors.confirmpassword &&
                            touched.confirmpassword &&
                            errors.confirmpassword}
                        </span>
                      </Stack>
                      <HStack mt={5}>
                        <Box>
                          <FormControl id="dob" mt={2}>
                            <FormLabel mb={0} pb={0}>
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
                              value={values.dob}
                            />
                          </FormControl>
                        </Box>
                        <Box>
                          <FormControl id="firstName" mt={2}>
                            <FormLabel mb={0} pb={0}>
                              Age{" "}
                              <Text as={"span"} style={{ color: "red" }}>
                                *
                              </Text>
                            </FormLabel>
                            <Input
                              type="number"
                              name="age"
                              value={values.age}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              readOnly
                            />
                          </FormControl>
                        </Box>
                      </HStack>
                      <Stack h={2}>
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
                      <FormControl id="address1" mt={5}>
                        <FormLabel mb={0} pb={0}>
                          Address1{" "}
                          <Text as={"span"} style={{ color: "red" }}>
                            *
                          </Text>
                        </FormLabel>
                        <Input
                          value={values.address1}
                          onChange={handleChange}
                          onBlur={handleBlur}
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
                          {errors.address1 &&
                            touched.address1 &&
                            errors.address1}
                        </span>
                      </Stack>
                      <FormControl id="address2" mt={5}>
                        <FormLabel mb={0} pb={0}>
                          Address2{" "}
                        </FormLabel>
                        <Input
                          value={values.address2}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </FormControl>
                      <FormControl id="country" mt={5}>
                        <FormLabel mb={0} pb={0}>
                          Country{" "}
                          <Text as={"span"} style={{ color: "red" }}>
                            *
                          </Text>
                        </FormLabel>
                        <CountryDropdown
                          name="country"
                          defaultOptionLabel="Select a country"
                          value={values.country}
                          onChange={(_, e) => handleChange(e)}
                          onBlur={handleBlur}
                          style={{
                            width: "400px",
                            height: "42px",
                            borderRadius: "4px",
                            border: "0.5px solid #d0dfe3",
                          }}
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
                          {errors.country && touched.country && errors.country}
                        </span>
                      </Stack>
                      <FormControl id="state" mt={5}>
                        <FormLabel mb={0} pb={0}>
                          State{" "}
                          <Text as={"span"} style={{ color: "red" }}>
                            *
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
                            width: "400px",
                            height: "42px",
                            borderRadius: "4px",
                            border: "0.5px solid #d0dfe3",
                          }}
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
                          {errors.state && touched.state && errors.state}
                        </span>
                      </Stack>
                      <FormControl id="city" mt={5}>
                        <FormLabel mb={0} pb={0}>
                          City{" "}
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
                          {errors.city && touched.city && errors.city}
                        </span>
                      </Stack>
                      <FormControl id="postalcode" mt={5}>
                        <FormLabel mb={0} pb={0}>
                          Postal Code{" "}
                          <Text as={"span"} style={{ color: "red" }}>
                            *
                          </Text>
                        </FormLabel>
                        <Input
                          type="text"
                          name="postalcode"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.postalcode}
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
                          {errors.postalcode &&
                            touched.postalcode &&
                            errors.postalcode}
                        </span>
                      </Stack>
                      <Stack spacing={10} mt={4}>
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
