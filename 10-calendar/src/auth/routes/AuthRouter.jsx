import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../../hooks";
import { useEffect } from "react";
import { LoginPage } from "../pages/LoginPage";

export const AuthRouter = () => {

        //Se extrae propiedades y func del hook useAuthStore para validar el estado de autenticacion del User
        const { status, checkAuthToken }  = useAuthStore();
    
          useEffect(() => {
            checkAuthToken();
        }, [])  
    
        if (status === 'authenticated') return <Navigate to={"/"} /> 
        
    return (
        <>  
        <Outlet/>
       {/*  <LoginPage /> */}  {/* para pruebas se renderizo */}
        </>
    )
    }
    