import React from "react";
import { useEffect } from "react";
import { React_PUBLIC_URL } from "../../API/APIToken";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Logoutpage(props) {
  useEffect(() => {
    const login_token = Cookies.get("jwttoken");
    //console.log(login_token);
    if (login_token !== undefined) {
      Cookies.remove("jwttoken", { path: "" });
      toast.success("Logout Successfull !");
      props.history.push("/loginpage");
    } else {
      props.history.push("/loginpage");
      toast.success("Logout Successfull !");
    }
  }, []);
  return (
    <>
      <ToastContainer />
    </>
  );
}
export default Logoutpage;
