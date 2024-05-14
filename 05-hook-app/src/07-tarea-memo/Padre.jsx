
import { Hijo } from './Hijo'
import { useCallback, useState } from 'react';

export const Padre = () => {

    const numeros = [2,4,6,8,10];
    const [valor, setValor] = useState(0);

/*     const incrementar = ( num ) => {
        setValor( valor + num )
    } */

     //El hook useCallback (parecido memo) sirve para memorizar funciones, y lo que regresa es una funcion que se puede ejecutar pero esa funcion memorizada solo se va a ejecutar cuando algo cambie
    const incrementar = useCallback((num) => { //useCallback con argumentos
        setValor((oldValue) => oldValue + num)
    }, [],
);

    return (
        <div>
            <h1>Padre</h1>
            <p> Total: { valor } </p>

            <hr />

            {
                numeros.map( n => (
                    <Hijo 
                        key={ n }
                        numero={ n }
                        incrementar={ incrementar }
                    />
                ))
            }
            {/* <Hijo /> */}
        </div>
    )
}
