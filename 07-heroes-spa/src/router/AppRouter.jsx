import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {HeroesRoutes, ChildHeroesRoutes} from "../heroes"; // dentro de la carpeta heroes se definio el archivo de barril index. js que exporta todos los archivos de component
import { LoginPage } from "../auth";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

/*
createBrowserRouter() es la función que crea el router de nuestra aplicación. Recibe como parámetro un array de objetos 
donde esos objetos corresponden a las rutas que tendrá la aplicación. Retorna un objeto de tipo Router el cual es el que se le va a pasar al Provider.
*/

 const AppRouter = createBrowserRouter([ //Forma 2: se quita el: export(solo en Forma 1)
   
 //Ruta 1 - Login
 {
    path: "login",
    element:<PublicRoute><LoginPage /></PublicRoute>,
  },

  //Ruta 1 - HeroesApp - //Forma 1:  llamar archivo children que contiene las rutas
  {
    path: "/", 
    element: <PrivateRoute><HeroesRoutes/></PrivateRoute>, //se envuelve al componete HeroesRoutes con PrivateRoute, para definirlo como ruta privada
   // errorElement: <ErrorPage/>, //para manejar error
    children: ChildHeroesRoutes, //importar archivos que contiene las rutas
  }

  /*
    {
      path: "*", //Si se coloca un "/*" o * cuando se entra a una ruta que no existe entra a <MarvelPage/> 
      element: <MarvelPage/>,
    },
  */

 //Ruta 2 - HeroesApp - //Forma 2:  definir las rutas aqui y en el HeroesRoutes definir el outlet y llamar Navbar
/*   {
     path: "/",
     element: <HeroesApp />,
     children: [
       {
         index: true,
         element: <Navigate to={"marvel"} />,
       },

       //El objeto que representará una ruta en el router contiene los siguientes atributos principalmente
       {
         path: "marvel", //El atributo path recibe un string que representa el segmento del url que, al acceder a él, renderizará la página correspondiente.
         element: <MarvelPage />, //El atributo element recibe un Componente de React que corresponde al elemento a renderizar cuando se accede a la ruta correspondiente.
       },
       {
         path: "dc",
         element: <DcPage />,
       },
       {
         path: "search",
         element: <SearchPage />,
       },
       {
         path: "hero",
         element: <HeroPage />,
       },
       {
         path: "*", //Si se coloca un "/" o  "*" en una ruta, quiere decir que cualquier ruta que pase por ahí, sea cual sea, va a mostrar el componente específicado en path
         element: <Navigate to={"marvel"} />,
       },
     ],
   },
*/
   

 ]);

//Forma2: Definir aqui el RouterProvider para que en el main solo se Renderize <AppRoutes/>
export const AppRoutes = () => {
  return <RouterProvider router={ AppRouter } />
}
