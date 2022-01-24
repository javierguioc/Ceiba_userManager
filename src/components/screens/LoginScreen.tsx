import React, { useState } from "react";
import { useEffect } from "react";

// Se importan modulos necesarios para redux
import * as MyTypes from "../../storage/types/types";
import { connect } from "react-redux";
import { Dispatch } from "redux";

// Se importan acciones
import { sendLoginUser } from "../../storage/actions/UserActions";

// Modulo para poder navegar
import { withRouter } from "react-router";
// Modulo para alertas
import { showToastTop } from "../../services/toastService";
// Se importan los estilos
import "../../assets/styles/LoginStyles.scss";

//Se importan tipos
import { History } from "history";

import new_user from "../../assets/images/login.svg";

/**
 * @author Hernan Javier Guio
 * @function validateEmail
 * @description Valida que un texto contenga un arroba
 * @param {text: string}
 * @return  {boolean}
 */
export const validateEmail = (text: string) => /@/.test(text);

/**
 * @author Hernan Javier Guio
 * @function validatePasswordSize
 * @description Valida que un texto tenga mas de cinco caracteres
 * @param {text: string}
 * @return  {boolean}
 */
export const validatePasswordSize = (text: string) => text.length > 5;

interface Props {
  userToken: string;
  history: History;
  sendLoginUser: (data: object) => any;
}

/**
 * @author Hernan JavierGuio
 * @function LoginScreen
 * @description funcion que renderiza el formulario para que los usuarios inicier sesion
 * @param {props: Props}
 * @return  {JSX Element}
 */
const LoginScreen = (props: Props) => {
  const [state, setState] = useState({
    password: "",
    email: "",
  });

  const [isLoginDisabled, setIsLoginDisabled] = useState(true);

  const validateForm = () => {
    setIsLoginDisabled(
      !validatePasswordSize(state.password) || !validateEmail(state.email)
    );
  };

  useEffect(() => {
    validateForm();
  }, [state.email, state.password]);

  useEffect(() => {
    if (props.userToken != "") {
      props.history.push("/general");
      showToastTop("form", "Bienvenido 😎", "Has iniciado sesión.", "success");
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
   * @function handleLoginUser
   * @description Esta funcion hace el llamado a la accion para enviar al servidor el correo y contraseña del usuario que esta iniciando sesion
   * @return  {void}
   */
  const handleLoginUser = () => {
    props.sendLoginUser(state);
  };

  /**
   * @author Hernan Javier Guio
   * @function navigateToRegistry
   * @description Permite navegar a la pantalla que va al registro
   * @return  {void}
   */
  const navigateToRegistry = () => {
    props.history.push("/userRegister");
  };

  return (
    <section className="form">
      <section className="form__container">
        <img src={new_user} className={"logoUser"}></img>
        <h2>Inicia sesión</h2>
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
            id="Contraseña"
            onChange={(event) => {
              handleChangeText("password", event.target.value);
            }}
          />
          <button
            id="login-button"
            className="button"
            disabled={isLoginDisabled}
            onClick={() => handleLoginUser()}
          >
            Iniciar sesión
          </button>
          <div className="form__container--remember-me">
            <label>
              <input type="checkbox" id="cbox1" value="first_checkbox" />
              Recuérdame
            </label>
            <a>Olvidé mi contraseña</a>
          </div>
        </div>

        <p className="form__container--register">
          No tienes ninguna cuenta {""}
          <a onClick={() => navigateToRegistry()}>Regístrate</a>
        </p>
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
  sendLoginUser: (data: object) => dispatch(sendLoginUser(data)),
});
export default withRouter(
  connect(MapStateToProps, MapDispatchToProps)(LoginScreen)
);
