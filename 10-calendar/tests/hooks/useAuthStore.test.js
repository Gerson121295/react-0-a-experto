
import { configureStore } from '@reduxjs/toolkit';
import { act, renderHook, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useAuthStore } from '../../src/hooks/useAuthStore';
import { authSlice } from '../../src/store/';
import { initialState, notAuthenticatedState } from '../fixtures/authStates';
import { testUserCredentials } from '../fixtures/testUser';
import calendarApi from '../../api/calendarApi';



const getMockStore = ( initialState ) => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer,
        },
        preloadedState: {
            auth: { ...initialState } //initialState de fixtures/authStates
        }
    });
}


describe('Pruebas en useAuthStore', () => {

    //antes de cada test se ejecuta un localStorage.clear() para limpiar datos anteriores.
    beforeEach(() => localStorage.clear() );


    test('debe de regresar los valores por defecto', () => {
        
        const mockStore = getMockStore({...initialState });

        //se llama a renderizacion del hook con el provedor del store
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore } >{ children }</Provider>
        });

        //console.log(result.current); //clg brinda los datos esperados

        expect(result.current).toEqual({
            errorMessage: undefined,
            status: 'checking',
            user: {},
            checkAuthToken: expect.any(Function),
            startLogin: expect.any(Function),
            startLogout: expect.any(Function),
            startRegister: expect.any(Function),
        });
    });


    test('startLogin debe de realizar el login correctamente', async() => {
        
        //localStorage.clear(); //no se necesita se definio un  BeforeEach al inicio
        const mockStore = getMockStore({ ...notAuthenticatedState }); //notAuthenticatedState definido en fixtures/authStates

        //se llama a renderizacion del hook con el provedor del store
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore } >{ children }</Provider>
        });

        await act(async() => {
            await result.current.startLogin( testUserCredentials )
        });

        const { errorMessage, status, user } = result.current;

        //console.log(user);

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'test', uid: '669693fc6ee51fd076f93b0f' }
        });

        expect( localStorage.getItem('token') ).toEqual( expect.any(String) );
        expect( localStorage.getItem('token-init-date') ).toEqual( expect.any(String) );

    });

    test('startLogin debe de fallar la autenticación', async() => {
        //localStorage.clear(); 
        const mockStore = getMockStore({ ...notAuthenticatedState });

        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore } >{ children }</Provider>
        });

        await act(async() => {
            //este usuario no existe
            await result.current.startLogin({ email: 'testalgo@google.com', password: '123456789' })
        });

        const { errorMessage, status, user } = result.current;

        expect(localStorage.getItem('token')).toBe(null);

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: 'Credenciales incorrectas',
            status: 'not-authenticated',
            user: {}
        });
        
        await waitFor( 
            () => expect( result.current.errorMessage ).toBe(undefined)
        );
        
    });


    test('startRegister debe de crear un usuario', async() => {
        
        //dato del user a crear
        const newUser = { email: 'testalgo3@google.com', password: '123456789', name: 'Test User 3' };

        const mockStore = getMockStore({ ...notAuthenticatedState });

        //se llama a renderizacion del hook con el provedor del store
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore } >{ children }</Provider>
        });

        //Evita crear el User de prueba en la BD xq no se necesita, solo se simula la creacion en la prueba
        const spy = jest.spyOn( calendarApi, 'post' ).mockReturnValue({
            data: {
                ok: true,
                uid: '1263781293',
                name: 'Test User',
                token: 'ALGUN-TOKEN'
            }
        });

        await act(async() => {
            await result.current.startRegister(newUser)
        });

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Test User', uid: '1263781293' }
        });

        //destruye el spy para evitar que afecte a la siguiente prueba
        spy.mockRestore();

    });

    test('startRegister debe de fallar la creación', async() => {
        
        const mockStore = getMockStore({ ...notAuthenticatedState });
        
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore } >{ children }</Provider>
        });

        await act(async() => {
            await result.current.startRegister(testUserCredentials)
        });

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: "Un usuario existe con ese correo.",
            status: 'not-authenticated',
            user: {}
        });


    });


    test('checkAuthToken debe de fallar si no hay token', async() => {
        const mockStore = getMockStore({ ...initialState });
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore } >{ children }</Provider>
        });

        await act(async() => {
            await result.current.checkAuthToken()
        });

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'not-authenticated',
            user: {}
        });


    });

    test('checkAuthToken debe de autenticar el usuario si hay un token', async() => {
        
        const { data } = await calendarApi.post('/auth', testUserCredentials );

        //token se guarda en el localStorage
        localStorage.setItem('token', data.token );

        const mockStore = getMockStore({ ...initialState });

        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore } >{ children }</Provider>
        });

        await act(async() => {
            await result.current.checkAuthToken()
        });

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'test', uid: '669693fc6ee51fd076f93b0f' }
        });


    });


});

