import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { CalendarRoutes } from "../calendar/routes/CalendarRoutes";


const authStatus = 'authenticated'; //'authenticated'; // 'not-authenticated';

//Define las rutas
 const router = createBrowserRouter([
    
    (authStatus === 'not-authenticated') ? //valida si User esta Autenticado

    //Si no esta autenticado hace el Login
    //Login
    {
        path:"/auth/*", //Cualquier path que entre o incie con /auth -> va a mostrar o renderizar el elemento <LoginPage/>
        element: <LoginPage/>,
        children: AuthRoutes,
    }

    : //Si no esta autenticado

    //Usuario autenticado 
    { 
        path: "/", //cualquier ruta que no sea las que ya esten definidas(que no sea auth/*)
        element: <CalendarPage />,
        children: CalendarRoutes,
    },

    //si no esta autenticado el User redirecciona a la ruta de /auth/login, las rutas anteriores estarán condicionadas para validar si se esta autenticado
     { 
        path: "/*", //cualquier ruta que no sea las que ya esten definidas(que no sea auth/*)
        element: <Navigate to="/auth/login" />,
    },
])

export const AppRouter = () => {

    return <RouterProvider router={router} />
}
