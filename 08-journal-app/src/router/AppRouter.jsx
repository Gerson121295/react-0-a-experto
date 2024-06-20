import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { JournalRoutes } from "../journal/routes/JournalRoutes"
import { CheckingAuth } from "../ui/"
import { AuthRouter } from "../auth/routes/AuthRouter"
import { JournalRouter } from "../journal/routes/JournalRouter"
import { useCheckAuth } from "../hooks"

//Define rutas
const router = createBrowserRouter([

    /* Login y Registro */
    {
        path: "auth/*", //Cualquier path que entre o incie con /auth -> va a mostrar o renderizar el elemento <AuthRoutes/>
        element: <AuthRouter/>, //realiza la proteccion de rutas y validacion del User si esta Logeado entra a: / la App
        children: AuthRoutes
    }, 

    /* JournalApp */
    {
        path: "/", //Cualquier otra ruta que no este definida aqui o sea /auth -> va a mostrar o renderizar el elemento <JournalRoutes/>
        element: <JournalRouter/>, //realiza la proteccion de rutas y validacion del User si no esta Logeado redirige al /auth/login
        children: JournalRoutes
    },
     /* {
        path: '/*',
        element: <Navigate to={'/'} />,
        //element: <Navigate to={'/auth/login'} />,
      },  */
]);

//Exporta rutas
export const AppRouter = () => {

    //Llama al customHook useCheckAuth y le extrae el status para Validar si el User esta: 'not-authenticated' o 'authenticated'
    const {status} = useCheckAuth();

    //Este loading se ejecuta no importa que ruta se quiera ir, primero hace el 'checking'
    //Valida si el status es 'checking' retorna el component  <CheckingAuth /> es un cargando-spinner
    if(status === 'checking'){
        return <CheckingAuth />
    }

    //Estas rutas se muestran cuando esta en estado: 'not-authenticated' o 'authenticated'
  return <RouterProvider router={router} />
}


