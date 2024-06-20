import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth'

//store fuente unica de la verdad para todos los components
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer, //Espacio en el store llamado auth: apunta al authSlice.reducer,

  },
})