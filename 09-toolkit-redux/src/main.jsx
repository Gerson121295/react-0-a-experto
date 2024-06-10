import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store'
import { TodoApp } from './TodoApp.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Provider provee the Redux Store para todos los components de React */}
    <Provider store={store}>
    {/* <App /> */}
    {/* <PokemonApp /> */}

    <TodoApp/>
    </Provider>
  </React.StrictMode>,
)
