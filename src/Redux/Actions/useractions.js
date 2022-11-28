import axios from "axios";
import auth_token from "../../API/APIToken";
import { api } from "../../API/APIToken";
import {
  USER_LOGIN_SUCCESS,
  USER_REGISTER_SUCCESS,
} from "../Constants/userconstant";

const registrationendpoint = "receptionistregistration";
const loginendpoint = "receptionistlogin";
const visitorregistrationendpoint = "visitorregistration";
const updatevisitorendpoint = "editvisitor";

export const register = (data, callback) => {
  const request = axios.post(`${api}` + registrationendpoint, data, {
    headers: {
      Authorization: auth_token,
    },
  });
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
  const request = axios.post(`${api}` + loginendpoint, data, {
    headers: {
      Authorization: auth_token,
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

export const visitorregistration = (data, callback) => {
  const request = axios.post(`${api}` + visitorregistrationendpoint, data, {
    headers: {
      Authorization: auth_token,
    },
  });
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

export const updatevisitor = (data, callback) => {
  const request = axios.post(`${api}` + updatevisitorendpoint, data, {
    headers: {
      token: auth_token,
    },
  });
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
