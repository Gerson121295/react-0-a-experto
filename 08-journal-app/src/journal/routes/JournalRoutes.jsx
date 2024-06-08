import { Navigate } from "react-router-dom";
import { JournalPage } from "../pages/JournalPage";


export const JournalRoutes = [
    
    {// Objeto de ruta en el router
        path: "/", //URL que renderiza la página
        element: <JournalPage />,// Componente de React a renderizar
    },

    { //SI entro a esta ruta JournalRoutes y no estoy dentro del / cualquier otra ruta va a redirigir al /
        path: "*", //Si se coloca un "/" o  "*" en una ruta, quiere decir que redirige a /
        element: <Navigate to={"/"} />
    },
    
];