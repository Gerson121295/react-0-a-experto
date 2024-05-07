import React from 'react'
import ReactDOM from 'react-dom/client'
import GifExpertApp from './GifExpertApp.jsx'
import './styles.css'; //importamos en el main para definir el archivo css global

ReactDOM.createRoot(document.getElementById('root')).render(
 
 
      <React.StrictMode> 
        <GifExpertApp />
      </React.StrictMode>, 

 //<GifExpertApp />
 
);
