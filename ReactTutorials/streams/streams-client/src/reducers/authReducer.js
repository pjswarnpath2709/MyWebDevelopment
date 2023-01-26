import { SIGN_IN, SIGN_OUT } from "../actions/types";
const INITIAL_STATE = {
  isSignedIn: null,
  userID: null,
};
const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        userID: action.payload,
        isSignedIn: true,
      };
    case SIGN_OUT:
      return {
        ...state,
        userID: null,
        isSignedIn: false,
      };
    default:
      return state;
  }
};

export default authReducer;
