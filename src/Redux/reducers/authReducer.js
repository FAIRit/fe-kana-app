import { LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER } from "../actions/auth";

export default (
  state = {
    isAuthenticated: false,
    user: ""
  },
  action
) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.user
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        user: ""
      };
    case REGISTER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.user
      };
    default:
      return state;
  }
};
