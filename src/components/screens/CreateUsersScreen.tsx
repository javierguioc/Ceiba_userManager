import React, { useState } from "react";
import { useEffect } from "react";
// Se importan modulos necesarios para redux
import * as MyTypes from "../../storage/types/types";
import { connect } from "react-redux";
import { Dispatch } from "redux";
// Modulo para poder navegar
import { withRouter } from "react-router";

// Se importan acciones
import { sendcreateUser, UserActions } from "../../storage/actions/UserActions";

// Modulo para alertas
import { showToastTop } from "../../services/toastService";

// Se importan los estilos
import "../../assets/styles/CreateUsersStyles.scss";

//Se importan tipos
import { History } from "history";

import new_user from '../../assets/images/createUser.svg'

interface Info {
  id: String;
  name: String;
}

interface Props {
  info: Info;
  history: History;
  userToken: String;
  sendcreateUser: (data: object, token: String) => any;
  clearInformation: () => any;
}

/**
 * @author Hernan Javier Guio
 * @function CreateUsersScreen
 * @description Esta funcion muestra la pantalla para crear un nuevo usuario
 * @param {props:Props}
 * @return  {JSX Element}
 */
const CreateUsersScreen = (props: Props) => {
  useEffect(() => {
    if (props.info.id) {
      showToastTop(
        "create",
        "! Creación exitosa ¡",
        "Has creado el usuario " + props.info.name,
        "success"
      );
      props.clearInformation();
      props.history.push("/");
    }
  }, [props.info]);

  const [state, setState] = useState({
    name: "",
    job: "",
  });

  /**
   * @author Hernan Javier Guio
   * @function handleChangeText
   * @description Esta funcion permite refrescat los datos del estado
   * @param {name: string, value: string}
   * @return  {void}
   */
  const handleChangeText = (name: string, value: string) => {
    setState({ ...state, [name]: value });
  };

  /**
   * @function manageUserCreation
   * @description se encarga de hacer el llamado de la accion para crear un nuevo usuario
   * @return  {void}
   */
  const manageUserCreation = () => {
    props.sendcreateUser(state, props.userToken);
  };

  return (
    <div className="divContainer_create_user">
      <section className="create_user">
        <section className="create_user__container">
          <img src={new_user} className={'logoUser'}></img>
          <h2>Crear nuevo usuario</h2>
          <div className="create_user__container--form">
            <input
              className="create_user_input"
              type="text"
              placeholder="Nombre"
              onChange={(event) => {
                handleChangeText("name", event.target.value);
              }}
            />
            <input
              className="create_user_input"
              type="text"
              placeholder="Trabajo"
              onChange={(event) => {
                handleChangeText("job", event.target.value);
              }}
            />
            <button
            id="create_user_button"
              className="create_user_button"
              onClick={() => manageUserCreation()}
            >
              Crear Usuario
            </button>
          </div>
        </section>
      </section>
    </div>
  );
};

/**
 * @author Hernan Javier Guio
 * @function MapStateToProps
 * @description Esta funcion permite conectar las props del componente con el store de redux
 * @param {store:MyTypes.ReducerState}
 * @return  {props:Props}
 */
const MapStateToProps = (store: MyTypes.ReducerState) => {
  return {
    userToken: store.User.userToken,
    info: store.User.info,
  };
};
/**
 * @author Hernan Javier Guio
 * @function MapDispatchToProps
 * @description Esta funcion permite conectar las props del componente con las acciones de redux
 * @param {dispatch: Dispatch}
 * @return  {props:Props}
 */
const MapDispatchToProps = (dispatch: Dispatch) => ({
  sendcreateUser: (data: object, userToken: string) => {
    dispatch(sendcreateUser(data, userToken));
  },
  clearInformation: () =>
    dispatch(UserActions.SUCCESSFUL_REQUEST_USER_CREATE({})),
});
export default withRouter(
  connect(MapStateToProps, MapDispatchToProps)(CreateUsersScreen)
);
