import axios from "axios";
import auth_token from "./APIToken";

// api url
const api_url = "http://localhost:5000/getreceptionistbytoken/";
const getvisitorsdata = (token) => {
  var config = {
    method: "get",
    url: `${api_url}${token}`,
    headers: {
      token: auth_token,
    },
  };
  axios(config)
    .then(function (response) {
      //console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export default getvisitorsdata;
