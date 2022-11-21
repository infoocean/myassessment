import React from "react";
import { useEffect } from "react";
import { React_PUBLIC_URL } from "../../API/APIToken";
import Cookies from "js-cookie";
console.log(React_PUBLIC_URL);

function Logoutpage(props) {
  useEffect(() => {
    const login_token = Cookies.get("jwttoken");
    //console.log(login_token);
    if (login_token !== undefined) {
      Cookies.remove("jwttoken", { path: "" });
      props.history.push("/loginpage");
    } else {
      props.history.push("/loginpage");
    }
  }, []);
  return <></>;
}
export default Logoutpage;
