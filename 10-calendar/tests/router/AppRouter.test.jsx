import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
//import { CalendarPage } from '../../src/calendar';
import { useAuthStore } from '../../src/hooks/useAuthStore';
import { AppRouter } from '../../src/router/AppRouter';
import { AuthRouter } from '../../src/auth/routes/AuthRouter';
import { CalendarRouter } from '../../src/calendar/routes/CalendarRouter';

jest.mock('../../src/hooks/useAuthStore');

//Mock del componente CalendarPage, simula que este es el componente y retorna un h1
jest.mock('../../src/calendar', () => ({
    CalendarPage: () => <h1>CalendarPage</h1>
}))


/*

 / forma para el error Modal.setAppElement('#root'); consiste en realizar un mock al plugin de react-modal,
 /esto para evitar configurar el archivo: getEnvVariables.js y CalendarModal la linea: Modal.setAppElement('#root'); 

jest.mock("react-modal", () => ({
    ...jest.requireActual("react-modal"),
    setAppElement: () => {},
}));

*/

describe('Pruebas en <AppRouter />', () => {

    //establece una func en jest
    const mockCheckAuthToken = jest.fn();

    //para borrar los datos antes de cada prueba
    beforeEach(() => jest.clearAllMocks() );


    test('debe de mostrar la pantalla de carga y llamar checkAuthToken', () => {

        useAuthStore.mockReturnValue({
            status: 'checking',
            checkAuthToken: mockCheckAuthToken
        });

        render( <AppRouter /> )
        expect( screen.getByText('Revisando autenticacion...') ).toBeTruthy() 
        expect( mockCheckAuthToken ).toHaveBeenCalled();

    });

    //Modificar el AuthRouter
    test('debe de mostrar el login en caso de no estar autenticado', () => {
        
        useAuthStore.mockReturnValue({
            status: 'not-authenticated',
            checkAuthToken: mockCheckAuthToken
        });

        const { container } = render(
            <MemoryRouter initialEntries={['/auth2/algo/otracosa']}>
                <AuthRouter /> 
            </MemoryRouter>
        );

        //screen.debug(); //para ver html de LoginPage para luego validar algun texto que se encuentre y confirme que si redirigio a loginPage
        expect( screen.getByText('Ingreso') ).toBeTruthy();
        expect( container ).toMatchSnapshot(); 

    });

    //No funciono
    test('debe de mostrar el calendario si estamos autenticados', () => {
        
        useAuthStore.mockReturnValue({
            status: 'authenticated',
            checkAuthToken: mockCheckAuthToken
        });
///CalendarRouter    <CalendarPage />  <AppRouter />
        render(
            <MemoryRouter>
                <AppRouter />
            </MemoryRouter>
        );

        //screen.debug();
        expect( screen.getByText('CalendarPage') ).toBeTruthy();
        
    });
 
    
});
