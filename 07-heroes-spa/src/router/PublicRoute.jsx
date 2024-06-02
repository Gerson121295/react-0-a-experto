import { useContext } from "react";
import { AuthContext } from "../auth";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({children}) => {

    //Se llama al AuthContext por medio de useContext y se extrae logged para validar si el user esta logeado(true) o no(false)
    const {logged} = useContext(AuthContext);

    //Si ya hizo login y quiere regresar(clic en flecha <- ) no permite volver al login, lo redirige a la ruta /marvel
  //si es diferente ! de autenticado(? "No logeado") retorna el children(los hijos) la ruta,  sino(":" esta autenticado) navega a la ruta /marvel
  return (!logged) ? children : <Navigate to="/marvel" />
}
