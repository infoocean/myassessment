import React, { useEffect, useState } from "react";
import {
  IconButton,
  Avatar,
  CloseButton,
  Flex,
  HStack,
  Checkbox,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  FlexProps,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Container,
  Spacer,
  Box,
  Select,
  FormControl,
  FormLabel,
  Stack,
  Button,
} from "@chakra-ui/react";
import {
  FiHome,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiLogOut,
} from "react-icons/fi";
import { IoIosPeople, IoMdArrowRoundBack } from "react-icons/io";
import { IconType } from "react-icons";
import { ImQrcode } from "react-icons/im";
import { Link } from "react-router-dom";
import auth_token, { api } from "../../API/APIToken";
import axios from "axios";
import moment from "moment";
import SearchApp from "./VisitorComp/Searchvisitortable";
const getvisitorsendpoint = "getvisitors";

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

function VisitorsPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [getvisitors, setgetvisitors] = useState([]);

  const getvisitorsdata = () => {
    var config = {
      method: "get",
      url: `${api}${getvisitorsendpoint}`,
      headers: {
        token: auth_token,
      },
    };
    axios(config)
      .then(function (response) {
        //console.log(response.data);
        setgetvisitors(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    getvisitorsdata();
  }, []);

  console.log(getvisitors);

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
          <Container maxW="7xl">
            <Flex>
              <Box>
                <Link to="/dashboard/home">
                  <Button
                    type="submit"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    <IoMdArrowRoundBack /> Recent Check In Visitor
                  </Button>
                </Link>
              </Box>
              <Spacer />
              <Box>
                <Link to="/dashboard/visitors/addvisitor">
                  <Button
                    type="submit"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Add Visitor +
                  </Button>
                </Link>
              </Box>
            </Flex>
            {/* <div class="row text-center" style={{ backgroundColor: "#ffffff" }}>
              <div className="col-lg-9 p-4">
                <HStack>
                  <FormControl id="email">
                    <FormLabel>Visitor Name</FormLabel>
                    <Input type="email" size="sm" />
                  </FormControl>
                  <FormControl id="email">
                    <FormLabel>Visitor Email</FormLabel>
                    <Input type="email" size="sm" />
                  </FormControl>
                  <FormControl pt={8}>
                    <Checkbox>Check In</Checkbox>
                  </FormControl>
                  <FormControl pt={8}>
                    <Button
                      type="submit"
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                      // disabled={isSubmitting}
                    >
                      Search
                    </Button>
                  </FormControl>
                </HStack>
              </div>
            </div> */}
          </Container>
          <SearchApp data={getvisitors} />
          {/* <div>
            <table className="table align-middle mb-0 bg-white">
              <thead className="bg-light">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>Address</th>
                  <th>visit</th>
                  <th>Chk-In D-T</th>
                  <th>Chk-Out D-T</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {getvisitors &&
                  getvisitors.map((visitordata, key) => {
                    return (
                      <tr key={key}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                              alt=""
                              style={{ width: "45px", height: "45px" }}
                              className="rounded-circle"
                            />
                            <div className="ms-3">
                              <p className="fw-bold mb-1">{visitordata.name}</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="text-muted mb-0">{visitordata.email}</p>
                        </td>
                        <td>
                          <span className="">{visitordata.age}</span>
                        </td>
                        <td>{visitordata.address}</td>
                        <td>{visitordata.purposetovisit}</td>
                        <td>
                          {moment(visitordata.checkindatetime).format(
                            "DD/MM/YYYY"
                          ) +
                            " - " +
                            moment(visitordata.checkindatetime).format(
                              "h:mm a"
                            )}
                        </td>
                        <td>
                          {moment(visitordata.checkoutdatetime).format(
                            "DD/MM/YYYY"
                          ) +
                            " - " +
                            moment(visitordata.checkindatetime).format(
                              "h:mm a"
                            )}
                        </td>

                        <td>
                          <Link
                            to={`/dashboard/visitors/visitordetails/${visitordata._id}`}
                          >
                            <button
                              type="button"
                              className="btn btn-link btn-sm btn-danger btn-rounded"
                              _hover={{
                                bg: "blue.500",
                              }}
                            >
                              Details
                            </button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div> */}
        </Box>
      </Box>
    </>
  );
}
export default VisitorsPage;

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
