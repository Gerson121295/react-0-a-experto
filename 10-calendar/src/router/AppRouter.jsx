import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";
import { useAuthStore } from "../hooks";
import { useEffect } from "react";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { CalendarRoutes } from "../calendar/routes/CalendarRoutes";
import { AuthRouter } from "../auth/routes/AuthRouter";
import { CalendarRouter } from "../calendar/routes/CalendarRouter";


 //Define las rutas
  const router = createBrowserRouter([
    
    //Si no esta autenticado hace el Login
    //Login
    {
        path:"auth/*", //Cualquier path que entre o incie con /auth -> va a mostrar o renderizar el elemento <LoginPage/>
        element: <AuthRouter/>, //realiza la proteccion de rutas y validacion del User si esta Logeado entra a: / la App
        children: AuthRoutes,  //rutas de auth
    },

    //Usuario autenticado 
    { 
        path: "/", //cualquier ruta que no sea las que ya esten definidas(que no sea auth/*)
        element: <CalendarRouter />, //proteccion de rutas con validaciones
        children: CalendarRoutes,  //rutas de calendar
    },

  /*  //si no esta autenticado el User redirecciona a la ruta de /auth/login, las rutas anteriores estarán condicionadas para validar si se esta autenticado
        { 
        path: "/*", //cualquier ruta que no sea las que ya esten definidas(que no sea auth/*)
        element: <Navigate to="/auth/login" />,
    }, */  
]) 



export const AppRouter = () => {

    //console.log(getEnvVariables()); //ver variables de entorno configuradas.
    
    //Se extrae propiedades y func del hook useAuthStore para validar el estado de autenticacion del User
    const { status, checkAuthToken }  = useAuthStore();

    useEffect(() => {
        checkAuthToken();
    }, [])

        if (status === 'checking') return (<h3>Revisando autenticacion...</h3>)

/*       //Validacion sin archivos (CalendarRouter y AuthRouter) para proteccion y validacion de rutas: 
        const router = createBrowserRouter([
            //Login
            (status === 'authenticated') ?
                { 
                    path: "/", //cualquier ruta que no sea las que ya esten definidas(que no sea auth/*)
                    element: <CalendarPage />,
                    children: CalendarRoutes,
                }
            :
                {
                    path:"/auth/*", //Cualquier path que entre o incie con /auth -> va a mostrar o renderizar el elemento <LoginPage/>
                    element: <LoginPage/>,
                    children: AuthRoutes,
                },        
            //si no esta autenticado el User redirecciona a la ruta de /auth/login, las rutas anteriores estarán condicionadas para validar si se esta autenticado
                  { 
                path: "/*", //cualquier ruta que no sea las que ya esten definidas(que no sea auth/*)
                element: <Navigate to="/auth/login" />,
            },     
        ])
*/
        
    return <RouterProvider router={router} />
}
