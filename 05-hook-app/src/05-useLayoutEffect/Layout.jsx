import { LoadingMessage } from "../03-examples/LoadingMessage";
import { useCounter, useFetch } from "../hooks";
import { PokemonsCards } from "./PokemonsCards";

export const Layout = () => {
 //Llama hook useCounter y se le envia como argumento el 1, y se desestructura obteniendo los datos: counter, decrement, increment
 const{counter, decrement, increment} = useCounter(1);

 //Se llama el hook useFetch el cual se envia el argumento URL + el estado del {counter} y se desestructura para obtener: data, hasError, isLoading
 const { data, hasError, isLoading } = useFetch(`https://pokeapi.co/api/v2/pokemon/${counter}`);


  return (
    <>
      <h1>Informacion de Pokémon</h1>
      <hr />

      {/* { isLoading && <LoadingMessage/> } */}

    { 
    //si isLoading es true muestra el component LoadingMessage, si es false muestra PokemonCard al que se le envia las props
        isLoading ? <LoadingMessage/> 
        : (<PokemonsCards
            id={counter}
            name={data.name}
            sprites={[
              data.sprites.front_default,
              data.sprites.front_shiny,
              data.sprites.back_default,
              data.sprites.back_shiny
            ]}
        />)
    } 

        {/* <pre>{JSON.stringify(data, null, 2) }</pre>   */}
        <h2>{data?.name}</h2> 
    
        <button
            className="btn btn-primary mt-2 mr-2"
            onClick={() => counter > 1 ? decrement() : null} //si counter es >1 ejecuta decrement si es menor null(no haga nada)
            >
            Anterior
        </button>
        
        <button
            className="btn btn-primary mt-2"
            onClick={() => increment()} //llama a la funcion increment del hook(useCounter) para aumentar en 1 el contador y asi pasar al siguiente pokemon
        >
            Siguiente
        </button>
    </>
  )
}

