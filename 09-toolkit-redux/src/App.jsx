
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement, incrementBy } from './store/slices/counter'

function App() {
  
  //Leer algo del store usamos useSelector para obtener el state de counter
  const {counter} = useSelector(state => state.counter)
  const dispatch = useDispatch() //dispatch ya sabe a que reducer va a llegar debido a que la funcion fue creada en ese slice

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <p>counter is: {counter} </p>
      <div className="card">
        <button onClick={() => dispatch(increment()) }>
          Increment
        </button> 
        <button onClick={() => dispatch(decrement()) }>
          Decrement
        </button> 
        <button onClick={() => dispatch(incrementBy(2)) }>
          Increment by 2
        </button> 
      </div>

    </>
  )
}

export default App
