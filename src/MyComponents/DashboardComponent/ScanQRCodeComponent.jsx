import React, { useEffect, useState } from "react";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Image,
  Stack,
  Heading,
} from "@chakra-ui/react";
import {
  FiHome,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiLogOut,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { IoIosPeople } from "react-icons/io";
import { ImQrcode } from "react-icons/im";
import { Link } from "react-router-dom";
import axios from "axios";
import auth_token, { api } from "../../API/APIToken";

const SideBarLinkItems = [
  {
    name: "Home",
    path: "dashboard/home",
    icon: FiHome,
  },
  {
    name: "Visitors",
    path: "dashboard/visitors",
    icon: IoIosPeople,
  },
  {
    name: "Scan QR code",
    path: "dashboard/scanqrcode",
    icon: ImQrcode,
  },
  {
    name: "Logout",
    path: "logout",
    icon: FiLogOut,
  },
];

function ScanQRCodePage(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const id = props.match.params.id;
  const [visitor_det, setvisitors_det] = useState("");

  const getvisitordet = () => {
    var config = {
      method: "post",
      url: `${api}generateqrcodevisitor/${id}`,
      // headers: {
      //   token: auth_token,
      // },
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

  const data = {
    name: "shubham",
  };
  const sendmail = () => {
    var config = {
      method: "post",
      url: `${api}sendmail`,
      // headers: {
      //   token: auth_token,
      // },
      data: data,
    };
    axios(config)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getvisitordet();
    sendmail();
  }, []);

  //console.log(visitor_det);

  return (
    <>
      <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
        {/*sidebar data component */}
        <SidebarContent
          onClose={() => onClose}
          display={{ base: "none", md: "block" }}
        />
        <Drawer
          autoFocus={false}
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full"
        >
          <DrawerContent>
            <SidebarContent onClose={onClose} />
          </DrawerContent>
        </Drawer>
        {/* mobile nav */}
        <MobileNav onOpen={onOpen} />
        {/*main data component*/}
        <Box ml={{ base: 0, md: 60 }} p="4">
          {/*main data part */}
          <Flex align={"center"} justify={"center"} py={12}>
            <Stack
              boxShadow={"2xl"}
              bg={useColorModeValue("white", "gray.700")}
              rounded={"xl"}
              p={10}
              spacing={8}
              align={"center"}
            >
              <Stack align={"center"} spacing={2}>
                <Heading
                  textTransform={"uppercase"}
                  fontSize={"3xl"}
                  color={useColorModeValue("gray.800", "gray.200")}
                >
                  Scan QR code and get details
                </Heading>
                <Box
                  bg={useColorModeValue("white", "gray.800")}
                  borderWidth="1px"
                  rounded="lg"
                  shadow="lg"
                  position="relative"
                >
                  <Image
                    src={visitor_det}
                    roundedTop="lg"
                    style={{ width: "145px;" }}
                  />
                </Box>
              </Stack>
              <Stack
                spacing={4}
                direction={{ base: "column", md: "row" }}
                w={"full"}
              ></Stack>
            </Stack>
          </Flex>
        </Box>
      </Box>
    </>
  );
}
export default ScanQRCodePage;

const SidebarContent = ({ onClose }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Dashboard
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {SideBarLinkItems.map((link) => (
        <NavItem
          as={Link}
          to={`/${link.path}`}
          key={link.name}
          icon={link.icon}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Link
      to="/"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Dashboard
      </Text>
      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">UserName</Text>
                  <Text fontSize="xs" color="gray.600">
                    Position
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
