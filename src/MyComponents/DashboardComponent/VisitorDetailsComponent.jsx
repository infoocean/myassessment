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
  Button,
  MenuList,
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
import auth_token, { api } from "../../API/APIToken";
import axios from "axios";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

function VisitorDetailsPage(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const id = props.match.params.id;
  //console.log(id);
  const [visitor_det, setvisitors_det] = useState(0);
  const getvisitordet = () => {
    var config = {
      method: "get",
      url: `${api}getvisitorbyid/${id}`,
      headers: {
        token: auth_token,
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
  useEffect(() => {
    getvisitordet();
  }, []);
  //console.log(visitor_det);

  function Checkin(id) {
    //alert(id);
    const data = { status: 1, checkindatetime: Date.now() };
    var config = {
      method: "patch",
      url: `${api}editvisitor/${id}`,
      headers: {
        token: auth_token,
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
        if (response.status === 202) {
          toast.success("Visitor Check In Successfully !");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function Checkout(id) {
    //alert(id);
    const data = { status: 0, checkindatetime: Date.now() };
    var config = {
      method: "patch",
      url: `${api}editvisitor/${id}`,
      headers: {
        token: auth_token,
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
        if (response.status === 202) {
          toast.success("Visitor Check Out Successfully !");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

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
          <section>
            <div class="container py-2">
              <div class="row">
                <div class="col-lg-4">
                  <div class="card mb-4">
                    <div class="card-body ">
                      <h5 class="my-3">
                        Hii,{" "}
                        {visitor_det && visitor_det[0] && visitor_det[0].name}
                      </h5>
                      <p class="text-muted mb-1">Welcome To Our Hotel</p>
                      <p class="text-muted mb-4">Enjoy & Fun</p>

                      {visitor_det &&
                      visitor_det[0] &&
                      visitor_det[0].status === 0 ? (
                        <Button
                          colorScheme="teal"
                          variant="solid"
                          size="sm"
                          onClick={() =>
                            Checkin(
                              visitor_det &&
                                visitor_det[0] &&
                                visitor_det[0]._id
                            )
                          }
                        >
                          Check In Now
                        </Button>
                      ) : (
                        <Button colorScheme="teal" variant="solid" size="sm">
                          Check Out Now
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                <div class="col-lg-8">
                  <div class="card mb-4">
                    <div class="card-body">
                      <div class="row">
                        <div class="col-sm-3">
                          <p class="mb-0">Name</p>
                        </div>
                        <div class="col-sm-9">
                          <p class="text-muted mb-0">
                            {visitor_det &&
                              visitor_det[0] &&
                              visitor_det[0].name}
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div class="row">
                        <div class="col-sm-3">
                          <p class="mb-0">Email</p>
                        </div>
                        <div class="col-sm-9">
                          <p class="text-muted mb-0">
                            {" "}
                            {visitor_det &&
                              visitor_det[0] &&
                              visitor_det[0].email}
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div class="row">
                        <div class="col-sm-3">
                          <p class="mb-0">Number</p>
                        </div>
                        <div class="col-sm-9">
                          <p class="text-muted mb-0">
                            {visitor_det &&
                              visitor_det[0] &&
                              visitor_det[0].number}
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div class="row">
                        <div class="col-sm-3">
                          <p class="mb-0">DOB</p>
                        </div>
                        <div class="col-sm-9">
                          <p class="text-muted mb-0">
                            {moment(
                              visitor_det &&
                                visitor_det[0] &&
                                visitor_det[0].dob
                            ).format("DD/MM/YYYY")}
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div class="row">
                        <div class="col-sm-3">
                          <p class="mb-0">Age</p>
                        </div>
                        <div class="col-sm-9">
                          <p class="text-muted mb-0">
                            {visitor_det &&
                              visitor_det[0] &&
                              visitor_det[0].age}
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div class="row">
                        <div class="col-sm-3">
                          <p class="mb-0">Address</p>
                        </div>
                        <div class="col-sm-9">
                          <p class="text-muted mb-0">
                            {visitor_det &&
                              visitor_det[0].address +
                                " , " +
                                visitor_det[0].city +
                                " , " +
                                visitor_det[0].state +
                                " , " +
                                visitor_det[0].country +
                                " , " +
                                visitor_det[0].postalcode}
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div class="row">
                        <div class="col-sm-3">
                          <p class="mb-0">Check In date time</p>
                        </div>
                        <div class="col-sm-9">
                          <p class="text-muted mb-0">
                            {moment(
                              visitor_det &&
                                visitor_det[0] &&
                                visitor_det[0].checkindatetime
                            ).format("DD/MM/YYYY")}
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div class="row">
                        <div class="col-sm-3">
                          <p class="mb-0">Check out date time</p>
                        </div>
                        <div class="col-sm-9">
                          <p class="text-muted mb-0">
                            {moment(
                              visitor_det &&
                                visitor_det[0] &&
                                visitor_det[0].checkoutdatetime
                            ).format("DD/MM/YYYY")}
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div class="row">
                        <div class="col-sm-3">
                          <p class="mb-0">Purpose to visit</p>
                        </div>
                        <div class="col-sm-9">
                          <p class="text-muted mb-0">
                            {visitor_det &&
                              visitor_det[0] &&
                              visitor_det[0].purposetovisit}
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div class="row">
                        <div class="col-sm-3">
                          <p class="mb-0">Assets</p>
                        </div>
                        <div class="col-sm-9">
                          <p class="text-muted mb-0">
                            {visitor_det &&
                              visitor_det[0] &&
                              visitor_det[0].assets}
                          </p>
                        </div>
                      </div>
                      <hr />
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4">
                  <div class="card mb-4 mb-md-0">
                    <div class="card-body">
                      <p class="mb-4">
                        <span class="text-primary font-italic me-1">
                          <b>Generate</b>
                        </span>
                        QR Code For Detail
                      </p>
                      <Link to={`/dashboard/scanqrcode/${id}`}>
                        <Button colorScheme="facebook">Click Now</Button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="card mb-4 mb-md-0">
                    <div class="card-body">
                      <p class="mb-4">
                        <span class="text-primary font-italic me-1">
                          {" "}
                          <b>Edit</b>
                        </span>
                        Visitor Here
                      </p>
                      <Link to={`/dashboard/visitor/editvisitor/${id}`}>
                        <Button colorScheme="facebook">Click Now</Button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="card mb-4 mb-md-0">
                    <div class="card-body">
                      <p class="mb-4">
                        <span class="text-primary font-italic me-1">
                          <b>Checkout</b>
                        </span>
                        Visitor Here
                      </p>
                      {/* <Link to={`/dashboard/visitor/checkout/${id}`}> */}
                      <Button
                        colorScheme="facebook"
                        onClick={() =>
                          Checkout(
                            visitor_det && visitor_det[0] && visitor_det[0]._id
                          )
                        }
                      >
                        Click Now
                      </Button>
                      {/* </Link> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Box>
      </Box>
      <ToastContainer />
    </>
  );
}

export default VisitorDetailsPage;

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
