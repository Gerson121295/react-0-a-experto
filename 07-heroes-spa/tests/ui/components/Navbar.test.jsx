const { render, screen, fireEvent } = require("@testing-library/react");
const { AuthContext } = require("../../../src/auth/context/AuthContext");
const { Navbar } = require("../../../src/ui/components/Navbar");
const { MemoryRouter, useNavigate, createMemoryRouter, RouterProvider } = require("react-router-dom");

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    //cuando se llame el useNavigate retorna mockedUseNavigate
    useNavigate: () => mockedUseNavigate 
}));

describe('Pruebas al componente Navbar', () => {

    //Data a enviar en el AuthContext.Provider para que sea usada por el Navbar
    const contextValue = {
        logged: true,
        user: {
            name: 'Juan Carlos'
        },
        logout: jest.fn() // con jest.fn se establece como funcion logout
    }

    //Antes de cada prueba limpiar cada mocks
    beforeEach(() => jest.clearAllMocks());
  
    
    test('debe de mostrar el nombre del  usuario logeado', () => {

        render(
            // se envuelve en el AuthContext debido a que navbar obtiene data, simula que se envia data por medio de value
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter >
                <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        //Muestra el code html del navbar
        //screen.debug();

        //Valida que se encuentre el nombre del user en el navbar
      expect(screen.getByText('Juan Carlos')).toBeTruthy();
    });

    test('debe de llamar el logout y navigate cuando se hace clic en el boton', () => {
      
        render(
            // se envuelve en el AuthContext debido a que navbar obtiene data, simula que se envia data por medio de value
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter >
                <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        const logoutBtn = screen.getByRole('button'); //busca el boton de logout por medio del role button
        fireEvent.click(logoutBtn); //da clic en el boton
        
        //Asercion valida que la funcion logout se tuvo que haber llamado luego de haber dado clic en el boton
        expect(contextValue.logout).toHaveBeenCalled();
        //Asercion valida que cuando se llame la funcion mockedUseNavigate navegue a la ruta /login
        expect(mockedUseNavigate).toHaveBeenCalledWith("/login", {"replace": true});
    });
    


    //Otras pruebas utilizando la Rutas version actual
       
        const routesConfig = [
          {
            path: '/',
            element: <Navbar />,
          },
          {
            path: '/login',
            element: <h1>Navega a /login</h1>,
          },
        ]
       
        const router = createMemoryRouter(routesConfig, {
          initialEntries: ['/'],
        })
       
       
        test('debe de mostrar el nombre del usuario', () => {
          render(
            <AuthContext.Provider value={contextValue}>
              <RouterProvider router={router} />
            </AuthContext.Provider>
          )
       
          expect(screen.getByText('Juan Carlos')).toBeTruthy()
        })
       
        test('debe de llamar el logout y navigate cuando se hace clic en el botón', () => {
          render(
            <AuthContext.Provider value={contextValue}>
              <RouterProvider router={router} />
            </AuthContext.Provider>
          )
       
          const logoutBtn = screen.getByRole('button')
          fireEvent.click(logoutBtn)
       
          expect(contextValue.logout).toHaveBeenCalled()
          expect(mockedUseNavigate).toHaveBeenCalledWith('/login', { replace: true })
        });

})
