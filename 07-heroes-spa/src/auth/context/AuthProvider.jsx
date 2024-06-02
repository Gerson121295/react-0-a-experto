
//Componente AuthProvider que provee la informacion a toda la aplicacion, gracias a que utiliza el AuthContext

import { useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./authReducer";
import { types } from "../types/types";


//const initialState = { logged: false}

//Funcion para recuperar el estado del user bajo la clave 'user' del localStorage en formato JSON. 
    const init = () => {
        const user = JSON.parse(localStorage.getItem('user'));

        return {
            logged: !!user, //si exite el user
            user, //user:user //muestra el user
        }
    }

export const AuthProvider = ({children}) => { //recibe los children los compenentes hijos
  
    //El hook useReducer permite manejar los estado de la aplicación de forma similar al uso useState
    //se llama al useReducer y se le envia el authReducer, y initialState(o enviar un objeto vacio: {}) y opcional el init(inicializar el estado) luego se desestructura para obtener el state(authState) y dispatch
    const [authState, dispatch] = useReducer(authReducer, {}, init);

    const login = (name = '') => {

        const user = {id:'ABC', name}; //se define el user

        const action = {
            type: types.login,
            payload: user
        }

        // Convierte el objeto user a una cadena JSON y lo guarda en el localStorage bajo la clave 'user'
        localStorage.setItem('user', JSON.stringify(user));

        dispatch(action); //llama a la funcion dispatch dispara la accion recibe la action
    }

    //Funcion logout, elimina el user del localStorage
    const logout = () => {
        localStorage.removeItem('user');

        //se define la accion
        const action = {
            type: types.logout,
            //payload: '',
        };

        dispatch(action);
    }

    return (
        <AuthContext.Provider value={{ //value contiene la data que sera expuesta a los demas componetes
            //atributos a enviar
            ...authState,  //authState,  //se desestructura para tener toda la data  y no el obj
            
            //Methods a enviar
            login, //login: login
            logout,
        }}> 
            {children}
        </AuthContext.Provider>
  );
}


