
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile} from "firebase/auth";
import { FirebaseAuth } from "./config";

//Se define el proveedor de authenticacion GooGle puede ser otro como Facebook, Github, etc
const googleProvider = new GoogleAuthProvider();

//Funcion para authenticarme con Google: es llamada en el store/auth/thunk con startGoogleSignIn
export const singInWithGoogle = async() => {

    try{
        //result guarda lo recibido de la funcion signInWithPopup recibe FirebaseAuth(definido en firebase/config) y el proveedor de authenticacion
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
       //const credentials = GoogleAuthProvider.credentialFromResult(result);
        //console.log(credentials)

        //const user = result.user; //console.log(user) //tiene la data del user
        const {displayName, email, photoURL, uid} = result.user; //se desestructura y se obtiene la data de result.user
        
        return{
            ok: true,
            //User info
            displayName, email, photoURL, uid
        }

    }catch(error){
        // Handle Errors here.
        //const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        //const email = error.customData.email;
        // The AuthCredential type that was used.
        //const credential = GoogleAuthProvider.credentialFromError(error);
        
        return{
            ok: false,
            errorMessage,// errorCode,
        }
    }
}

//Creacion de un nuevo proveedor para login: Se crea un User con email y password
//FUncion registerUserWithEmailPassword se manda a llamar en store/auth/thunks
    export const registerUserWithEmailPassword = async({email, password, displayName}) => { //recibe un objeto User que tenga estos campos: {email, password, displayName} se desestructura del objeto User

        try {
            const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
            const {uid, photoURL} = resp.user;
            //console.log(resp);

            //Actualizar el displayName del User en Firebase
            await updateProfile(FirebaseAuth.currentUser, {displayName});
            
            return{
                ok: true,
                //User info
                uid, photoURL, email, displayName, 
            }
            
        } catch (error) {
            //console.log(error);
            return{
                ok: false,
                errorMessage: error.message
            }
        }
    }


    //Para LoginPage
    export const loginWithEmailPassword = async({email, password}) => {

        try {
            const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
            const {uid, photoURL, displayName} = resp.user; //email no se necesita porque ya se tiene

            return {
                ok:true,
                uid, photoURL, displayName
            }

        } catch (error) {
            return{
                ok: false,
                errorMessage: error.message
            }
        }
    }

    //Funcion para cerrar Sesion de GooGle y Correo
    export const logoutFirebase = async() => {
        //funcion cierra Google, Facebook, Twitter, etc.
        return await FirebaseAuth.signOut();
    }

