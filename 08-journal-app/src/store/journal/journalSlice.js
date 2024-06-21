
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isSaving: false, //bandera valida si se guarda la nota
    messageSaved: '',
    notes: [],
    active: null,
   /*  active:{
        id: 'ABC123',
        title: '',
        body: '',
        date: 123456, 
        imageUrls: [], //arreglos de urls: https://foto1.jpg, https://foto2.jpg 
    } */

}

    export const journalSlice = createSlice({
        name: 'journal', //nombre del slice
        initialState,
        reducers: {

        //Definir las funciones
            //Bandera Guardando nueva nota, se desacrivará el boton + (crear nota)
            savingNewNote: (state) => {
                state.isSaving = true;
            },
            addNewEmptyNote: (state, action) => {
                state.notes.push(action.payload);
                state.isSaving = false;
            },
            //Establece la nota activa -> mostrará NoteView cuando se da clic a la nota muestra su descripcion
            setActiveNote: (state, action) => {
                state.active = action.payload; //payload tiene la nota para establecer, editar
                state.messageSaved='';
            },
            //establecer las notas del usuario
            setNotes: (state, action) => { 
                state.notes = action.payload;
            },
            //Establecer guardado
            setSaving: (state) => {
                state.isSaving = true;
                state.messageSaved='';
            },
            //Actualizar un Nota
            updateNote: (state, action) => {//payload: note
                state.isSaving= false;
                state.notes = state.notes.map(note => {
                    if(note.id == action.payload.id){ 
                        return action.payload;
                    }
                    return note;
                });

                //Mensaje de actualizacion, estar pendiente de este mensaje y cuando cambie muestra la notificacion
                state.messageSaved = `${action.payload.title}, actualizada correctamente.`;
            },
            //Establece las fotos a la nota activa
            setPhotosToActiveNote: (state, action) => {
                state.active.imageUrls = [...state.active.imageUrls, ...action.payload]; //[...hace el spread de las imgs anteriores, y ...spread de las nuevas imgs que vienen en el payload]
                state.isSaving= false; //cambia el estado de isSaving en false ya se termino la carga de imgs
            },
            //Despues de Logout reestablecer todo 
            clearNotesLogout: (state) => {
                state.isSaving = false;
                state.messageSaved = '';
                state.notes = [];
                state.active = null;
            },
            //Eliminar nota por su Id
            deleteNoteById: (state, action) => {
                state.active = null; //la nota no estará
                //Filter recorre todas las notas y devuelve un nuevo arreglo de todas las notas excepto la nota con el id que viene en el payload
                state.notes = state.notes.filter(note => note.id !== action.payload);
            },
        }
    });


// Action creators are generated for each case reducer function
// Exporta las funciones para que pueda ser utilizada por otros component
export const { 
        setPhotosToActiveNote,
        savingNewNote,
        clearNotesLogout,
        addNewEmptyNote, 
        setActiveNote, 
        setNotes, 
        setSaving, 
        updateNote, 
        deleteNoteById 
    } = journalSlice.actions;