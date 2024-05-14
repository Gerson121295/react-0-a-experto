
import { useState } from "react";
import { useCounter } from "../hooks"
import { Small } from "./Small";

export const Memorize = () => {

    //Llama al hook useCounter se envian como argumento 10 y se desestructura para obtener counter, increment
    const {counter, increment } = useCounter(10);

    //useState- valor show con setShow se modifica show y con useState(true) se inicializa show
    const [show, setShow] = useState(true);

  return (
    <>
      <h1>Counter:  <Small value={counter} /> </h1>
      <hr />

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


