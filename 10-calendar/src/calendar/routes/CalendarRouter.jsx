import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../../hooks";
import { useEffect } from "react";
import { CalendarPage } from "../pages/CalendarPage";

export const CalendarRouter = () => {
    
    //Se extrae propiedades y func del hook useAuthStore para validar el estado de autenticacion del User
    const { status, checkAuthToken }  = useAuthStore();

      useEffect(() => {
        checkAuthToken();
    }, []) 

    if (status === 'not-authenticated')  return <Navigate to={"/auth/login"} /> 

    return (
        <>  
            <Outlet />
            {/* <CalendarPage /> */}  {/* para pruebas se renderizo */}
        </>
    )

}