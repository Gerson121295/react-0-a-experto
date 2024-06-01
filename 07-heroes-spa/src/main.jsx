import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import {HeroesApp} from './HeroesApp'
//import { AppRoutes } from './router/AppRouter'  //forma 2

/* import { RouterProvider } from 'react-router-dom'
import { AppRouter } from './router/AppRouter';
 */

 //Rutas Forma 1: importa el archivo que contiene las rutas, Y en RouterProvider pasar el router
 //const router = AppRouter;

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>

      {/*   <AppRoutes/>  //Forma 2 -> Ahora se renderiza en el HeroesApp*/}
      <HeroesApp/>

    {/*  <RouterProvider router={router} /> //forma 1: */}

  </React.StrictMode>,
)
