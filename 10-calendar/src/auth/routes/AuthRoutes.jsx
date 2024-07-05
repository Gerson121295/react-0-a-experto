import { Navigate } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";

export const AuthRoutes  = [

    {// Objeto de ruta en el router
        path: "login", //URL que renderiza la página
        element: <LoginPage />,// Componente de React a renderizar
    },
 
    {//SI entro a esta ruta AuthRoutes y no estoy dentro de login o register cualquier otra ruta va a redirigir al /auth/login
        path: "*", //Si se coloca un "/" o  "*" en una ruta, quiere decir que cualquier ruta que pase por ahí, sea cual sea, va a mostrar el componente específicado en path
        element: <Navigate to={"/auth/login"} />
      },


];