import { useEffect } from 'react';
import { useAuthStore, useForm } from '../../hooks';
import './LoginPage.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

//Formulario Login
const loginFormFields = {
    loginEmail: '',
    loginPassword: '',
}

//Formulario Register
const registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: '',
}

export const LoginPage = () => {

    const navigate = useNavigate(); //obtner la navegacio

    //hook useAuthStore se extrae propiedes y func
    const {startLogin, startRegister, errorMessage} = useAuthStore();

    //Se llama al customHook useForm el cual se envia loginFormFields como estado inicial y se extrae propiedades y func.
    const { loginEmail, loginPassword, onInputChange:onLoginInputChange} = useForm(loginFormFields); //el onInputChange se renombra a onLoginInputChange, debido a que el hook useForm se usara para registerForm tambien
    const { registerName, registerEmail, registerPassword, registerPassword2, onInputChange:onRegisterInputChange } = useForm(registerFormFields);

    const loginSubmit = (event) => {
        event.preventDefault(); //evita que al enviar el form se recargue la pagina

        if( registerPassword !==  registerPassword2 ){
            Swal.fire('Error en registro', 'Contraseña no son iguales', 'error');
            return;
        }

        //Validar que registerPassword y registerPassword2 sean iguales
        startLogin({ email: loginEmail, password: loginPassword }); //func Login

        navigate("/"); // Redirigir a la página principal después del login

    }

    const registerSubmit = (event) => {
        event.preventDefault(); //evita que al enviar el form se recargue la pagina
        //console.log({registerName, registerEmail, registerPassword, registerPassword2})
        startRegister({
                name: registerName, 
                email: registerEmail, 
                password: registerPassword,
            });
        
        navigate("/"); // Redirigir a la página principal después del register
    }

    useEffect(() => {
        if(errorMessage !== undefined ) {
            Swal.fire('Error en la autenticacion', errorMessage, 'error');
        }
    
    }, [errorMessage]) //se dispara el useEffect cuando cambie el errorMessage -falle el login
    


    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form 
                        onSubmit={loginSubmit}
                    >
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"

                                //Agregar data - customHook useForm
                                name='loginEmail'
                                value={ loginEmail }
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"

                                //Agregar data - customHook useForm
                                name='loginPassword'
                                value={ loginPassword }
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        <div className="d-grid gap-2"  //"form-group mb-2"
                        >
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={registerSubmit}
                    >
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"

                                //Agregar data - customHook useForm
                                name='registerName'
                                value={ registerName }
                                onChange={ onRegisterInputChange }

                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"

                                //Agregar data - customHook useForm
                                name='registerEmail'
                                value={ registerEmail }
                                onChange={ onRegisterInputChange }
                            
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 

                                //Agregar data - customHook useForm
                                name='registerPassword'
                                value={ registerPassword }
                                onChange={ onRegisterInputChange }
                                
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 

                                //Agregar data - customHook useForm
                                name='registerPassword2'
                                value={ registerPassword2 }
                                onChange={ onRegisterInputChange }
                            />
                        </div>

                        <div className="d-grid gap-2"   //="form-group mb-2"
                        >
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

