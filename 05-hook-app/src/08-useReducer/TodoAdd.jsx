import PropTypes from 'prop-types'
import { useForm } from "../hooks/useForm";


export const TodoAdd = ({onNewTodo}) => { //recibe como prop onNewTodo del padre TodoApp

     //Llamamos el hook useForm y le pasamos el objeto con los datos del formulario y con desestructuracion obtenemos el formState y onInputChange
   const { description, onResetForm, onInputChange} = useForm( 
        { //objeto con los campos que se le envian al hook useForm
            description: ''
        }
    );


    const onFormSubmit = (event) => {
        event.preventDefault();  // Para cuando se envie el form no se actualize la pagina y se pierda los datos que se han escrito en los campos del form
        if(description.length <= 1) return; //valida si description es <=1 hace return no continua ejecutando el next code 

        const newTodo = {
            id: new Date().getTime(),
            done: false,
            description //description: description,
        }

        onNewTodo(newTodo); //onNewTodo && onNewTodo
        onResetForm();
    }

  return (
      <form onSubmit={onFormSubmit}>
        <input 
            type="text" 
            placeholder="¿Que hay que hacer?"
            className="form-control"
            //Se agregan datos para el hook useForm
            name="description"
            value={description}
            onChange={onInputChange}
        />
        <button
            type="submit"
            className="btn btn-outline-primary mt-1"
        >
            Agregar
        </button>                       
        </form>
  )
}

TodoAdd.propTypes = {
    onNewTodo : PropTypes.func
}
