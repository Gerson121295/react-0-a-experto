import { useState } from "react"
import { UserContext } from "./UserContext"

/* const user = {
    id: 123,
    name: 'Fernando Her',
    email: 'fernando@gmail.com'
} */


export const UserProvider = ({children}) => { //recibe como props los children

    //useState: define state user, con setUser se modifica el estado o valor de user y con useState() se inicializa user
    const [user, setUser] = useState();

    return (
    // Provider para proveer toda la informacion del UserContext va a proporcionar al arbol de nuestros components. El provider se coloca en el punto mas alto(podria ser el main) para que los hijos lo puedan usar
    /*  <UserContext.Provider value={{hola: 'Mundo', user:user}} //data que expone a los hijos
      > */
      <UserContext.Provider value={{user, setUser}}  //se expone user y setUser para que los hijos puedan establecer valores al obj user
      > 
        {children} 
      </UserContext.Provider>
    )
  }
  