import { fireEvent, render, screen } from "@testing-library/react"
import { LoginPage } from "../../../src/auth/pages/LoginPage"
import { Provider, useDispatch } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { authSlice} from "../../../src/store/auth"
//import { startGoogleSignIn, startLoginWithEmailPassword } from "../../../src/store/auth/thunks"
import { MemoryRouter } from "react-router-dom"
import { notAuthenticatedState } from "../../fixtures/authFixtures"

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({ //para no suscribir un mock completo de la ruta /thunks, si no solo los especificos
    startGoogleSignIn: () => mockStartGoogleSignIn, //al llamar a la funcion startGoogleSignIn retorna una funcion simulada
    startLoginWithEmailPassword: ({email, password}) => { //se asegura que la funcion se llamada con el: email y password que espera
        return () => mockStartLoginWithEmailPassword({email, password})
    },
}));

//Mock para simular o suscribir el comportamiento del dispatch
jest.mock('react-redux', () => ({ //mock de solo el dispatch de la ruta: react-redux esto para no suscribir las otras funciones 
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn) => fn(), //dispatch recibe la funcion y la manda a llamar. cuando se llame el useDispatch regresa la funcion personalizada que recibe una funcion y la manda a llamar
}));

//store que se proporcional al Provider del render
const store = configureStore({
    //Proporcionar el reducer
    reducer: {
        auth: authSlice.reducer
    },
    
    //Precargar un estado al store
    preloadedState: {
        //Cuando el boton google tenga estado de notAuthenticatedState se le puede hacer clic por lo tanto carga este estado a: auth
        auth: notAuthenticatedState  //notAuthenticatedState dato inicial def: fixtures/authFixtures
    }
})


describe('Prueba en LoginPage', () => {

    //limpieza de mocks antes de cada prueba
    beforeEach(() => jest.clearAllMocks()); 


    test('debe mostrar el componente correctamente', () => {
      
        //Renderizar el component
        render(
            <Provider store={store}>
                <MemoryRouter>
                <LoginPage/>
                </MemoryRouter>
            </Provider>
            
        );

        //muestra el code html del component LoginPage para tener informacion y hacer las pruebas
        //screen.debug(); 
        
        //Valida que encuentre la palabra login exista por lo menos 1 vez
        expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
    });

    

    
    test('Boton de google debe de llamar el startGoogleSignIn', () => {
      
         //Renderizar el component
         render(
            <Provider store={store}>
                <MemoryRouter>
                <LoginPage/>
                </MemoryRouter>
            </Provider>
            
        );

        //muestra el code html del component LoginPage para tener informacion y hacer las pruebas
        //screen.debug(); 
        //En LoginPage al boton de google aria-label='google-btn' se le agrego un identificador para tener acceso al boton en los TEST
        const googleBtn = screen.getByLabelText('google-btn');
        //console.log(googleBtn);
        //Clic al boton de Google para la autenticacion
        fireEvent.click(googleBtn);

        //Evalua si al dar clic en el boton de Google se llama la funcion mockStartGoogleSignIn que es la startGoogleSignIn
        expect(mockStartGoogleSignIn).toHaveBeenCalled();

    });



    //al hacer el submit del formulario se llame la func. startLoginWithEmailPassword con el email y password
    test('submit debe de llamar startLoginWithEmailPassword con el email y password', () => {
      
        //Datos de prueba
        const email = 'gerson@google.com';
        const password = '123456';
        
        render(
            <Provider store={store}>
                <MemoryRouter>
                <LoginPage/>
                </MemoryRouter>
            </Provider>
            
        );

        //selecciona un textbox(TextField) con nombre del campo Correo (label) definido en LoginPage
        const emailField = screen.getByRole('textbox', {name:'Correo'}); //{name:'Correo2'}); ///al agregar mal el nombre del campo test library nos da los campos que podriamos usar y elegir el correcto
        //console.log(emailField);
        //agrega los datos al campo Correo obtenido como emailField
        fireEvent.change(emailField, {target: {name:'email', value:email}})  //email es el nombre y value es el valor o correo que se escribe en el campo

        //Seccionar el campo Password del formulario login: debido a que este campo es tipo password se agrega inputProps con el data-testid:'password'
        const passwordField = screen.getByTestId('password'); 
        //se agrega el password al campo de password
        fireEvent.change(passwordField, {target: {name:'password', value: password }});  

        //Una vez llenado el formulario de Login se procede a enviar el formLogin el cual se le agrego aria-label='submit-form' para tener acceso
        const loginForm = screen.getByLabelText('submit-form');
        fireEvent.submit(loginForm);

        //validar que el dispatch(startLoginWithEmailPassword({email, password})) halla sido llamado con el email y password
        expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({
            email: email, 
            password: password
        })
    });
    
    
});
