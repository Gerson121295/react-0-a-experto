import { useContext } from "react"
import { UserContext } from "./context/UserContext"

export const HomePage = () => {

    //extrae la data {user} de userContext usando el hook useContext
    const {user} = useContext(UserContext);

    return (
      <>
        <h1>HomePages <small>{user?.name}</small></h1>
        <hr />

        <pre aria-label="pre"> 
            {JSON.stringify(user, null, 3)}
        </pre>

      </>
    )
  }