import { pokemonApi } from "../../../api/pokemonApi";
import { setPokemons, startLoadingPokemons } from "./pokemonSlice"

export const getPokemons = (page = 0 ) => {
    return async(dispatch, getState) => { 

        dispatch(startLoadingPokemons());

        //Peticion Http con Fetch
  /*       const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${ page * 10 }`);
        const data = await resp.json();
        console.log(data); */

        //Peticion Http con axios
        //resp guarda lo que obtiene la funcion pokemonApi a la cual se le envia la ruta y page
        //const resp = await pokemonApi.get(`/pokemon?limit=10&offset=${ page * 10 }`);
        //console.log(resp); 
        //Forma 2: desestructura rest y obtiene la data
        const {data} = await pokemonApi.get(`/pokemon?limit=10&offset=${ page * 10 }`);
        console.log(data);  //console.log(data.results); 

        dispatch(setPokemons({pokemons: data.results, page: page + 1}));

    }
}