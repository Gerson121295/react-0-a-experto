import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice"
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixtures";



describe('Prueba en el authSlice', () => {

    test('debe de regresar el estado inicial y llamarse auth', () => {
      
        //console.log(authSlice); //muestra el objeto authSlice

        //Asegurar que el estado inicial de authSlice sea igual al estado inicial(definido en authFixtures.js)
        const state = authSlice.reducer(initialState, {}); //authSlice.reucer se envia el initialState(authFixtures), {} es la accion
        expect(state).toEqual(initialState);//valida si el state es igual al initialState de authFixtures

        //valida que name de authSlice sea 'auth'
        expect(authSlice.name).toBe('auth');
    });

    test('debe de realizar la autenticacion ', () => {
      
        //console.log(login(demoUser))
        //const state = authSlice.reducer(initialState, {}) //{} es la accion a ejecutar

        //el reducer crea un nuevo estado, recibe el estado inicial y la accion a ejecutar(login se le envia datos del user definidos en (authFixtures))
        const state = authSlice.reducer(initialState, login(demoUser));  //login es la accion que genera un nuevo estado para luego evaluarlo con los datos del User enviado
        //console.log(state); //state, guarda los estado del usuario autenticado

        //evalua si el estado del state es igual al estado del user enviado(demoUser)
        expect(state).toEqual({
            status: 'authenticated', //'checking', 'not-authenticated', 'authenticated' //el estatus por 1ra. vez es 'checking' valida si hay un ser logeado
            uid: demoUser.uid, 
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage:null,
        });
    });

    test('debe de realizar el logout sin argumentos', () => {

        //authenticatedState //logout sin argumentos
      //Al realizar la accion del logout los valores del usuario vuelven al estado inicial
          
      //el reducer crea un nuevo estado, recibe el estado inicial que tiene(authenticatedState) y la accion a ejecutar(login se le envia datos del user definidos en (authFixtures))
        const state = authSlice.reducer(authenticatedState, logout());  //logout es la accion que genera un nuevo estado para luego evaluarlo con los datos del User enviado
        //console.log(state); //state, guarda los estado del usuario logout
  
        //evalua si el estado del state es igual al estado inicial debido a que el user hizo logout
        expect(state).toEqual({
            status: 'not-authenticated', //'checking', 'not-authenticated', 'authenticated' //el estatus por 1ra. vez es 'checking' valida si hay un ser logeado
            uid: null, 
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage:undefined,
        });

    })

    test('debe de realizar el logout y mostrar un mensaje de error', () => {
        //Al realizar la accion del logout los valores del usuario vuelven al estado inicial
        //authenticatedState //logout con argumentos
        const errorMessage = 'Credenciales no son correctas';
  
        //el reducer crea un nuevo estado, recibe el estado inicial que tiene(authenticatedState) y la accion a ejecutar(login se le envia datos del user definidos en (authFixtures))
        const state = authSlice.reducer(authenticatedState, logout({errorMessage}));  //logout es la accion que genera un nuevo estado para luego evaluarlo con los datos del User enviado, recibe el argumento del error
        //console.log(state); //state, guarda los estado del usuario logout
  
        //evalua si el estado del state es igual al estado inicial debido a que el user hizo logout
        expect(state).toEqual({
            status: 'not-authenticated', //'checking', 'not-authenticated', 'authenticated' //el estatus por 1ra. vez es 'checking' valida si hay un ser logeado
            uid: null, 
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage:errorMessage,
        });

        expect(state.errorMessage).toEqual(errorMessage);

      });

      test('debe de cambiar el estado a checking cuando se va a hacer el login(autenticatedState)', () => {
        const state = authSlice.reducer(authenticatedState, checkingCredentials());
        console.log(state);

        //valida que es status del state sea igual a 'checking'
        expect(state.status).toBe('checking');
      })
      
    
    
});

