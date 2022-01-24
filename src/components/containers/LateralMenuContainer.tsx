import * as React from "react";
import { useEffect } from "react";

// Se importan acciones
import { UserActions } from "../../storage/actions/UserActions";

// Se importan modulos necesarios para redux
import * as MyTypes from "../../storage/types/types";
import { connect } from "react-redux";
import { Dispatch } from "redux";

// Modulo para poder navegar
import { withRouter } from "react-router";

// Se importan los estilos
import "../../assets/styles/LateralMenuContainerStyles.scss";

// Imagenes
import userImg from "../../assets/images/user.svg";
import crearUsuarios from "../../assets/images/createUser.svg";
import salir from "../../assets/images/salida.svg";
import logo from "../../assets/images/logo.svg";

//Se importan tipos
import { History } from "history";

// Modulo para alertas
import { showToastTop } from "../../services/toastService";
interface Props {
  userToken: string;
  history: History;
  logOutUser: () => any;
}

/**
 * @author Hernan JavierGuio
 * @function LateralMenuContainer
 * @description Esta funcion muestra la barra izquerda de la pagina
 * @param {props:Props}
 * @return  {JSX Element}
 */
const LateralMenuContainer = (props: Props) => {
  useEffect(() => {
    if (props.userToken === "") {
      props.history.push("/userLogin");
    }
  }, []);

  /**
   * @author Hernan JavierGuio
   * @function handleSignOff
   * @description Esta funcion cierrra la sesion de un usuario y lo hace navehar al login
   * @return  {void}
   */
  const handleSignOff = () => {
    props.history.push("/userLogin");
    props.logOutUser();
    showToastTop(
      "leave",
      "Has cerrado sesión",
      "Esperamos verte pronto" ,
      "info"
    );
  };

  /**
   * @author Hernan Javier Guio
   * @function manageUserList
   * @description Esta funcion navega la pantalla para listar a los usuarios
   * @return  {void}
   */
  const manageUserList = () => {
    props.history.push("/listUsers");
  };

  /**
   * @author Hernan Javier Guio
   * @function handleCreateUsers
   * @description Esta funcion navega la pantalla para crear a los usuarios
   * @return  {void}
   */
  const handleCreateUsers = () => {
    props.history.push("/createUser");
  };

  return (
    <div className="containerLateralMenu">
      <div className="fotmatLateralMenu">
        <div
          className="logoContainer"
        >
            <img src={logo} className="logoImg" />
        </div>

        <div
          className="menuLateralContainerButton"
          onClick={() => manageUserList()}
        >
          <div className="containerImagenIcon">
            <img src={userImg} className="iconOptionMenu" />
          </div>
          <a className="menuLateralTextButton">Listar Usuarios</a>
        </div>
        <div
          className="menuLateralContainerButton"
          onClick={() => handleCreateUsers()}
        >
          <div className="containerImagenIcon">
            <img src={crearUsuarios} className="iconOptionMenu" />
          </div>
          <a className="menuLateralTextButton">Crear usuarios</a>
        </div>

        <div
          className="menuLateralContainerButton"
          onClick={() => handleSignOff()}
        >
          <div className="containerImagenIcon">
            <img src={salir} className="iconOptionMenu" />
          </div>
          <a className="menuLateralTextButton">Salir</a>
        </div>
      </div>
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
  logOutUser: () => dispatch(UserActions.LOG_OUT_USER()),
});

export default withRouter(
  connect(MapStateToProps, MapDispatchToProps)(LateralMenuContainer)
);
