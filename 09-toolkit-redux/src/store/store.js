

import { configureStore } from '@reduxjs/toolkit';
import { counterSlice } from './slices/counter';
import { pokemonSlice } from './slices/pokemon';
import { todosApi } from './apis/todosApi';

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer, //counter apunta a counterSlice
    pokemons: pokemonSlice.reducer, //pokemons apunta a pokemonSlice
    
    //[] indica que es una propiedad computada
    [todosApi.reducerPath]: todosApi.reducer, //apunta a todosApi

  },
  //un middleware es una funcion que se ejecuta antes que otra
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  .concat(todosApi.middleware)
})
