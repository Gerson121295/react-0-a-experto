import { useCallback, useState } from "react"
import { ShowIncrement } from "./ShowIncrement";


export const CallbackHook = () => {
  
  const [counter, setCounter] = useState(10);

  //El hook useCallback (parecido memo) sirve para memorizar funciones, y lo que regresa es una funcion que se puede ejecutar pero esa funcion memorizada solo se va a ejecutar cuando algo cambie
/*  const incrementFather = useCallback(() => {   //funcion memorizada, xq las funciones y objetos en JavaScript siempre apuntan a un espacio en memoria diferente por eso se usa callaback para memorizarla
    //setCounter(counter + 1 );
    setCounter((value) => value + 1 );
  }, [],
  );
*/
  //useCallback con argumentos - Funcion con parametro
  const incrementFather = useCallback((value) => {   //funcion memorizada, xq las funciones y objetos en JavaScript siempre apuntan a un espacio en memoria diferente por eso se usa callaback para memorizarla
    //setCounter(counter + 1 );
    setCounter((c) => c + value );
  }, [],
  );


  //hook useEffect se dispara cuando se cumpla la dependencia(cuando cambie incrementFather)
  /*useEffect(() => {
    incrementFather();
  }, [incrementFather])
*/

  //const incrementFather = () => setCounter(counter +1);
  

    return (
    <>
      <h1>useCallback Hook: {counter}</h1>
      <hr />

      <ShowIncrement increment={incrementFather}/>

    </>
  )
}

