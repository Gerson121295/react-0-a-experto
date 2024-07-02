import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onSetActivateEvent, onUpdateEvent } from "../store";


export const useCalendarStore = () => {

        //useSelector accedemos al store y obtener los estados del calendar ->reducers de calendarSlice
        const {activeEvent, events} = useSelector(state => state.calendar);

        //Dispatch para acceder a los reducer de uiSlice mediante el store
        const dispatch = useDispatch();

        const setActiveEvent = (calendarEvent) => { //recibe el evento o nota del calendar
            dispatch(onSetActivateEvent(calendarEvent)); //se obtiene del store ->calendar
        }

        //start(Cuando inicia con start. Es porque inicia el proceso de grabacion guardar)
        const startSavingEvent = async(calendarEvent) => { //recibe el evento o nota del calendar
            //TODO: LLega al backend

            //todo buen
            //Si el evento o nota del calendar tiene id entonces se esta actualizando, si no estará creando un nuevo evento o nota al calendar 
            if(calendarEvent._id){
                //actualizando evento
                dispatch( onUpdateEvent({ ...calendarEvent }) ); //onUpdateEvent(calendarEvent)
            }else{
                //creando evento
                dispatch(
                    onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }) //envia (calendarEvent) para el backend o los datos del calendarEvent y un id(obtenido de la fecha actual) 
                ); 
            }

        }

        //Empezar la Eliminacion de evento o nota guardada en el calendario
        const startDeletingEvent = () => {

            //todo: llegar al backend

            //todo: sale bien
            dispatch( onDeleteEvent() );
        }

    //Propiedades y funciones que retorna el Hook
    return {
         //* propiedades
        activeEvent,
        events,
        //hasEventSelected: !!activeEvent, //activeEvent  //tiene evento seleccionado
        hasEventSelected: activeEvent?._id,  //tiene evento seleccionado y que ya halla sido creado "tenga id"

        //*Funciones
        setActiveEvent, 
        startSavingEvent,
        startDeletingEvent,
    }
}