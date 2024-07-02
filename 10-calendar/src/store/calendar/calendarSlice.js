

import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';


const tempEvent = {
        _id: new Date().getTime(),
        title: 'Cumpleaños del Jefe',
        notes: 'Hay que comprar el pastel',
        start: new Date(), //fecha inicia el evento
        end: addHours(new Date(), 2), //al new Date se le suma 2 horas
        bgColor: '#fafafa',
        user: {
            _id: '123',
            name: 'Fernando'
    }
};

const initialState = {
    events: [
        tempEvent
    ],
    activeEvent: null,
};


    //Todos las propiedades y reducer son enviadas al store para que desde ahi los componentes que las necesiten puedan acceder
    export const calendarSlice = createSlice({
        name: 'calendar', //nombre del slice
        initialState,
        reducers: {

        //Definir las funciones
            //Establecer activo el evento, recibe el payload
            onSetActivateEvent: ( state, { payload }) => { //recibe el state y action(se desestructura y obtiene el payload)
                state.activeEvent = payload;
            },

            //Se agrega un nuevo evento o nota, 
            onAddNewEvent: (state, { payload }) => {
                state.events.push(payload); //push agrega la nota
                state.activeEvent = null; //limpia el active event
            },

            //Actualizar evento
            onUpdateEvent: (state, { payload }) => {
                state.events = state.events.map( event => { //map regresa un nuevo arreglo con las modificaciones realizadas
                    //Si el evento actual que se recorre de arreglo de events (event._id) es igual al id del evento que se recibe(payload._id) retorna el event para realizar la actualizacion
                    if(event._id === payload._id){ 
                        return payload;
                    }

                    return event;
                });
            },

            //Elimina un evento o nota del calendario
            onDeleteEvent: ( state ) => {

                //valida si existe activeEvent(nota activa) proceder a filtrar y eliminar
                if(state.activeEvent){
                    state.events = state.events.filter( event => //filter recorre cada evento y regresa un nuevo arreglo con todos los datos excepto por el evento con el id de la nota activa, ese evento o nota se elimina
                        event._id !== state.activeEvent._id //filter regresa un nuevo arreglo con todos los eventos cuyo id sea diferente a la nota activa. El id de la nota activa se eliminará
                    );
                    state.activeEvent = null; //para no tener una nota activa
                }         
            }

            

        }
    });


// Action creators are generated for each case reducer function
// Exporta las funciones para que pueda ser utilizada por otros component
export const {  onSetActivateEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions;


