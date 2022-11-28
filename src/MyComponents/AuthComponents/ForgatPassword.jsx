import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  FormLabel,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import auth_token, { api } from "../../API/APIToken";

export default function ForgotPasswordForm() {
  const [showsnipper, setshowsnipper] = useState(false);
  const [emailerr, setemailerr] = useState("");
  const [emailsuccess, setemailsuccess] = useState("");
  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Email Required **";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate,
    onSubmit: (values) => {
      setshowsnipper(true);
      //alert(JSON.stringify(values, null, 2));
      const data = {
        email: values.email,
        link: `https://myassessment.vercel.app/setnewpassword`,
      };
      var config = {
        method: "post",
        url: `${api}sendresetpasswordemail`,
        headers: {
          Authorization: auth_token,
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          //console.log(response.data);
          setemailsuccess("Link Send Successfully Ckech Your Email ");
          setshowsnipper(false);
          setTimeout(() => {
            setemailsuccess("");
          }, 10000);
        })
        .catch(function (error) {
          console.log(error);
          setemailerr("Email Not Registred");
          setshowsnipper(false);
          setTimeout(() => {
            setemailerr("");
          }, 3000);
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
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }} mt={3}>
          Forgot your password?
        </Heading>
        <Text
          fontSize={{ base: "sm", sm: "md" }}
          color={useColorModeValue("gray.800", "gray.400")}
        >
          You&apos;ll get an email with a reset link
        </Text>
        {emailerr !== "" ? (
          <Alert status="error" mt={1} mb={1}>
            <AlertIcon />
            {emailerr}
          </Alert>
        ) : (
          ""
        )}
        {emailsuccess !== "" ? (
          <Alert status="success">
            <AlertIcon />
            {emailsuccess}
          </Alert>
        ) : (
          ""
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="email" mt={2}>
            <FormLabel>
              Enter Your Email{" "}
              <Text as={"span"} style={{ color: "red" }}>
                *
              </Text>
            </FormLabel>
            <Input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
          </FormControl>
          <Stack h={6}>
            <span
              style={{
                color: "red",
                fontSize: "13px",
                fontWeight: "bold",
              }}
            >
              {formik.errors.email ? <div>{formik.errors.email}</div> : null}
            </span>
          </Stack>
          <Stack mt={1}>
            <Button
              type="submit"
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
            >
              Request Reset Link{" "}
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
    </Flex>
  );
}
