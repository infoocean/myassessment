import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import auth_token, { api } from "../../API/APIToken";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function SetNewPasswordForm(props) {
  const id = props.match.params.id;
  //console.log(id);
  const [showsnipper, setshowsnipper] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showcPassword, setShowcPassword] = useState(false);
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
      errors.confirmpassword = "Confirm pasword feild is required **";
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
        url: `${api}setnewpassword/${id}`,
        headers: {
          token: auth_token,
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          //console.log(response.data);
          setshowsnipper(false);
          toast.success("Password Updated Successfull please login !");
          setTimeout(() => {
            props.history.push("/loginpage");
          }, "1000");
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  });
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }} mb={3}>
          Create new password
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
                _placeholder={{ color: "gray.500" }}
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

          <FormControl id="cpassword" mt={4}>
            <FormLabel mb={0} pb={0}>
              Confirm Password{" "}
              <Text as={"span"} style={{ color: "red" }}>
                *
              </Text>
            </FormLabel>
            <InputGroup>
              <Input
                _placeholder={{ color: "gray.500" }}
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
                    setShowcPassword((showcPassword) => !showcPassword)
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
  );
}
