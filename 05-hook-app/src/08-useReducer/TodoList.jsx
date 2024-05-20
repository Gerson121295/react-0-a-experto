import PropTypes from 'prop-types'
import { TodoItem } from './TodoItem'

export const TodoList = ({ todos = [], onDeleteTodo, onToggleTodo }) => {// recibe todos como props del padre TodoApp
    
    
    return(
        <ul className="list-group">
            {
                todos.map( todo => (//recorremos y mostramos los todo con mapa, map crea un nuevo arreglo
                    <TodoItem 
                        key={todo.id} 
                        todo={todo} 
                        onDeleteTodo={onDeleteTodo}
                        onToggleTodo={onToggleTodo}
                    />
                ))
            }           
        </ul> 
    )
}

TodoList.propTypes = {
    todos : PropTypes.array.isRequired,
    onDeleteTodo : PropTypes.func,
    onToggleTodo : PropTypes.func,
}