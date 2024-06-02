import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext";

export const LoginPage = () => {

  //desestructuramos para obtenemos login con el useContext(extrae la data del AuthContext a utilizar en este componente)
  const {login} = useContext(AuthContext)

   //Custom Hook - Para la navegacion a una ruta
  const navigate = useNavigate();

  //Funcion para el login
  const onLogin = () => {

    //Al hacer el login valida si existe un path guardado en el localStorage, que seria el ultimo path que el user visito, si existe se redirige ahi al hacer el login
    //  || '/' si no existe una ultima ruta se redirige a la ruta raiz "/"   /marvel
    //lastPath es la palabra que se uso para guardarlo en el localStorage en el PrivateRoute
    const lastPath = localStorage.getItem('lastPath') || '/'; 

    //llama al login del AuthContext y se le envia el nombre del user
    login('Gerson Ep');

    //Navega a la ruta raiz
    navigate (
      lastPath, 
      {replace:true} //reemplaza el historial evita que la persona regrese al Login anterior, si ya lo paso
    );
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


