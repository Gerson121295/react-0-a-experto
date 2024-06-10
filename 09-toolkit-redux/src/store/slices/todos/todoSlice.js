
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    counter: 10,
}

    export const todoSlice = createSlice({
        name: 'todo', //nombre del slice
        initialState,
        reducers: {

        //Definir las funciones
            increment: (state) => {
                state.counter += 1;
            },
            //incrementa en 2 en 2 o segun el valor enviado de parametro (action.payload)
            incrementBy : (state, action) => {
            state.counter += action.payload;
            },

        }
    });


// Action creators are generated for each case reducer function
// Exporta las funciones para que pueda ser utilizada por otros component
export const { increment, incrementBy } = todoSlice.actions;