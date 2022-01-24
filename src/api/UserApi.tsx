import { UserActions } from "../storage/actions/UserActions";
import { Dispatch } from "redux";

// Url de la fake Api
const URL = "https://reqres.in/";

/**
 * @author Hernan Javier Guio
 * @function sendLoginUser
 * @param {dispatch,data:object}
 * @description método que hace peticion Post a la API para que un usuario inicier sesion
 */
const sendLoginUser = async (dispatch: Dispatch, data: object) => {
  dispatch(UserActions.REQUEST_USER_LOGIN());
  fetch(URL + "api/login", {
    method: "POST",
    body: new URLSearchParams(data),
  })
    .then(async (res) => {
      let response = await res.json();
      let status = await res.status;
      if (status == 200 || status == 201) {
        dispatch(UserActions.SUCCESSFUL_REQUEST_USER_LOGIN(response));
      } else {
        throw response.error;
      }
    })
    .catch((err) => dispatch(UserActions.UNSUCCESSFUL_REQUEST_USER_LOGIN(err)));
};

/**
 * @author Hernan Javier Guio
 * @function sendRegisterUser
 * @param {dispatch,data:object}
 * @description método que hace peticion Post a la API para que un usuario se registre
 */
const sendRegisterUser = async (dispatch: Dispatch, data: object) => {
  dispatch(UserActions.REQUEST_USER_REGISTER());
  fetch(URL + "api/register", {
    method: "POST",
    body: new URLSearchParams(data),
  })
    .then(async (res) => {
      let response = await res.json();
      let status = await res.status;
      if (status == 200 || status == 201) {
        dispatch(UserActions.SUCCESSFUL_REQUEST_USER_REGISTER(response));
      } else {
        throw response.error;
      }
    })
    .catch((err) =>
      dispatch(UserActions.UNSUCCESSFUL_REQUEST_USER_REGISTER(err))
    );
};

/**
 * @author Hernan Javier Guio
 * @function getUserList
 * @param {dispatch,data:object}
 * @description método que hace peticion Get a la API para listar a los usuarios
 */
const getUserList = async (dispatch: Dispatch, userToken: string) => {
  dispatch(UserActions.REQUEST_USER_LIST());
  fetch(URL + "api/users?page=2", {
    headers: {
      Authorization: userToken,
    },
  })
    .then(async (res) => {
      let response = await res.json();
      let status = await res.status;
      if (status == 200 || status == 201) {
        dispatch(UserActions.SUCCESSFUL_REQUEST_USER_LIST(response.data));
      } else {
        throw response.error;
      }
    })
    .catch((err) => dispatch(UserActions.UNSUCCESSFUL_REQUEST_USER_LIST(err)));
};

/**
 * @author Hernan Javier Guio
 * @function sendcreateUser
 * @param {dispatch,data:object}
 * @description método que hace peticion POST a la API para crear un nuevo usuario
 */
const sendcreateUser = async (
  dispatch: Dispatch,
  data: object,
  userToken: string
) => {
  dispatch(UserActions.REQUEST_USER_CREATE());
  fetch(URL + "api/users", {
    method: "POST",
    body: new URLSearchParams(data),
    headers: {
      Authorization: userToken,
    },
  })
    .then(async (res) => {
      let response = await res.json();
      let status = await res.status;
      if (status == 200 || status == 201) {
        dispatch(UserActions.SUCCESSFUL_REQUEST_USER_CREATE(response));
      } else {
        throw response.error;
      }
    })
    .catch((err) =>
      dispatch(UserActions.UNSUCCESSFUL_REQUEST_USER_CREATE(err))
    );
};

export default {
  sendLoginUser,
  sendRegisterUser,
  getUserList,
  sendcreateUser,
};
