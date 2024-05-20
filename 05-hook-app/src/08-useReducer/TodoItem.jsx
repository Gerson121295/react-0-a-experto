import PropTypes from 'prop-types'

export const TodoItem = ({ todo, onDeleteTodo, onToggleTodo }) => { //recibe como prop todo del padre TodoList
  return (
    <li className="list-group-item d-flex justify-content-between">
        <span 
          className={`align-self-center ${(todo.done) ? 'text-decoration-line-through' : ''}`} //al clicar sobre el todo aparecerá tachada
          onClick={ () => onToggleTodo(todo.id) } //marcar el todo completado: el campo done será true
        >
            {todo.description}
        </span>
        <button 
          className="btn btn-danger"
          onClick={() => onDeleteTodo(todo.id)} //se llama a la funcion onDeleteTodo y se le envia el id del todo a eliminar
        >
            Borrar
        </button>
    </li>
  )
}

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    onDeleteTodo: PropTypes.func,
    onToggleTodo : PropTypes.func,
}