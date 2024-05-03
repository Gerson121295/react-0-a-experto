

import React from 'react'
import ReactDOM from 'react-dom/client';
import { CounterApp } from './CounterApp';
import './styles.css'


/* function App(){ //se puede definir funciones aqui.
return (<h1>hola Mundo</h1>);
} */

//Manejando el DOM en React: root definido en index.html
ReactDOM.createRoot(document.getElementById('root')).render(

    <React.StrictMode>
        {/* Renderiza la funcion App - aqui se llama a renderizar otro components */}
        {/* <App/> 
            <FirstComponent/> 
        */}

        {/* <FirstApp 
            //Del component padre main.jsx Envia prop title y subtitle al hijo FirstApp
            title={"React js"}
            subtitle={"La suma es:"}
            name={"Gerson Ep"}
            numero={123} //enviar tipo numero
        />  */}

    <CounterApp 
        value={100}
    />

    </React.StrictMode>
);


