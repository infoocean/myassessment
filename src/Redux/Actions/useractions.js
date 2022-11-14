import axios from "axios";
import auth_token from "../../API/APIToken";
import {
  USER_LOGIN_SUCCESS,
  USER_REGISTER_SUCCESS,
} from "../Constants/userconstant";

const registrationendpoint = "receptionistregistration";
const loginendpoint = "receptionistlogin";

export const register = (data, callback) => {
  const request = axios.post(
    "http://localhost:5000/" + registrationendpoint,
    data,
    {
      headers: {
        token: auth_token,
      },
    }
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
  const request = axios.post("http://localhost:5000/" + loginendpoint, data, {
    headers: {
      token: auth_token,
    },
  });
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
