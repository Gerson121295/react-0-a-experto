import { Navigate } from "react-router-dom";
import { CalendarPage } from "../pages/CalendarPage";

export const CalendarRoutes  = [

     {// Objeto de ruta en el router
        path: "/", //URL que renderiza la página
        element: <CalendarPage />,// Componente a renderizar
    },

    { //SI entro a esta ruta CalendarRoutes y no estoy dentro del / cualquier otra ruta va a redirigir al /
        path: "*", //Si se coloca un "/" o  "*" en una ruta, quiere decir que redirige a /
        element: <Navigate to={"/"} />
    },




    
];