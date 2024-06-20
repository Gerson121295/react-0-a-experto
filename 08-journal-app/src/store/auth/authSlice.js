import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    //informacion que esta fluyendo en el store
    status: 'checking', //'checking', 'not-authenticated', 'authenticated' //el estatus por 1ra. vez es 'checking' valida si hay un ser logeado
    uid: null, //cuando se autentique el user
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage:null,
}

    export const authSlice = createSlice({
        name: 'auth', //nombre del slice
        initialState,
        reducers: {

        //Definir las funciones
            login: ( state, { payload } ) => {
                //El login cambia los datos por medio del state
                state.status = 'authenticated'; //'checking', 'authenticated'
                state.uid = payload.uid; //cuandopayload se autentique el user
                state.email = payload.email;
                state.displayName = payload.displayName;
                state.photoURL = payload.photoURL;
                state.errorMessage = null;
            },
            logout: (state, {payload}) => {
                //El logout reset todo los datos por medio del state
                state.status = 'not-authenticated'; //'checking', 'authenticated'
                state.uid = null; //cuando se autentique el user
                state.email = null;
                state.displayName = null;
                state.photoURL = null;
                state.errorMessage = payload?.errorMessage; // ? para ver si viene el payload en el campo errorMessage, si no viene no pasa nada
            },
            checkingCredentials: (state) => { //verificar si se encuentra verificado
                state.status = 'checking';
            }

        }
    });


// Action creators are generated for each case reducer function
// Exporta las funciones para que pueda ser utilizada por otros component
export const { login, logout, checkingCredentials } = authSlice.actions;