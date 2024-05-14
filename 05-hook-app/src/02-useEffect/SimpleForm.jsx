import { useEffect, useState } from "react"
import { Message } from "../02-useEffect/Message";



export const SimpleForm = () => {

    //useState para manejar el estado: formState tiene el estado con setFormState modificamos formState y useState({objeto}) inicializamos formState
    const [formState, setFormState] = useState({
        username: 'strider',
        email: 'gers@gmail.com'
    });

    //Desestructuramos formState y obtenemos username y email en el que los guardamos en esas variables
    const {username, email} = formState;

    //Funcion que permite hacer el cambio de cualquier input
    const onInputChange = ({target}) => { //del event se desestructura para obtener el target //const onInputChange = (event) => {
        //console.log(event.target.value);
        const {name, value} = target; //del target se desestructura para obtener name y value
        //console.log({name, value});
        
        //Establecemos a formState los valores escritos en el imput
        setFormState({
            ...formState, //desestructurar el formState para mantener los valores anteriores del formulario
            [name]:value, //establecemos el nuevo valor para name obtenido del value del input del form
        })
    }

    //useEffect es usado para disparar efectos secundarios cuando cambie algun estado segun la condicion
    useEffect(() => { //useEffect dentro tiene una funcion callback la cual se va a ejecutar cada vez que el useEffect se dispare
        console.log('useEffect called'); //funcion a ejecutar cuando cambie el estado
    //}); //si useEffect no tiene una dependencia(no recomendable) se va a llamar cada vez que el SimpleForm se vuelva a redibujar o cuando cambie el form ya sea el campo username o email
    },[]); // }, []dependencia); (arreglo vacio []) el useEffect se dispara una unica vez cuando el component es montado(se renderiza se manda a llamar) la primera vez

    //useEffect para disparar efectos secundarios cuando cambie el formState
    useEffect(() => {
        console.log('formState changed'); //funcion a ejecutar cuando cambie el estado
    }, [formState]) //este useEffect se ejeucta cuando cambie el formState -cambie el form ya sea el campo username o email 

      //useEffect para disparar efectos secundarios cuando cambie el email
      useEffect(() => {
        console.log('email changed'); //funcion a ejecutar cuando cambie el estado
    }, [email]) //este useEffect se ejeucta cuando cambie el campo email 

  return (
    <>
      <h1>Formulario Simple</h1>
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

        {
           ( username === 'strider2') && <Message /> //si username es igual a strider2 muestra el mensaje si no, no lo muestra
        }
    </>
    )
}

