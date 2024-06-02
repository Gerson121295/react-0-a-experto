
import { types } from "../types/types";

//const initialState = { logged: false}

  //Reducer es el que maneja los estados: recibe como parametro el estado y las acciones

export const authReducer = (state = {}, action) => { //se podria enviar: state = initialState

    switch (action.type) {  //recibe el tipo de la accion a ejecutar

        case types.login:   //types es el archivo que contiene las acciones, Si el tipo de accion es login
            return {
                ...state, //se desestructura el state, para mantener el estate anterior y solo modificar lo demas. como logged y name
                logged: true, 
                user: action.payload //muestra el nombre del usuario
            };
    
            case types.logout:   //types es el archivo que contiene las acciones, Si el tipo de accion es logout
            return {
                //...state, //se desestructura el state, para mantener el estate anterior
                logged: false, 
                //user: null, //el nombre es null o borrar esta linea de codigo para no mostrar el nombre
            };

        default:
            return state;
    
    }
}
