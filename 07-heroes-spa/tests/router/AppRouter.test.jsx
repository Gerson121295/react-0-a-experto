import { render, screen} from "@testing-library/react"

import { AppRoutes } from "../../src/router/AppRouter"
import { AuthContext } from "../../src/auth"
import { RouterProvider, createMemoryRouter } from "react-router-dom"
import { PublicRoute } from "../../src/router/PublicRoute";
import { PrivateRoute } from "../../src/router/PrivateRoute";
import { ChildHeroesRoutes } from "../../src/heroes";

describe('Pruebas en AppRouter', () => {
    
  test('debe de mostrar el login si no esta autenticado', () => {
    
    const contextValue = {
      logged: false,  //autenticado
    }

    const routesConfig = [
      {
        path: '/login',
        element: (
          <PublicRoute>
            <h1>Usuario no logeado</h1>
          </PublicRoute>
        ),
      },
      {
        path: '/marvel',
        element: <PrivateRoute ><h1>MarvelPage</h1></PrivateRoute>
      },
    ]

     const router = createMemoryRouter(routesConfig, {
      initialEntries: ['/marvel'],
    }) 

    render(
           /*  <MemoryRouter initialEntries={['/marvel']}> */
            <AuthContext.Provider value={contextValue}>
              <AppRoutes router={router} />
            </AuthContext.Provider>
           /*  </MemoryRouter> */
    );

    //screen.debug(); //muestra el code html del AppRouter
    //expect(screen.getAllByText('Login')).toBeTruthy();
    //Valida que en el codigo html de LoginPage solo aparezca 2 veces la palabra Login
    expect(screen.getAllByText('Login').length).toBe(2); 

  });


  test('Debe de mostrar el componente de marvel si esta autenticado', () => {
    
    const contextValue = {
      logged: true,  //autenticado
      user: {
          name: 'Strider',
          id: 'ABC123'
      }
    }

    const routesConfig = [
      {
        path: '/login',
        element: (
          <PublicRoute>
            <h1>Usuario no logeado</h1>
          </PublicRoute>
        ),
      },
      {
        path: '/marvel',
        element: <PrivateRoute ><h1>MarvelPage</h1></PrivateRoute>
      }, 
    ]

     const router = createMemoryRouter(routesConfig, {
      initialEntries: ['/login'],
    }) 

    render(
            <AuthContext.Provider value={contextValue}>
              <AppRoutes router={router} />
            </AuthContext.Provider>
    );

    //screen.debug();
 //Valida que en el codigo html aparezca por lo menos 1 vez la palabra 'Marvel'
  expect(screen.getAllByText('Marvel').length).toBeGreaterThanOrEqual(1);
  
});


/*
//Otra forma de un compañero
test('Debe de mostrar el login si no esta autenticado', () => {
        
  const contextValue = {
      logged: false,
    };
 
    const router = createMemoryRouter(AppRoutes, {
      initialEntries: ["/marvel", "/login"],
      initialIndex: 1,
    });
 
    render(
      <AuthContext.Provider value={contextValue}>
        <RouterProvider router={router} />
      </AuthContext.Provider>
    );

    expect(screen.getAllByText('Login').length).toBe(2);
});


test('Debe de mostrar el componente de marvel si esta autenticado', () => {    
  const contextValue = {
    logged: true,
    user: {
      name: 'Armando',
      id: 'ABC'
    },
  };

  const router = createMemoryRouter(AppRoutes, {
    initialEntries: ["/login", "/marvel"],
    initialIndex: 1,
  });

  render(
    <AuthContext.Provider value={contextValue}>
      <RouterProvider router={router}/>
    </AuthContext.Provider>
  );

  expect(screen.getAllByText('Marvel').length).toBeGreaterThanOrEqual(1);
});

*/

});
