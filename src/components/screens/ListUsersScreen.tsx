import * as React from "react";
import { useEffect } from "react";

// Se importan modulos necesarios para redux
import * as MyTypes from "../../storage/types/types";
import { connect } from "react-redux";
import { Dispatch } from "redux";
// Modulo para poder navegar
import { withRouter } from "react-router";
//Se importa la accion
import { getUserList } from "../../storage/actions/UserActions";

import { navigationIndicator } from "../../routes/LateralMenuNav";

// Se importan los estilos
import "../../assets/styles/ListUsersStyles.scss";

// Se importa el icono
import circulo from "../../assets/images/check.svg";

// Animacion para loading
import CircularIndeterminate from "../../services/CircularIndeterminate";

interface User {
  first_name: String;
  last_name: String;
  avatar: String;
  email: String;
}

interface FilteredUser {
  profilePicture: string;
  email: String;
  name: String;
}

interface PropsDrawIndividualuser {
  props: FilteredUser;
}
/**
 * @author Hernan Javier Guio
 * @function organizeItems
 * @description Esta funcion organiza algabeticamente los objetos que representan a los usuaiors , adenas renombra el formato de sus objetos correspondientes
 * @param {array:object[]}
 * @return  {array:FilteredUser[]}
 */
export const organizeItems = (array: User[]) => {
  if (Array.isArray(array)) {
    const result = array.map((user: User) => {
      return {
        name: user.first_name + " " + user.last_name,
        profilePicture: user.avatar,
        email: user.email,
      };
    });
    return result.sort(function (a, b) {
      var n = a.name
        .toLocaleLowerCase()
        .localeCompare(b.name.toLocaleLowerCase());
      return n === 0 && a.name !== b.name ? b.name.localeCompare(a.name) : n;
    });
  } else {
    return [];
  }
};

/**
 * @author Hernan Javier Guio
 * @function DrawIndividualuser
 * @description Esta funcion renderiza cada fila que contiene la informacion de cada usuario
 * @param {props:PropsDrawIndividualuser}
 * @return  {JSX Element}
 */
const DrawIndividualuser = (props: PropsDrawIndividualuser) => {
  let user: FilteredUser = props.props;
  return (
    <div key={user.name + "_id"} className="CardUsuarios">
      <div className="contentCircle">
        <img src={circulo} className="dataCircle" />
      </div>
      <div className="contentImg">
        <img src={user.profilePicture} className="dataImg" />
      </div>
      <div className="contentData">
        <a className="dataname">{user.name}</a>
        <a className="dataemail">E-mail: {user.email}</a>
      </div>
    </div>
  );
};

interface Props {
  getUserList: (token: string) => any;
  userToken: string;
  userList: User[];
  loadingUsers: boolean;
}

/**
 * @author Hernan Javier Guio
 * @function ListUsersScreen
 * @description funcion que renderiza la pantalla para que se muestren los usuarios
 * @param {props: Props}
 * @return  {JSX Element}
 */
const ListUsersScreen = (props: Props) => {
  useEffect(() => {
    props.getUserList(props.userToken);
  }, []);

  let usersAtray = organizeItems(props.userList);

  if (props.loadingUsers) {
    return (
      <div>
        {navigationIndicator("Lista de Usuarios")}
        <div className="contentLoadingAnimation">
          <CircularIndeterminate />
          <h1>Cargando ...</h1>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        {navigationIndicator("Lista de Usuarios")}
        <div className="contentUser">
          <div className="contentCard">
            {usersAtray.map((user: any, i) => {
              return <DrawIndividualuser key={i + "userss"} props={user} />;
            })}
          </div>
        </div>
      </div>
    );
  }
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
    userList: store.User.userList,
    loadingUsers: store.User.loadingUsers,
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
  getUserList: (userToken: string) => dispatch(getUserList(userToken)),
});
export default withRouter(
  connect(MapStateToProps, MapDispatchToProps)(ListUsersScreen)
);
