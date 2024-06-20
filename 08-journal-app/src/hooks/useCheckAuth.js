import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/auth";
import { FirebaseAuth } from "../firebase/config";

//Este hook es especial porque no va a regresar nada, solo dispara lo que tiene que disparar, No es necesario pero retornaremos el status(indicará si el User esta Autenticado o no)
export const useCheckAuth = () => {
 
    //con useSelector vamos al store y obtenemos state.auth del auth obtenemos el status
    const {status} = useSelector(state => state.auth);

    const dispatch = useDispatch();//para dispatch las funciones definidas en store/auth/thunks

    //useEffect valida si la User está: 'not-authenticated' o 'authenticated'
    useEffect(() => {
      //funcion de Firebase cuando el estado de autenticacion cambia. retorna un observable
      onAuthStateChanged(FirebaseAuth, async(user) => {
        if(!user) return dispatch(logout()); //si no hay un User hace el logout

        //si hay un User hace se despacha el Login se le envia la data del User
        const {uid, email, displayName, photoURL} = user; //se extrae la data desestructurando el objeto User
        dispatch(login({uid, email, displayName, photoURL}));
      })
    
    }, [])//no hay dependencia se ejecuta después de cada renderizado del componente
    

    //Retono del Hook
    return {
        status //indicará si el User esta 'not-authenticated' o 'authenticated'
    }
}

