import { useState } from "react"

export const CounterApp = () => {

    //useState: counter es el valor, con setCounter se encarga de modificar counter y el useState(10) inicializa a counter en 10
    //const [counter, setCounter] = useState(10);
    //const incrementar = () => { setCounter(counter + 1) }


    //multicounter
     //const [counter, setCounter] = useState({ counter1: 10, counter2: 20, counter3: 30})
     //const [{counter1, counter2, counter3}, setCounter] = useState({ counter1: 10, counter2: 20, counter3: 30});
     
     const [state, setCounter] = useState({ counter1: 10, counter2: 20, counter3: 30})
     const {counter1, counter2, counter3} = state; //desestructura state y se guarda la data en counter1, counter2 y counter3
    
     console.log(counter1);
    return(
        <>
        
        <h1>Counter: {counter1} </h1>
        <h1>Counter: {counter2} </h1>
        <h1>Counter: {counter3} </h1>
        <hr />
        

        <button
        className="btn"
        //onClick={() => setCounter(counter + 1 ) }
        //onClick={incrementar} // onClick={(counter) => incrementar(counter)} //cuando el argumento que se recibe en el callback es el mismo parametro, que se va a enviar en la funcion se reduce agregando solo el nombre de la funcion.
          
        //onClic para multicounter
        //onClick={() => setCounter({counter1: counter1+1, counter2:counter2, counter3})} //conter3- Cuando una variable es igual a la otra se puede escribir una vez
        //onClick={() => setCounter(prevState => ({ ...prevState, counter1: prevState.counter1 + 1 })) }
        
        //multiconter utilizando state y desestructuracion
        onClick={() => setCounter({ ...state, counter1: counter1 + 1 })} //...state pasa los valores anteriores y a counter1: counter1+1 se le suma 1

        >

            +1
        </button>

        

        </>
        
    )
    
}