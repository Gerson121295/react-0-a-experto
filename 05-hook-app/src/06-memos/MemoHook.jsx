
import { useMemo, useState } from "react";
import { useCounter } from "../hooks"


//Funcion : material pesada - para simulacion
const heavyStuff = (iterationNumber = 100) => {
  for(let i = 0; i< iterationNumber; i++){
    console.log('Ahi vamos...');
  }
  return `${iterationNumber} iteraciones realizadas`;
}

export const MemoHook = () => {

    //Llama al hook useCounter se envian como argumento 10 y se desestructura para obtener counter, increment
    const {counter, increment } = useCounter(80);

    //useState- valor show con setShow se modifica show y con useState(true) se inicializa show
    const [show, setShow] = useState(true);

    //useMemo: memoriza un valor, va a memorizar lo que sea que retorne, y se va a mantener memorizado a menos que las dependencias del useMemo cambie
    //useMemo su primer argumento es una funcion que debe retornar algo(si no regresa nada el valor es undefine)
    //primer argumento(heavyStuff -regresa el valor memorizado de esa funcion), [] = se va reprocesar si las dependencias cambian, (arreglo vacio solo memoria la primera vez) [counter]memoriza cada vez que el valor del counter cambie
    const memorizeValue = useMemo(() => heavyStuff(counter), [counter]) 



  return (
    <>
      <h1>Counter:  <small>{counter}</small> </h1>
      <hr />

      <h4>{memorizeValue}</h4>

      <button
        className="btn btn-primary"
        onClick={ () => increment()}
      >
        +1
      </button>

      <button
        className="btn btn-outline-primary"
        onClick={ () => setShow(!show)} //setShow establecemos el valor de show que sea diferente a su valor actual, si esta true que sea false y asi
      >
        Show/hide {JSON.stringify(show)}
      </button>
    </>
  )
}


