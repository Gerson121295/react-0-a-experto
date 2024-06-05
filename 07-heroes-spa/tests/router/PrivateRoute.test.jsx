import { render, screen } from "@testing-library/react";
import { MemoryRouter, RouterProvider, createMemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { PrivateRoute } from "../../src/router/PrivateRoute";
import { PublicRoute } from "../../src/router/PublicRoute";

describe('Pruebas en PrivateRoute', () => {

    
    test('Forma 1: debe de mostrar el children si esta autenticado: logged: true', () => {
      
        //Define la funcion para evaluar la data(ultima url buscada por el user) que se guardo en el localStorage
        Storage.prototype.setItem = jest.fn();

        const contextValue = {
            logged: true,  //autenticado
            user: { //usuario autenticado
                id: 'ABC123',
                name: 'Strider',
            }
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/search?q=batman']}> {/* se define la ruta actual */}
                    <PrivateRoute>
                        <h1>Ruta privada</h1>  {/* establece codigo */}
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
            );
    
            //screen.debug(); //muestra code HTML de la app
            //Valida que exista el texto: Ruta privada en el code - Cuando logged es true muestra el children, hijos codigo html 
            expect(screen.getByText('Ruta privada')).toBeTruthy();

            //Verifica que la funcion localStorage.setItem sea llamada para evaluar que obtiene del localStorage la ultima url vista por el user 
            expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", "/search?q=batman");
    })

    test('Forma 2: debe de mostrar el children si esta autenticado: logged: true', () => {
      //Forma Manejo de rutas version actual  usando createMemoryRouter(...):

        //Define la funcion para evaluar la data(ultima url buscada por el user) que se guardo en el localStorage
        Storage.prototype.setItem = jest.fn();

      //Data para validar que user no este logeado
      //const contextValue = { logged: false }

      //Data para validar user este loageado.
         const contextValue = {
            logged: true,  //autenticado
             user: { //usuario autenticado
                id: 'ABC123',
                name: 'Strider',
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
              element: 
                <PrivateRoute>
                    <h1>Ruta privada - Marvel</h1>,
                </PrivateRoute>
            },
          ]

          const router = createMemoryRouter(routesConfig, {
            initialEntries: ['/marvel'],
          })
           
        

          render(
            //contextValue recibe la data del user
            <AuthContext.Provider value={contextValue}>
              <RouterProvider router={router} />
            </AuthContext.Provider>
          )
    
            //screen.debug(); //muestra code HTML de la app
            //Asercion 1 - Valida que exista el texto: Ruta privada - Marvel en el code - Cuando logged es true muestra el children, hijos codigo html 
           // expect(screen.getByText('Ruta privada - Marvel')).toBeTruthy();
    
            //Verifica que la funcion localStorage.setItem sea llamada para evaluar que obtiene del localStorage la ultima url vista por el user 
           expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", "/marvel");
    
            //Asercion 2 - Para validar si usuario no esta logeado
            //expect(screen.getByText('Usuario no logeado')).toBeTruthy();
    
        })
    
})
