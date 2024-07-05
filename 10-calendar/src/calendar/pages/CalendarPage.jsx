import { useState } from 'react';

import { Calendar} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { Navbar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from "../"
import { localizer, getMessagesES } from '../../helpers'
import { useCalendarStore, useUiStore } from '../../hooks';


export const CalendarPage = () => {

  //se extrae propiedades y funciones desestructurando del hook useCalendarStore
  const {events, setActiveEvent } = useCalendarStore();

  //se extrae propiedades y funciones desestructurando  del hook useUiStore
  const {openDateModal} = useUiStore();

  //Maneja el estado, obtiene la ultima vista del calendar del storage: key: 'lastView' || si es nulo(la 1ra. vez no habra), se mostrará 'week' del calendar
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

    const eventStyleGetter = ( event, start, end, isSelected) => {
        
        //Estilo de la nota guarda en el calendario
        const style = {
            backgroundColor: '#347CF7',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white'
        }

        return {
            style
        }
    }

    //Doble clic al evento o nota guardada en el calendar y se abre el modal
    const onDoubleClick = (event) => {
      console.log({ doubleClick: event });
      openDateModal(); 
    }

    //Un clic al evento o nota guardada en el calendar cambia el estado de activeEvent
    const onSelect = (event) => {
      //console.log({ click: event });
      setActiveEvent(event);
    }

    //Cuando cambia la vista(clic en semana, dia, agenda)
     const onViewChanged = (event) => {
      
      //Guardamos la ultima vista del calendar en el LocalStorage
      localStorage.setItem('lastView', event); //"lastView" sera la key
      //setLastView(event); //no es necesario, el calendario lo cambia al tener el valor por defecto
    } 


    return (
      <>
        <Navbar /> 

        <Calendar
          culture='es' //agrega el idioma español al calendario
          localizer={localizer}
          events={events}
          defaultView={lastView} //{"agenda"}  define la vista que tendra por defecto(aparecera primero) al entrar al calendario, (será la ultima vista)
          startAccessor="start"
          endAccessor="end"
          style={{ height: 'calc(100vh - 80px)' }} //height: 500 -tamaño de la vista del calendar
          messages={getMessagesES()} //funcion tiene los Messages personalizado  
          
          //Eventos dentro del calendar
          eventPropGetter={eventStyleGetter}

          //Personalizar el cuadro de evento o nota a guardar en el calendar
          components={{
            event: CalendarEvent //data a mostrar en el calendar
          }}

          onDoubleClickEvent={onDoubleClick} //al dar doble clic a la nota o evento se abre
          onSelectEvent = {onSelect}
          onView = {onViewChanged}
        />

        
        <CalendarModal/> {/* Modal */}
        <FabAddNew /> {/* Boton agrega nueva nota o evento*/}
        <FabDelete /> {/* Boton eliminar una nota */}
      </>
    );
    }