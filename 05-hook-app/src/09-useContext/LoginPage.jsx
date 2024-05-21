import { useContext } from "react"
import { UserContext } from "./context/UserContext";

export const LoginPage = () => {

    //extrae la data {user} de userContext usando el hook useContext
    const {user, setUser} = useContext(UserContext);
    console.log(user);

    return (
      <>
        <h1>Login Page </h1>
        <hr />

        <pre>
            {JSON.stringify(user, null, 3)}
        </pre>

        <button 
            className="btn btn-primary"
            onClick={() => setUser({id:123, name:'Juan', email:'juan@gmail.com'})}
        >
            Establecer usuario
        </button>
      </>
    )
  }