import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPokemons } from "./src/store/slices/pokemon/thunks";

export const PokemonApp = () => {

    const dispatch = useDispatch();

    //Con useSelector accedemos al store - pokemons que accede las funciones y atributos definidos en pokemonSlice
    const {isLoading, pokemons = [], page} = useSelector(state => state.pokemons );

    useEffect(() => {
        dispatch(getPokemons());
    }, [])

    return (
        <> 
            <h1>PokemonApp</h1>
            <hr />
            <span>Loading: { isLoading ? 'True' : 'false'} </span>
            <ul>
                {
                    //pokemons.map(pokemon => (<li key={pokemon.name}>{pokemon.name}</li>))
                    pokemons.map(({name})=> (<li key={name}>{name}</li>)) //desestructura pokemon y se obtiene el nombre
                }
            </ul> 
            <button
                disabled={isLoading} 
                onClick={() => dispatch(getPokemons(page))}
            >
                Next
            </button>
        </>
    )
    }