import { store } from "react-notifications-component"; 
let notifications = [];
type AppearanceTypes = "success" | "danger" | "info" | "default" | "warning";

/**
 * @author Hernan Javier Guio
 * @function showToastTop
 * @description Renderiza alertas personalizadas
 * @param {id: string, titulo: string,  msj: string, type: AppearanceTypes, Action: (id: string) => void = () => {}}
 * @return  {JSX Element}
 */
export const showToastTop = (
  id: string,
  titulo: string,
  msj: string = "Surgió un problema [ TST-03 ] codigo",
  type: AppearanceTypes = "warning",
  Action: (id: string) => void = () => {}
) => {
  if (!notifications.includes(id) && msj != "") {
    notifications.push(id);
    store.addNotification({
      id: id,
      title: titulo,
      message: msj,
      type: type,
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "bounceIn"],
      animationOut: ["animated", "bounceOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
        touch: true,
        pauseOnHover: true,
      },
      onRemoval: (id, remove) => {
        notifications.pop(id);
      },
    });
  }
};

