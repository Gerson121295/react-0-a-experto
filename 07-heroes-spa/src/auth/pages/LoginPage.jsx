import { useNavigate } from "react-router-dom"



export const LoginPage = () => {

   //Custom Hook - Para la navegacion a una ruta
  const navigate = useNavigate();

  const onLogin = () => {
    navigate ('/',
      {replace:true} //reemplaza el historial evita que la persona regrese al Login anterior, si ya lo paso
    )
  }

  return (
    <div className="container mt-5">
      <h1>Login</h1>
      <hr />
      <button 
        className="btn btn-primary"
        onClick={onLogin}
      >
        Login
      </button>
    </div>
  )
}


