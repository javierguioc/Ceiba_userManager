import React, { useState, useEffect } from "react";

// Se importan modulos necesarios para redux
import * as MyTypes from "../../storage/types/types";
import { connect } from "react-redux";
import { Dispatch } from "redux";

// Se importan acciones
import { sendRegisterUser } from "../../storage/actions/UserActions";

// Modulo para poder navegar
import { withRouter } from "react-router";

// Modulo para alertas
import { showToastTop } from "../../services/toastService";

// Se importan los estilos
import "../../assets/styles/RegistrationStyles.scss";

//Se importan tipos
import { History } from "history";
interface Props {
  userToken: string;
  history: History;
  sendRegisterUser: (data: object) => any;
}

/**
 * @author Hernan Javier Guio
 * @function RegistrationScreen
 * @description Clase que  despliega un formulario para que los usuarios se registren
 * @param {props: Props}
 * @return  {JSX Element}
 */
const RegistrationScreen = (props: Props) => {
  const [state, setState] = useState({
    password: "",
    email: "",
  });

  useEffect(() => {
    if (props.userToken != "") {
      props.history.push("/general");
      showToastTop(
        "login",
        "Bienvenido 😎",
        "Te has registrado exitosamente.",
        "success"
      );
    }
  }, [props.userToken]);

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
   * @author Hernan Javier Guio
   * @function handleRegisterUser
   * @description Esta funcion realiza la accion para mandar los datos de registro a internet
   * @param {state: object}
   * @return  {void}
   */
  const handleRegisterUser = () => {
    props.sendRegisterUser(state);
  };

  if (props.userToken != "") {
    props.history.push("/general");
  }

  return (
    <section className="form">
      <section className="form__container">
        <h2>Nuevo Registro</h2>
        <div className="form__container--form">
          <input
            className="form_input"
            type="text"
            placeholder="Correo"
            onChange={(event) => {
              handleChangeText("email", event.target.value);
            }}
          />
          <input
            className="form_input"
            type="password"
            placeholder="Contraseña"
            onChange={(event) => {
              handleChangeText("password", event.target.value);
            }}
          />
          <button className="button" onClick={() => handleRegisterUser()}>
            Registrarme
          </button>
        </div>
      </section>
    </section>
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
  sendRegisterUser: (data: object) => dispatch(sendRegisterUser(data)),
});
export default withRouter(
  connect(MapStateToProps, MapDispatchToProps)(RegistrationScreen)
);
