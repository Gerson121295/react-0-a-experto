import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: 'checking', //'checking' 'authenticated' 'not-authenticated'
    user: {},
    errorMessage: undefined,
}

    export const authSlice = createSlice({
        name: 'auth', //nombre del slice
        initialState,
        reducers: {

        //Definir las funciones
            //Verificando la autenticacion
           onChecking: ( state ) => {
                state.status = 'checking';
                state.user = {};
                state.errorMessage = undefined;
           },

           //Login
           onLogin: (state, { payload }) => { //de action se obtiene el { payload }
                state.status = 'authenticated';
                state.user = payload; //el estado del user sera lo que se reciba en el payload
                state.errorMessage = undefined;
            },

            onLogout: (state, { payload }) => {
                state.status = 'not-authenticated';
                state.user = {}; //borra al User
                state.errorMessage = payload;
            },

            clearErrorMessage: (state) => {
                state.errorMessage = undefined;
            }
        }
    });


// Action creators are generated for each case reducer function
// Exporta las funciones para que pueda ser utilizada por otros component
export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions;