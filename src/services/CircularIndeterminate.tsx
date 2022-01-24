import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

/**
 * @author Hernan Javier Guio
 * @function UtilsCircularIndeterminate
 * @description Renderiza un indicador de carga
 * @param {}
 * @return  {JSX Element}
 */
export default function UtilsCircularIndeterminate() {
  return <CircularProgress size={60} />;
}
