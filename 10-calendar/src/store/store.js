import { configureStore } from "@reduxjs/toolkit"
import { calendarSlice, uiSlice } from "./"

//Store es la fuente de la verdad(informacion) los componentes podran acceder

export const store = configureStore({
    reducer: {
        ui: uiSlice.reducer, //ui apunta a los reducer de uiSlice
        calendar: calendarSlice.reducer //calendar accede a los estados y reducers de calendarSlice
    },

    //Para que no revice que las fechas se puedan serializar, no de el error de serializar las fechas
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
    
})