import { parseISO } from "date-fns";


//Convierte un string que viene de la BD a un tipo Date para mostrarlo en el calendar
export const convertEventsToDateEvents = ( events = []) => { //recibe arreglo events

    //recorre events con .map ya que devuelve un nuevo arreglo modificado con las fechas convertidas en tipo Date
    return events.map(event => { 
        
        //recorre los eventos por cada event convierte sus fechas de String a Date usa parseISO

        event.end = parseISO(event.end);
        event.start = parseISO(event.start);

        //retorna el nuevo arreglo con fecha modificadas de tipo String a Date
        return event;
    })
}