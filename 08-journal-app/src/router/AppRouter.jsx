import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { LoginPage } from "../auth/pages"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { JournalRoutes } from "../journal/routes/JournalRoutes"
import { JournalPage } from "../journal/pages/JournalPage"

//Define rutas
const router = createBrowserRouter([

    /* Login y Registro */
    {
        path: "auth/*", //Cualquier path que entre o incie con /auth -> va a mostrar o renderizar el elemento <AuthRoutes/>
        children: AuthRoutes
    }, 

    /* JournalApp */
    {
        path: "/", //Cualquier otra ruta que no este definida aqui o sea /auth -> va a mostrar o renderizar el elemento <JournalRoutes/>
        children: JournalRoutes
    },

]);

//Exporta rutas
export const AppRouter = () => {
  return <RouterProvider router={router} />
}


