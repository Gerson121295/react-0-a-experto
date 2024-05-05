
import PropTypes from 'prop-types'
import { useState } from 'react'

export const CounterApp = ({value}) => { //recibe props value del padre main.js
    
    console.log('render'); //cuando cambia el estado el componente se vuelve a ejecutar por lo que se imprime en consola "render"

    //UseState- valor counter, con setCounter se cambia el estado o valor de counter , useState(0) define que counter inicia con valor 0
    const [counter, setCounter] = useState(value) //useState(0);  //useState(value) counter inicia el conteo con el valor value(100) que recibe del padre main.jsx

    //Definir funcion para aumentar en 1 al presionar el boton
    const aumentar=()=>{
        setCounter(counter +1)
    }

    //Funcion al dar clic en boton despliega todo las propiedades de event para manejarlo
    function handledAdd(){ //const handleAdd = (event) => {   //console.log(event)
        //console.log(event)
        //setCounter(counter +1)
        setCounter((c) => c+1) //forma 2 de aumentar: obtiene el callback c y le sigue aumentando 1
    }

    //Funcion para decrementar
    const handleSubtract = () => setCounter(counter - 1);

    //Funcion para reset
    const handleReset = () => setCounter(value) //(counter==value); 

    return(
        <>
            <h1>CounterApp</h1>
            {/* <h2>{value}</h2> */}
            <h2>{counter}</h2>
            <button 
                className='button'
                //onClick={() => setCounter(counter + 1)} //cada vez que precione el boton llama la funcion onClic y setCounter(modifica counter) al ejecutar "counter+1" se aumenta en 1
                //onClick={() => aumentar()} //forma 2 de aumentar: definir una funcion afuera y llamarla
                //onClick={aumentar} //forma 3 de aumentar:
                 onClick={handledAdd} //aumenta el valor
            >
                +1
            </button>
            <button
                className='button'
                onClick={handleSubtract}
            >
                -1
            </button>

            <button
                aria-label='btn-reset' //es el id para las pruebas, otra forma es: id='btn-reset' 
                className='button'
                onClick={handleReset}
            >
                Reset
            </button>
        </>
    )
}

CounterApp.propTypes = {
    value: PropTypes.number.isRequired,
}

