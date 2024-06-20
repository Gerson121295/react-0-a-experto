import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./"

export const checkingAuthentication = () => { //(email, password)
    return async(dispatch) => {
        dispatch(checkingCredentials()); //dispatch el checkingCredentials de authSlice cambia el status:'not-authenticated' a 'checking'
    }
}

export const startGoogleSignIn = () => {
    return async(dispatch) => {
        dispatch(checkingCredentials()); //dispatch el checkingCredentials de authSlice cambia el status:'not-authenticated' a 'checking'
        const result = await singInWithGoogle(); //console.log({result})

        //Si el user decide cancelar el login por google hace el logout de authSlice proviene del store
        if(!result.ok) return dispatch(logout(result.errorMessage));

        //Si el user decide continuar el login por google ejecuta el login de authSlice proviene del store
        dispatch(login(result));

    }
}

export const startCreatingUserWithEmailPassword = ({email, password, displayName}) => { //recibe un objeto User con campos: {email, password, displayName} se desestructura del objeto User
    return async(dispatch) => {
        dispatch(checkingCredentials()); //dispatch el checkingCredentials de authSlice cambia el status:'not-authenticated' a 'checking'
       
        //Forma 1: Llama a la funcion para registrar el user
        //const result = await registerUserWithEmailPassword({email, password, displayName});
        //console.log(result);
        //if ( !result.ok ) return dispatch( logout( result.errorMessage ) );
        //dispatch( login( result ))
        //Forma 2:
        //desestructura para obtener {ok, uid, photoURL} del resultado de la funcion
        const {ok, uid, photoURL, errorMessage} = await registerUserWithEmailPassword({email, password, displayName});
        if(!ok) return dispatch(logout({errorMessage})); //Si es diferente de ok o sea ok es falso, retorna dispatch el logout
        
        //si sale bien el User puede Logearse y sus datos son almacenados en Firebase
        dispatch(login({uid, displayName, email, photoURL}));
        
    }
}

    //Para LoginPage
    export const startLoginWithEmailPassword = ({email, password}) => { //recibe el email, password
        
        return async(dispatch) => {
            dispatch(checkingCredentials());

            const result = await loginWithEmailPassword({email, password});
            console.log(result);

            //si es diferente de result.ok(true), si es false result.ok entonces hace el logout y se le envia el mensaje de error
            if(!result.ok) return dispatch(logout(result));

            //Si result.ok es true hace el login se le envia el result
            dispatch(login(result));
        }
    }

    //Funcion para Cerrar Sesion del User
    export const startLogout = () => {
        return async(dispatch) => {
        
        //llama funcion logoutFirebase de /firebase/providers        
            await logoutFirebase();

            //Llama a la funcion de Logout definida en /store/auth/authSlice
            dispatch(logout({})); 
        }
    }


