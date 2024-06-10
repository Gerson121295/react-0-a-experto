
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    page: 0,
    pokemons: [],
    isLoading: false,
}

    export const pokemonSlice = createSlice({
        name: 'pokemon', //nombre del slice
        initialState,
        reducers: {

        //Definir las funciones
            startLoadingPokemons: (state) => {
                state.isLoading = true;
            },
            setPokemons: (state, action) => {
                state.isLoading = false; //ya tiene los pokemon que deje de cargar
                state.page = action.payload.page;
                state.pokemons = action.payload.pokemons;
            }
        }
    });


// Action creators are generated for each case reducer function
// Exporta las funciones para que pueda ser utilizada por otros component
export const { startLoadingPokemons, setPokemons } = pokemonSlice.actions;

