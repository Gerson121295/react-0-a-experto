import React from 'react'
import ReactDOM from 'react-dom/client';
import './styles.css'
import { CounterApp } from './CounterApp';

/* function App(){ //se puede definir funciones aqui.
return (<h1>hola Mundo</h1>);
} */

//Manejando el DOM en React: root definido en index.html
ReactDOM.createRoot(document.getElementById('root')).render(

    <React.StrictMode>
        {/* Renderiza la funcion App - aqui se llama a renderizar otro components */}
        

{/*     <FirstApp
        //Del component padre main.jsx Envia prop title y subtitle al hijo FirstApp
        title={"Hola soy Vegeta"}
        subTitle={"La suma es:"}
        name={"Gerson Ep"}
        numero={123} //enviar tipo numero
        />
 */}
       

    <CounterApp 
         value={0}
    />

    </React.StrictMode>
);


