import { useRef } from "react"


export const FocusScreen = () => {

    //Hook ref:Permite mantener una referencia y cuando esa referencia cambie no disparemos una rerenderizacion de nuestro componente
    //tambien mantiene una referencia a un elemento html
    const inputRef = useRef();

    //Al precionar el boton onClick busca el input y coloca el cursos ahi
    const onClick = () => {
        //document.querySelector('input').select(); //.focus(); //esto no es recomendable debido a que podemos tener mas input y al dar clic colocaria en el primer input
        //console.log(inputRef);
        inputRef.current.select();
    
    }

  return (
    <>
    <h1>Focus Screen</h1>

    <hr />

    <input 
        ref={inputRef} //el inputRef va a mandar el htmlElement
        type="text" 
        placeholder="Ingrese su nombre"
        className="form-control"
    />
      
      <button
        className="btn btn-primary mt-2"
        onClick={onClick}
      >
        Set Focus
      </button>
    </>
  )
}


