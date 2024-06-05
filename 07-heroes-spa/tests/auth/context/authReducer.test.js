import { authReducer, types } from "../../../src/auth";

describe('Pruebas en authReducer', () => {

    test('Prueba debe devolver el estado por defecto', () => {

        //El estado inicial de logged es false
        const state = authReducer({logged: false}, {});
        expect(state).toEqual({logged:false}); //valida que estate sea false
    });

    test('debe de (login) llamar el login autenticar y establecer el user', () => {

        //Establecemos la action (login) a mandar al authReducer
        const action = {
            type:types.login,
            payload: {
                name: 'Juan',
                id: '123'
            }
        }

        //state guarda el resultado del authReducer al hacer el logon se le envia el estado inicial en false y la action
        const state = authReducer({logged:false}, action); 

        //Valida que state sea igual al estado que se espera luego de haber hecho el login
        expect(state).toEqual({
                logged: true, 
                user: action.payload //muestra el nombre del usuario
        })
    });

    test('debe de (logout) borrar el name del user y logged en false ', () => {

        //Establecemos el estado inicial
        const state = {
            logged: true,
            user:{id:'123', name:'Juan'}
        }

        //establecemos la accion para hacer el logout
        const action = {
            type: types.logout
        }

        //newState guarda el resultado de la llamada de authReducer el cual se envia el state y action(logout)
        const newState = authReducer(state, action);
        
        //Validacion que newState sea igual al estado esperado luego de haber hecho el logout
        expect(newState).toEqual({logged: false })
    });
})
