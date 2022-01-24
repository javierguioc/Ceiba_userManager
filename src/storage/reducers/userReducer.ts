import { actionTypes } from "../actions/UserActions";
import * as MyTypes from "../types/types";

interface InterfaceUser {
  loadingAuthentication: boolean;
  userError: any;
  userToken: string;
  userList: object[];
  loadingUsers: boolean;
  loadingCreateUser: boolean;
  info: object;
}
export const initialState: InterfaceUser = {
  loadingAuthentication: false,
  userError: "",
  userToken: "",
  userList: [],
  loadingUsers: false,
  loadingCreateUser: false,
  info: {},
};

const User = (
  state: InterfaceUser = initialState,
  action: MyTypes.UserActions
) => {
  switch (action.type) {
    // Loading
    case actionTypes.REQUEST_USER_LOGIN:
      return {
        ...state,
        loadingAuthentication: true,
        userError: "",
        userToken: "",
      };

    case actionTypes.SUCCESSFUL_REQUEST_USER_LOGIN:
      return {
        ...state,
        loadingAuthentication: false,
        userError: "",
        userToken: action.payload.token,
      };

    case actionTypes.UNSUCCESSFUL_REQUEST_USER_LOGIN:
      return {
        ...initialState,
        userError: action.payload,
      };

    // Register
    case actionTypes.REQUEST_USER_REGISTER:

      return {
        ...state,
        loadingAuthentication: true,
        userError: null,
        userToken: "",
      };

    case actionTypes.SUCCESSFUL_REQUEST_USER_REGISTER:

      return {
        ...state,
        loadingAuthentication: false,
        userError: null,
        userToken: action.payload.token,
      };

    case actionTypes.UNSUCCESSFUL_REQUEST_USER_REGISTER:

      return {
        ...state,
        loadingAuthentication: false,
        userError: action.payload,
        userToken: "",
      };

    // Cerrar sesion
    case actionTypes.LOG_OUT_USER:
      return {
        ...initialState,
        userToken: "",
      };

    // Listado de usuarios
    case actionTypes.REQUEST_USER_LIST:
      return {
        ...state,
        loadingUsers: true,
        userError: "",
        userList: [],
      };

    case actionTypes.SUCCESSFUL_REQUEST_USER_LIST:
      
      return {
        ...state,
        loadingUsers: false,
        userError: null,
        userList: Object.values(action.payload),
      };

    case actionTypes.UNSUCCESSFUL_REQUEST_USER_LIST:
     
      return {
        ...state,
        loadingUsers: false,
        userError: action.payload,
        userList: [],
      };

    //Crear usuarios
    case actionTypes.REQUEST_USER_CREATE:
      return {
        ...state,
        loadingCreateUser: true,
        userError: null,
        info: {},
      };

    case actionTypes.UNSUCCESSFUL_REQUEST_USER_CREATE:

      return {
        ...state,
        loadingCreateUser: false,
        userError: action.payload,
        info: {},
      };
    case actionTypes.SUCCESSFUL_REQUEST_USER_CREATE:
      return {
        ...state,
        loadingCreateUser: false,
        userError: null,
        info: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};

export default User;
