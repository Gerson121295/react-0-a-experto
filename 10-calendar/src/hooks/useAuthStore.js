

//este es hook es otra metodologia diferente a usar Thunks

import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../../api/calendarApi";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice";


export const useAuthStore = () => {

    //useSelector extrae data del store estados del auth
    const{ status, user, errorMessage } = useSelector(state => state.auth);

    //despachara las funciones del store ->Slice
    const dispatch = useDispatch();

    //proceso del Login
    const startLogin = async({ email, password }) => {

        //Verificando autenticacion
        dispatch(onChecking());

        try {
            //const resp = await calendarApi.post('/auth', { email, password });
            const {data} = await calendarApi.post('/auth', { email, password }); //extrae data de resp
           
            //guarda en el local storage el token de User la palabra clave es: 'token'
            localStorage.setItem('token', data.token);
            //guarda en el local storage la hora en que inicio el token del User la palabra clave es: 'token-init-date'
            localStorage.setItem('token-init-date', new Date().getTime());
            
            //hace el login(cambia state a 'authenticated') despacha pormedio del store la funcion onLogin de authSlice 
            dispatch( onLogin({ name: data.name, uid: data.uid }) );


        }catch(err){
            //console.log({err})
            dispatch(onLogout('Credenciales incorrectas')); //si hay error en el login hace logout
            
            //Se ejecuta en 10miliseg Limpia el error si falla el login se hace el logout y procede a eliminar el mensaje de error
            setTimeout(() => {
                dispatch(clearErrorMessage()); //func. clearErrorMessage borra el mensaje de error
            }, 10)
        }
    }

    //Empezar Proceso de Registro
    const startRegister = async({ email, password, name }) => {

        //Verificando autenticacion
        dispatch(onChecking());

        try {
            //const resp = await calendarApi.post('/auth', { email, password });
            const {data} = await calendarApi.post('/auth/new', { email, password, name }); //extrae data de resp
           
            //guarda en el local storage el token de User la palabra clave es: 'token'
            localStorage.setItem('token', data.token);
            //guarda en el local storage la fecha en que inicio el token del User la palabra clave es: 'token-init-date'
            localStorage.setItem('token-init-date', new Date().getTime());
            
            //hace el login(cambia state a 'authenticated') despacha por medio del store la funcion onLogin de authSlice 
            dispatch( onLogin({ name: data.name, uid: data.uid }) );


        }catch(error){
            //si hay error en el login hace logout y muestra el mensaje de error que viene resp. del backend o un '' vacio
            dispatch( onLogout( error.response.data?.msg || '') ); 
            
            //Se ejecuta en 10miliseg Limpia el error si falla el login se hace el logout y procede a eliminar el mensaje de error
            setTimeout(() => {
                dispatch( clearErrorMessage() ); //func. clearErrorMessage borra el mensaje de error
            }, 10);

        }
    }


    //Verificar la autenticacion del token del User
    const checkAuthToken = async() => {

        //recupero el token del usuario guardado en el localStorage palabra clave 'token'
        const token = localStorage.getItem('token');

        //si es diferente de token(no existe token o ya vencio) hace logout
        if( !token ) return dispatch(onLogout() ); 

        try {

            //Si hay un token, hace peticion para renevoar el token y extrae data de resp que almacena el nuevo token
            const { data } = await calendarApi.get('auth/renew');
            //console.log({data})

            //Establece el nuevo token renovado al localStorage la palabra clave es: 'token'
            localStorage.setItem('token', data.token);
            //guarda en el local storage la fecha en que inicio el token del User la palabra clave es: 'token-init-date'
            localStorage.setItem('token-init-date', new Date().getTime());
            
            //hace el login(cambia state a 'authenticated') despacha por medio del store la funcion onLogin de authSlice 
            dispatch( onLogin({ name: data.name, uid: data.uid }) );localStorage.setItem('token', data.token)

        } catch (error) {
            //si sale mal la renovacion del token 
            //limpia el localStorage
            localStorage.clear();
            //No hace el login hace el logout
            dispatch( onLogout() ); 
        }

    }

    //Empieza proceso de logout - Borrar data(token) guardada en el localStorage
    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
    }


    //Funciones y propiedades que retorna el Hook
    return{
        //*Propiedades
        status, 
        user, 
        errorMessage,

        //*Metodos
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout 
    }
}