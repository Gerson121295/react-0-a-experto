import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActivateEvent, onUpdateEvent } from "../store";
import calendarApi from "../../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers";
import Swal from "sweetalert2";


export const useCalendarStore = () => {

        //useSelector accedemos al store y obtener los estados del calendar ->reducers de calendarSlice
        const {activeEvent, events} = useSelector(state => state.calendar);

        const { user } = useSelector( state => state.auth );

        //Dispatch para acceder a los reducer de uiSlice mediante el store
        const dispatch = useDispatch();

        const setActiveEvent = (calendarEvent) => { //recibe el evento o nota del calendar
            dispatch(onSetActivateEvent(calendarEvent)); //se obtiene del store ->calendar
        }


        //start(Cuando inicia con start. Es porque inicia el proceso de grabacion guardar)
        const startSavingEvent = async(calendarEvent) => { //recibe el evento o nota del calendar
            
            try {
                //Si el evento del calendar tiene id entonces se va a actualizar, si no se va crear un nuevo evento al calendar 
                if( calendarEvent.id ){
                    //actualiznado evento, metodo put sen envia la ruta/id y data del evento a actualizar
                    await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent );

                    //actualizando evento, se envia datos del evento y el usuario activo
                    dispatch( onUpdateEvent({ ...calendarEvent, user }) ); //onUpdateEvent(calendarEvent)
                    return; //para que ya no siga ejecutando  y evitar definir el siguiente else
                }//else{
                
                    //creando evento - no tiene id la data que es enviada por lo tanto se creará evento y el backend creará el id y lo retornará
                    const { data } = await calendarApi.post('/events', calendarEvent);  //peticion POST recibe la ruta y la data del evento a guardar. de resp desestructuramos para obtener la data

                    dispatch(
                        //onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }) //Forma Local - envia (calendarEvent) para el backend o los datos del calendarEvent y un id(obtenido de la fecha actual)              
                        //Envia el evento (calendarEvent) para el backend. El id es generado y retornado por el backend: data.evento.id. Se envia el User, es obtenido del store ya que es el usuario autenticado que creo la nota.
                        onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }) 
                    ); 
                //}

            } catch (error) { //si da un error al actualizar o crear evento.
                    console.log(error);
                    Swal.fire('Error al guardar', error.response.data.msg, 'error');
            }
        }

        //Empezar la Eliminacion de evento o nota guardada en el calendario
        const startDeletingEvent = async() => {

            //Eliminar evento en el backend
            try {
                await calendarApi.delete(`/events/${ activeEvent.id }`);
                dispatch( onDeleteEvent() );

            } catch (error) {
                console.log(error);
                Swal.fire('Error al eliminar', error.response.data.msg, 'error');
            }
        }

        //Carga los eventos que estan en la BD atraves del backend
        const startLoadingEvents = async() => {

            try {

                //peticion get para mostrar los eventos guardados en la BD
                const { data } = await calendarApi.get('/events');
                //funcion convierte las fechas que vienen en tipo String a tipo Date recibe arreglo de eventos(definido en backend)
                const events = convertEventsToDateEvents(data.eventos);

                //despacha la funcion que carga los eventos
                dispatch(onLoadEvents(events)); 
                console.log({events})
                
            } catch (error) {
                console.log('Error cargando eventos');
                
            }
        }


    //Propiedades y funciones que retorna el Hook
    return {
         //* propiedades
        activeEvent,
        events,
        //hasEventSelected: !!activeEvent, //activeEvent  //tiene evento seleccionado
        hasEventSelected: activeEvent?.id,  //tiene evento seleccionado y que ya halla sido creado "tenga id"

        //*Funciones
        setActiveEvent, 
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents
    }
}