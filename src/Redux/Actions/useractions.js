import axios from "axios";
import {
  USER_LOGIN_SUCCESS,
  USER_REGISTER_SUCCESS,
} from "../Constants/userconstant";

const registrationendpoint = "usersignup";
const loginendpoint = "userlogin";

export const register = (data, callback) => {
  const request = axios.post(
    "https://mytaskbackendserver.herokuapp.com/" + registrationendpoint,
    data
  );
  return (dispatch) => {
    request
      .then((res) => {
        callback(res);
        dispatch({
          type: USER_REGISTER_SUCCESS,
          payload: res.data,
        });
      })
      .catch(function (error) {
        callback(error);
      });
  };
};

export const login = (data, callback) => {
  const request = axios.post(
    "https://mytaskbackendserver.herokuapp.com/" + loginendpoint,
    data
  );
  return (dispatch) => {
    request
      .then((res) => {
        callback(res);
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: res.data,
        });
      })
      .catch(function (error) {
        callback(error);
      });
  };
};
