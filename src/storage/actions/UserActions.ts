import { action } from "typesafe-actions";
import UserApi from "../../api/UserApi";

import { Dispatch } from "redux";

enum actionTypes {
  //Login
  REQUEST_USER_LOGIN = "REQUEST_USER_LOGIN",
  SUCCESSFUL_REQUEST_USER_LOGIN = "SUCCESSFUL_REQUEST_USER_LOGIN",
  UNSUCCESSFUL_REQUEST_USER_LOGIN = "UNSUCCESSFUL_REQUEST_USER_LOGIN",

  //Register
  REQUEST_USER_REGISTER = "REQUEST_USER_REGISTER",
  SUCCESSFUL_REQUEST_USER_REGISTER = "SUCCESSFUL_REQUEST_USER_REGISTER",
  UNSUCCESSFUL_REQUEST_USER_REGISTER = "UNSUCCESSFUL_REQUEST_USER_REGISTER",

  // Cerrar sesion
  LOG_OUT_USER = "LOG_OUT_USER",

  // Lista de usuarios
  REQUEST_USER_LIST = "REQUEST_USER_LIST",
  SUCCESSFUL_REQUEST_USER_LIST = "SUCCESSFUL_REQUEST_USER_LIST",
  UNSUCCESSFUL_REQUEST_USER_LIST = "UNSUCCESSFUL_REQUEST_USER_LIST",

  // Creacion de usuarios
  REQUEST_USER_CREATE = "REQUEST_USER_CREATE",
  SUCCESSFUL_REQUEST_USER_CREATE = "SUCCESSFUL_REQUEST_USER_CREATE",
  UNSUCCESSFUL_REQUEST_USER_CREATE = "UNSUCCESSFUL_REQUEST_USER_CREATE",
}

const UserActions = {
  // Acciones que controlan  login
  REQUEST_USER_LOGIN: () => action(actionTypes.REQUEST_USER_LOGIN, {}),
  SUCCESSFUL_REQUEST_USER_LOGIN: (data: object) =>
    action(actionTypes.SUCCESSFUL_REQUEST_USER_LOGIN, data),
  UNSUCCESSFUL_REQUEST_USER_LOGIN: (error: object) =>
    action(actionTypes.UNSUCCESSFUL_REQUEST_USER_LOGIN, error),
  // Acciones que controlan eL registro
  REQUEST_USER_REGISTER: () => action(actionTypes.REQUEST_USER_REGISTER, {}),
  SUCCESSFUL_REQUEST_USER_REGISTER: (data: object) =>
    action(actionTypes.SUCCESSFUL_REQUEST_USER_REGISTER, data),
  UNSUCCESSFUL_REQUEST_USER_REGISTER: (error: object) =>
    action(actionTypes.UNSUCCESSFUL_REQUEST_USER_REGISTER, error),
  //Cerrar sesion
  LOG_OUT_USER: () => action(actionTypes.LOG_OUT_USER, {}),
  // Listado de usuarios
  REQUEST_USER_LIST: () => action(actionTypes.REQUEST_USER_LIST, {}),
  SUCCESSFUL_REQUEST_USER_LIST: (data: object) =>
    action(actionTypes.SUCCESSFUL_REQUEST_USER_LIST, data),
  UNSUCCESSFUL_REQUEST_USER_LIST: (error: object) =>
    action(actionTypes.UNSUCCESSFUL_REQUEST_USER_LIST, error),
  // Creacion de usuarios
  REQUEST_USER_CREATE: () => action(actionTypes.REQUEST_USER_CREATE, {}),
  SUCCESSFUL_REQUEST_USER_CREATE: (data: object) =>
    action(actionTypes.SUCCESSFUL_REQUEST_USER_CREATE, data),
  UNSUCCESSFUL_REQUEST_USER_CREATE: (error: object) =>
    action(actionTypes.UNSUCCESSFUL_REQUEST_USER_CREATE, error),
};

/**
 * @author Hernan Javier Guio
 * @function sendLoginUser
 * @description Esta funcion hace el llamado a la API para iniciar sesion a un usuario
 * @param {data: object}
 * @return  {void}
 */
const sendLoginUser = (data: object) => (dispatch: Dispatch) => {
  UserApi.sendLoginUser(dispatch, data);
};

/**
 * @author Hernan Javier Guio
 * @function sendRegisterUser
 * @description Esta funcion hace el llamado a la API para registrar a un nuevo usuario
 * @param {data: object}
 * @return  {void}
 */
const sendRegisterUser = (data: object) => (dispatch: Dispatch) => {
  UserApi.sendRegisterUser(dispatch, data);
};

/**
 * @author Hernan Javier Guio
 * @function getUserList
 * @description Esta funcion hace el llamado a la API para traer una lista de usuarios
 * @param {userToken: object}
 * @return  {void}
 */
const getUserList = (userToken: string) => (dispatch: Dispatch) => {
  UserApi.getUserList(dispatch, userToken);
};

/**
 * @author Hernan Javier Guio
 * @function sendcreateUser
 * @description Esta funcion hace el llamado a la API para crear un nuevo usuario
 * @param {data: object}
 * @return  {void}
 */
const sendcreateUser =
  (data: object, userToken: string) => (dispatch: Dispatch) => {
    UserApi.sendcreateUser(dispatch, data, userToken);
  };

export {
  actionTypes,
  UserActions,
  sendLoginUser,
  sendRegisterUser,
  getUserList,
  sendcreateUser,
};
