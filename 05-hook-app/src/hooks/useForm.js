import { useState } from "react";

//Hook para cualquier tipo de form
export const useForm = (initialForm = {}) => { //recibe el initialForm

    //useState para manejar el estado: formState tiene el estado con setFormState modificamos formState y useState({initialForm}) inicializamos formState
    const [formState, setFormState] = useState(initialForm);

    //Funcion que permite hacer el cambio de cualquier input
    const onInputChange = ({target}) => { //del event se desestructura para obtener el target //const onInputChange = (event) => {
        //console.log(event.target.value);
        const {name, value} = target; //del target se desestructura para obtener name y value del campo
        //console.log({name, value});
        
        //Establecemos a formState los valores escritos en el imput
        setFormState({
            ...formState, //desestructurar el formState para mantener los valores anteriores del formulario
            [name]:value, //establecemos el nuevo valor para name obtenido del value del input del form
        })
    }

    //Funcion para Reset o limpiar el form
    const onResetForm = () => {
        /*setFormState ({ //forma 2 cuando queremos modificar algun campo del form.
                ...initialForm, //desestructuramos los datos que tenia antes el form
                initialForm : {} //luego establecemos el objeto initalForm como vacio
        })*/
        setFormState(initialForm); //Forma 2: pasarle los valores iniciales initialForm que se recibe que son vacios al setFormState(que modifica el formState)
     }


    //Lo que retorna el Hook - para ser utilizada estas funcionalidades en otros componentes.
    return{
        ...formState, //retorna desestructurado el formState, retorna los campos del form 
        formState,
        onInputChange,
        onResetForm,
    }

}