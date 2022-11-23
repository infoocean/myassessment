import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export default function SetNewPasswordForm() {
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
        <FormControl id="email" mb={5}>
          <FormLabel>
            Password{" "}
            <Text as={"span"} style={{ color: "red" }}>
              *
            </Text>
          </FormLabel>
          <Input _placeholder={{ color: "gray.500" }} type="password" />
        </FormControl>
        <FormControl id="cpassword">
          <FormLabel>
            Confirm Password{" "}
            <Text as={"span"} style={{ color: "red" }}>
              *
            </Text>
          </FormLabel>
          <Input type="password" />
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
