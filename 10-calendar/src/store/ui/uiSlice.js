

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isDateModalOpen: false,

}

//Mantener la informacion del UI si el modal esta abierto, cerrado, navegador usado por el cliente


    export const uiSlice = createSlice({
        name: 'ui', //nombre del slice
        initialState,
        reducers: {

        //Definir las funciones

            //Abrir Modal
            onOpenDateModal: (state) => {
                state.isDateModalOpen = true; //Forma de hacerlo la actualizacion usando: react-redux mas @reduxjs/toolkit 
            
            /* //forma de hacer la actualizacion Si se trabaja solo con react-redux sin el @reduxjs/toolkit
                return {
                    ...state,
                    isDateModalOpen: true,
                } 
            */
            },

            //Cerrar Modal
            onCloseDateModal: (state) => {
                state.isDateModalOpen = false;
            }

        }
    });


// Action creators are generated for each case reducer function
// Exporta las funciones para que pueda ser utilizada por otros component
export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;


