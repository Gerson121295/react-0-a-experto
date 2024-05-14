import { useCounter } from "../hooks/useCounter";

export const CounterWithCustomHook = () => {

    //Se desustructura counter que almacena el valor del contador resultado de la llama al hook personalizado useCounter() 
    const {counter, increment, decrement, reset} = useCounter(); //se extrae la data que retorna el hook useCounter()

    //CustomHook para manejar los Counters
    return(
        <>
            <h1>Counter with Hook {counter}</h1>
            <hr />

            <button 
                className="btn btn-primary"
                //onClick={incrementa} //solo incrementa 1
                onClick={() => increment(2)}  //Incrementa de 2 en 2, Cuando el callaback () no recibe argumento y la funcion recibe parametro se debe definir la funcion: () => funcion(2)
            >
            +1
            </button>

            <button 
                className="btn btn-primary"
                onClick={reset}    
            >
            Reset
            </button>

            <button 
                className="btn btn-primary"
                //onClick={decrementa}   
                onClick={() => decrement()} 
            >
            -1
            </button>

        </>
    )
}