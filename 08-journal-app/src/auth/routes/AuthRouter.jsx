import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const AuthRouter = () => {
    //con useSelector vamos al store y obtenemos state.auth del auth obtenemos el status
    const {status} = useSelector(state => state.auth);

    //Valida si el status es authenticated retorna a: /
    if(status === 'authenticated'){
        return <Navigate to={"/"} />
    }

    return (
        <>  
            <Outlet/>
        </>
    )
}
