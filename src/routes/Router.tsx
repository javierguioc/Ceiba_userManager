import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
// Componentes de la navegacion
import LoginScreen from "../components/screens/LoginScreen";
import RegistrationScreen from "../components/screens/RegistrationScreen";
import LateralMenuNav from "./LateralMenuNav";

/**
 * @author Hernan Javier Guio
 * @function Root
 * @description Permite la navegacion entre distintas screens
 * @return  {JSX Element}
 */
const Root = () => (
  <Router>
    <Switch>
      <Route exact path="/userRegister" component={RegistrationScreen} />
      <Route exact path="/userLogin" component={LoginScreen} />
      <Route path="/" component={LateralMenuNav} />
    </Switch>
  </Router>
);

export default Root;
