import {
  USER_LOGIN_SUCCESS,
  USER_REGISTER_SUCCESS,
} from "../Constants/userconstant";

export const userLoginReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    default:
      return state;
  }
};
