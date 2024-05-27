
//Hook es una funcion

import { useState } from "react"


export const useCounter = (initialValue = 10) => { //recibe como argumento initialValue, si no lo recibe se inicializa en 10

    //useState: counter es el valor, con setCounter se encarga de modificar counter y el useState(initialValue) inicializa a counter en 10
    const [counter, setCounter] = useState(initialValue)

    //Funcion de incrementar
    const incrementa = () => setCounter(counter + 1 );
 
    const decrementa = () => {
        if(counter  === 0 ) return; //Valida si counter es igual a 0, no permite decrementar mas(return)
        setCounter(counter - 1 )
    }

    const reset = () => setCounter(initialValue); //con setCounter se establece el nuevo valor de counter que seria initialValue

    //Aumenta segun la cantidad: puede ser de: 2 en 2 o 3 en 3, segun el valor que reciba si no recibe por defecto sera + 1
    const increment= (value = 1) => setCounter(counter + value ); //value recibe la cantidad del valor a incremetar
 
     //Decrementa segun la cantidad: puede ser de: 2 en 2 o 3 en 3, segun el valor que reciba si no recibe por defecto sera - 1
    const decrement = (value = 1) => { //value recibe la cantidad del valor a decremetar
        if(counter  === 0 ) return; //Valida si counter es igual a 0, no permite decrementar mas(return)
        setCounter(counter - value )
    }
    
/*    //Funciones para las pruebas - se agrego currect para acceder a su valor actual
    const increment= (value = 1) => setCounter((current) => current + value ); //increment para pruebas(se add current)
    
    const decrement = (value = 1) => { //value recibe la cantidad del valor a decremetar
        if(counter  === 0 ) return; //Valida si counter es igual a 0, no permite decrementar mas(return)
        setCounter((current) => current - value )
    }
*/

    //El hook retorna variables y funciones para que pueda ser utilizado en los componentes que importen este hook
    return {
        counter, //counter:counter, //retorna counter, En JavaScript, cuando se quiere asignar el valor de una variable a otra variable, solo se necesita escribir el nombre de la variable una vez
        increment,
        decrement,
        reset,
        incrementa, 
        decrementa
    }
}