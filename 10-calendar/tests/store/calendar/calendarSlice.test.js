

import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActivateEvent, onUpdateEvent } from "../../../src/store/calendar/calendarSlice";
import { calendarWithActiveEventState, calendarWithEventsState, events, initialState } from "../../fixtures/calendarStates";


describe('Pruebas en calendarSlice', () => {

    test('debe de regresar el estado por defecto', () => {

        //state guarda los estados obtenidos de calendarSlice.getInitialState() 
        const state = calendarSlice.getInitialState();

        //valida si es igual los datos del estado con datos de simulacion initialstate(definido en fixtures/calendarStates.js)
        expect( state ).toEqual( initialState );

    });


    test('onSetActiveEvent debe de activar el evento', () => {

        //calendarSlice.reducer recibe el estado calendarWithEventsState(definido en fixtures/calendarStates.js) y la accion: onSetActiveEvent(definida en calendarSlice) recibe el evento a activar
        const state = calendarSlice.reducer( calendarWithEventsState, onSetActivateEvent( events[0] ) );  //state guarda el evento activado: [0]
        
        //valida si evento que fue enviado esta activo: state.activeEvent sea igual al events de posicion 0 definido en events(fixtures/calendarState) que fue el activado
        expect(state.activeEvent).toEqual( events[0] );
    });


    test('onAddNewEvent debe de agregar el evento', ()=> {

        //Data del nuevo event
        const newEvent = {
            id: '3',
            start: new Date('2020-10-21 13:00:00'),
            end: new Date('2020-10-21 15:00:00'),
            title: 'Cumpleaños de Fernando!!',
            notes: 'Alguna nota!!'
        };

        //reducer recibe el estado inicial: calendarWithEventsState(fixtures/calendarStates) y la accion a ejecutar: onAddNewEvent(store) que recibe el nuevo evento
        const state = calendarSlice.reducer( calendarWithEventsState, onAddNewEvent( newEvent ) );
        
        //valida si state tiene todos los events(incluyendo el newEvent)
        expect( state.events ).toEqual([ ...events, newEvent ]);

    });


    test('onUpdateEvent debe de actualizar el evento', ()=> {

        //Data del nuevo event a actualizar
        const updatedEvent = {
            id: '1',
            start: new Date('2020-10-21 13:00:00'),
            end: new Date('2020-10-21 15:00:00'),
            title: 'Cumpleaños de Fernando actualizado',
            notes: 'Alguna nota actualizada'
        };

         //reducer recibe el estado inicial: calendarWithEventsState(fixtures/calendarStates) y la accion a ejecutar: onAddUpdateEvent(calendarSlice por medio del store) que recibe el evento a actualizar
        const state = calendarSlice.reducer( calendarWithEventsState, onUpdateEvent( updatedEvent ) );
        
        //valida si state.events tiene el updatedEvent
        expect( state.events ).toContain( updatedEvent )

    });


    test('onDeleteEvent debe de borrar el evento activo', () => {
        // calendarWithActiveEventState y onDeleteEvent de calendarSlice
        const state = calendarSlice.reducer( calendarWithActiveEventState, onDeleteEvent() );
        expect( state.activeEvent ).toBe( null );
        expect( state.events ).not.toContain( events[0] ) 
    });


    test('onLoadEvents debe de establecer los eventos', () => {
        // initialState
        const state = calendarSlice.reducer( initialState, onLoadEvents( events ) );
        expect( state.isLoadingEvents ).toBeFalsy();
        expect( state.events ).toEqual(events)

        //prueba 2
        const newState = calendarSlice.reducer( state, onLoadEvents( events ) );
        expect( state.events.length ).toBe( events.length );
    });

    test('onLogoutCalendar debe de limpiar el estado', () => {
        // calendarWithActiveEventState
        const state = calendarSlice.reducer( calendarWithActiveEventState, onLogoutCalendar() );
        expect( state ).toEqual( initialState );
    });

    
});

