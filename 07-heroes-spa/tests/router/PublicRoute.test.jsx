import { render, screen } from "@testing-library/react"
import { PublicRoute } from "../../src/router/PublicRoute"
import { AuthContext } from "../../src/auth"
import { MemoryRouter, Route, RouterProvider, Routes, createMemoryRouter } from "react-router-dom";

describe('Pruebas en PublicRouter.jsx', () => {
  
    test(' debe de mostrar el children si no esta autenticado: logged es false', () => {
        
        const contextValue = {
            logged: false //no autenticado
        }

        render(
        <AuthContext.Provider value={contextValue}>
            <PublicRoute>
                <h1>Ruta publica</h1>  {/* establece codigo */}
            </PublicRoute>
        </AuthContext.Provider>
        );

        //screen.debug(); //muestra code HTML de la app
        //Valida que exista el texto: Ruta publica en el code - Cuando logged es false muestra el children, hijos codigo html 
        expect(screen.getByText('Ruta publica')).toBeTruthy();
    });


    test('debe de navegar hacia /marvel si esta autenticado', () => {

        /*  //Forma del profesor: Manejo de rutas version anterior
        const contextValue = {
            logged: true,  //autenticado
            user: {
                name: 'Strider',
                id: 'ABC123'
            }
        }

        render(
         <AuthContext.Provider value={contextValue}>
            <MemoryRouter initialEntries={['/login']}>
                
                <Routes>
                    <Route path="login" element={
                         <PublicRoute>
                         <h1>Ruta publica</h1>  
                     </PublicRoute>
                    } />
                    <Route path="marvel" element={ <h1>Pagina marvel</h1>} />
                </Routes>

            </MemoryRouter>
        </AuthContext.Provider>
        );
        */


        //Forma Manejo de rutas version actual  usando createMemoryRouter(...):   
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
              element: <h1>MarvelPage</h1>,
            },
          ]

          const router = createMemoryRouter(routesConfig, {
            initialEntries: ['/login'],
          })

          render(
            <AuthContext.Provider value={contextValue}>
              <RouterProvider router={router} />
            </AuthContext.Provider>
          )
       
          expect(screen.getByText('MarvelPage')).toBeTruthy()
        //screen.debug();
    });

    
});
