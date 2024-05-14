
import { useForm } from "../hooks/useForm";

export const FormWithCustomHook = () => {

    //Llamamos el hook useForm y le pasamos el objeto con los datos del formulario y con desestructuracion obtenemos el formState y onInputChange
    //const { formState, onInputChange } = useForm(   //Cuando el hook useForm no retorna desestructurado el ...formState (datos del Form)
    const { formState, onResetForm, onInputChange, username, email, password } = useForm( //se puede desestructurar los campos del Form Cuando el hook useForm retorna desestructurado el ...formState (datos del Form)
        { //objeto con los campos que se le envian al hook useForm
            username: '',
            email: '',
            password: ''
        }
    );

    //desestructura formState para obtener los datos: username, email, password - Cuando el hook useForm no retorna desestructurado el ...formState
    //const { username, email, password } = formState;


/*
    //useEffect para disparar efectos secundarios cuando cambie el formState
    useEffect(() => {
        console.log('formState changed'); //funcion a ejecutar cuando cambie el estado
    }, [formState]) //este useEffect se ejeucta cuando cambie el formState -cambie el form ya sea el campo username o email 
*/
    
  return (
    <>
      <h1>Formulario con custom Hook</h1>
      <hr />

        <input 
            type="text" 
            className="form-control"
            placeholder="Username"
            name="username"
            value={username} //valor del input es lo que tiene username
            onChange={onInputChange}
        />

        <input 
            type="email" 
            className="form-control mt-2"
            placeholder="gema@gmail.com"
            name="email"
            value={email}
            onChange={onInputChange}
        />

        <input 
            type="password" 
            className="form-control mt-2"
            placeholder="Contraseña"
            name="password"
            value={password}
            onChange={onInputChange}
        />

        <button 
            className="btn btn-primary mt-2"
            onClick={onResetForm}
        >
            Borrar
        </button>

       
    </>
    )
}

