
import { loginWithEmailPassword, logoutFirebase, singInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth";
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword, startLogout} from "../../../src/store/auth/thunks"
import { clearNotesLogout } from "../../../src/store/journal/journalSlice";
import { demoUser } from "../../fixtures/authFixtures";

//Se hace un mock debido a que los thunks hacen llamadas a funciones de firebase
//Se modifico el archivo: jest.config.js, agregando: transformIgnorePatterns: [],
jest.mock('../../../src/firebase/providers'); //Este path hace un mock completo a los export que tenga la ruta, por lo tanto hace: mock de checkingCredentials y singInWithGoogle, startLoginWithEmailPassword

describe('Pruebas en AuthThunks', () => {

    const dispatch = jest.fn(); //funcion del dispatch
    beforeEach(() => jest.clearAllMocks()); //limpiar cada mocks, para que cada prueba lo utilice con datos iniciales

    test('debe de invocar el checkingCredentials', async() => {
    
        //debo asegurar que al llamar el thunk checkingCredentials() los respectivos dispatch hayan sido llamada con las acciones esperadas(no se necesita ir al store)
        //const valor = checkingCredentials();
        //console.log(valor); //  { type: 'auth/checkingCredentials', payload: undefined }
       
         //()primero es el llamado de la funcion, 2do. retorno de la funcion 
        //() la funcion no recibe un argumento, pero si en la 2da. dispatch
         await checkingAuthentication()(dispatch);//cuando mando el dispatch las acciones que estoy esperando que sean despachadas hallan sido llamadas
    
        //Forma 1: No recomendada
        expect(dispatch).toHaveBeenCalledWith({"payload": undefined, "type": "auth/checkingCredentials"});//no se envia nada al dispatch nos da error y no sugiere que debe ser llamado con los datos se copean esos datos y se envian
        
        //forma 2: mas elegante
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        
    });

    test('startGoogleSignIn debe de llamar checkingCredentials y login -Exito', async() => {
      //Asegurar que el dispatch se halla llamado con checkingCredential si sale bien dispatch login, si sale mal  dispatch logout
        //Para este test en el thunks startGoogleSignIn se habilito console.log({result})

      //datos iniciales Login, ok, se esparce los datos del user(demoUser definido en authFixtures)
      const loginData = {ok:true, ...demoUser};
      await singInWithGoogle.mockResolvedValue(loginData);

      //se llama el thunk a probar, 1ro: es la funcion sincrona, 2do: es el dispatch
      //() la funcion no recibe un argumento, pero si en la 2da. dispatch
      await startGoogleSignIn()(dispatch);

      //Evalua si el login fue exitoso se halla llamado con checkingCredential y el login(datos del User que hizo el login)
      expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
      expect(dispatch).toHaveBeenCalledWith(login(loginData));

    });


    test('startGoogleSignIn debe de llamar checkingCredentials y logout - Dio error el Login', async() => {
        //Asegurar que el dispatch se halla llamado con checkingCredential si sale bien dispatch login, si sale mal  dispatch logout
      
      //datos iniciales Login, ok, se esparce los datos del user(demoUser definido en authFixtures)
      const loginData = {ok:false, errorMessage: 'Un error en Google'};

      await singInWithGoogle.mockResolvedValue(loginData);

      //() la funcion no recibe un argumento, pero si en la 2da. dispatch
      //se llama el thunk a probar, 1ro: es la funcion sincrona, 2do: es el dispatch
      await startGoogleSignIn()(dispatch);

      //Evalua si el login no fue exitoso se halla llamado con checkingCredential y el logout 
      expect(dispatch).toHaveBeenCalledWith(checkingCredentials());

      //En el thunk startGoogleSignIn, logout recibe el resultado de la funcion de Google(seria el loginData.errorMessage)
      expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage)); 
      
    })

    test('startLoginWithEmailPassword debe de llamar checkingCredentials y login - Exito', async() => {

      //informacion de retorno del login
      const loginData = {ok: true, ...demoUser};

      //Informacion del formLogin(escrita por el User) que recibe startLoginWithEmailPassword
      const formData ={email: demoUser.email, password:'123456'};

      await loginWithEmailPassword.mockResolvedValue(loginData);
      //(formData) la funcion recibe un argumento, y en la 2da. dispatch
      await startLoginWithEmailPassword(formData) (dispatch); //se llama al thunks

      //Evalua si el thunk startLoginWithEmailPassword fue exitoso, se halla llamado a checkingCredential y el login
      expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
      expect(dispatch).toHaveBeenCalledWith(login(loginData));
      
    });

   
    test('startLogout debe de llamar logoutFirestore, clearNotes y logout', async() => {
      
      //() la funcion no recibe un argumento, pero si en la 2da. dispatch
      await startLogout()(dispatch);  //llama la funcion startLogout()es un callback y (dispatch)despatcha las funciones que estan dentro de startLogout

      expect( logoutFirebase ).toHaveBeenCalled(); //evalua que halla sido llamado logoutFirebase
      expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() ); //evalua que el dispatch halla sido llamdo el logout()
      expect( dispatch ).toHaveBeenCalledWith( logout({}) ); //evalua que el dispatch halla sido llamdo el logout({})

    });
    
    
   
    
})