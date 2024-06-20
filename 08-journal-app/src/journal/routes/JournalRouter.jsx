import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const JournalRouter = () => {

    //con useSelector vamos al store y obtenemos state.auth del auth obtenemos el status
    const {status} = useSelector(state => state.auth);

    //Valida si el status es not-authenticated retorna a: /auth/login
    if(status === 'not-authenticated'){
        return <Navigate to={"/auth/login"} />
    }

    return (
        <>  
            <Outlet/>
        </>
    )
}