import { useContext } from "react";
import { AuthContext } from "../auth";
import { Navigate, useLocation} from "react-router-dom";

export const PrivateRoute = ({children}) => { //recibe las children como props

    //Se llama al AuthContext por medio de useContext y se extrae logged para validar si el user esta logeado(true) o no(false)
    const {logged} = useContext(AuthContext);

    //Funcionalidad Opcional - Despues de hacer el logout y luego hacer el login nos permita volver a la pantalla que se estaba cuando se hizo el logout
    const { pathname, search } = useLocation(); //extrae el path y search el dato de la busqueda de un heroe si se realizo
    const lastPath = pathname + search; //lastPath tiene la ultima url visitada y la search busqueda
   
    localStorage.setItem('lastPath', lastPath) //Guardamos en el localStorage el lastPath la clave es: 'lastPath'

    //si esta autenticado(? "logeado") retorna el children(los hijos) la ruta,  sino(:) navega al /login
    return(logged)?children : <Navigate to="/login" />
}
