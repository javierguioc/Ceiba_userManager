import React from "react";
import { Route, Switch } from "react-router-dom";

import ListUsersScreen from "../components/screens/ListUsersScreen";
import CreateUsersScreen from "../components/screens/CreateUsersScreen";
import LateralMenuContainer from "../components/containers/LateralMenuContainer";
// Imports for Redux
import { connect } from "react-redux";

// Se importan los estilos
import "../assets/styles/LateralMenuContainerStyles.scss";

/**
 * @author Hernan Javier Guio
 * @function navigationIndicator
 * @description Renderiza una barra para mostrar la ubicacion de la navegacion
 * @param {text: string}
 * @return  {JSX Element}
 */
export const navigationIndicator = (text: string) => {
  return (
    <div className="navigationIndicator">
      <b className="navigationIndicator_title">{text}</b>
    </div>
  );
};

/**
 * @author Hernan Javier Guio
 * @function LateralMenuNav
 * @description Renderiza una pantalla, al lado izquerdo un menu para navegar, y al lado derecho otras pantallas
 * @param {text: string}
 * @return  {JSX Element}
 */
const LateralMenuNav = () => {
  return (
    <div className="containerGeneral">
      <div className="containerGeneral_left">
        <LateralMenuContainer />
      </div>

      <div className="containerGeneral_right">
        <Switch>
          <Route path="/listUsers" component={ListUsersScreen} />
          <Route path="/createUser" component={CreateUsersScreen} />
          <Route path="/" component={ListUsersScreen} />
        </Switch>
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
const MapStateToProps = (store) => {
  return {};
};

export default connect(null, null)(LateralMenuNav);
