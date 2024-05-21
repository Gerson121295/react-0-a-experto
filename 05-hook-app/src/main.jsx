import ReactDOM from 'react-dom/client'
import './index.css'
import { MainApp } from './09-useContext/MainApp'
import { BrowserRouter } from 'react-router-dom'


//import './08-useReducer/intro-reducer.js';


ReactDOM.createRoot(document.getElementById('root')).render(
  /*
  <React.StrictMode>
      
  </React.StrictMode>, 
*/
  <BrowserRouter> 
    <MainApp />
  </BrowserRouter>

)
