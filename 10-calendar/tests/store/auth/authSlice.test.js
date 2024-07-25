import { authSlice, clearErrorMessage, onLogin, onLogout } from '../../../src/store/auth/authSlice';
import { authenticatedState, initialState } from '../../fixtures/authStates';
import { testUserCredentials } from '../../fixtures/testUser'; //archivo define estados del user


describe('Pruebas en authSlice', () => {
    
    test('debe de regresar el estado inicial', () => {
        expect( authSlice.getInitialState() ).toEqual( initialState );
    });

    test('debe de realizar un login', () => {
        
        //state guarda lo que ejecuta authSlice.reducer recibe-> initialState(esta en fixtures/authStates) manda accion onLogin(definido en authSlice) se le envia testUserCredentials(esta en fixtures/testUser)
        const state = authSlice.reducer( initialState, onLogin( testUserCredentials ) );
        //console.log(state);

        //Valida si state es igual a la data esperada para login como el status, user, tipo de errorMessage.
        expect( state ).toEqual({
            status: 'authenticated',
            user: testUserCredentials,
            errorMessage: undefined
        })
    });

    test('debe de realizar el logout', () => {

        //state guarda lo que ejecuta authSlice.reducer recibe-> authenticatedState(esta en fixtures/authStates) se le manda accion onLogout(definida en authSlice)
        const state = authSlice.reducer( authenticatedState, onLogout() );

        //Valida si state es igual a la data esperada para logout como el status, user, tipo de errorMessage.
        expect( state ).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: undefined
        });
    });

    test('debe de realizar el logout', () => {

        const errorMessage = 'Credenciales no válidas'

        const state = authSlice.reducer( authenticatedState, onLogout(errorMessage) );

        //Valida si state es igual a la data esperada para logout como el status, user, tipo de errorMessage.
        expect( state ).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: errorMessage
        });
    });

    test('debe de limpiar el mensaje de error', () => {

        const errorMessage = 'Credenciales no válidas'

        //state guarda lo que ejecuta authSlice.reducer recibe-> authenticatedState(esta en fixtures/authStates) se le manda accion onLogout recibe el errorMessage
        const state = authSlice.reducer( authenticatedState, onLogout(errorMessage) );
        
        //newState guarda lo que ejecuta authSlice.reducer recibe-> state, se le manda accion clearErrorMessage(definida en authSlice)
        const newState = authSlice.reducer( state, clearErrorMessage() )

        //Valida que se halla borrado el mensaje del state y ahora errorMessage en newState aparezca undefined
        expect( newState.errorMessage ).toBe( undefined );
        
    });

});