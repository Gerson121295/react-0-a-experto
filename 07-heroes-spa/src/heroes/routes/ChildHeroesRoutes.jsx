
import { DcPage, HeroPage, MarvelPage, SearchPage } from "../pages";
import { Navigate } from "react-router-dom";
export const ChildHeroesRoutes = [

     {
        index: true,
        element: <MarvelPage/>
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
        path: "hero/:id", //hero
        element: <HeroPage />,
      },
      {
        path: "/", //Si se coloca un "/" o  "*" en una ruta, quiere decir que cualquier ruta que pase por ahí, sea cual sea, va a mostrar el componente específicado en path
        element: <Navigate to={"/marvel"} />
      },
      {
        path: "*", //Si se coloca un "/*" o * cuando se entra a una ruta que no existe entra a <MarvelPage/> 
        element: <MarvelPage/>,
      },
]


//Aqui tambien se podria definir el codigo de: export HeroesRoutes:
/*

export const HeroesRoutes = () => {
  return (
    <>
        <Navbar />

        <div className="container">
        <Outlet 
        //AppRoutes define las rutas de la app y Outlet se utiliza dentro de los componentes de esas rutas para renderizar sus rutas hijas.
        />
        </div>
    </>
  )
}
*/