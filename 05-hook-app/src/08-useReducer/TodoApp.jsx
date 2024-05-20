
import { TodoList } from "./TodoList";
import { TodoAdd } from "./TodoAdd";
import { useTodos } from "../hooks";


export const TodoApp = () => {

    //desestructura las funcionalidas del hook useTodos
    const {todos, todosCount, pendingTodosCount, handleDeleteTodo, handleToggleTodo, handleNewTodo} = useTodos();

    return(
        <>
            <h1>TodoApp: {todosCount} <small>pendientes: { pendingTodosCount} </small></h1>
            <hr />

            <div className="row">
                <div className="col-7">

                    <TodoList //se llama y se envia como props los todos al component hijo TodoList
                        todos={todos} 
                        onDeleteTodo={handleDeleteTodo} //por la prop onDeleteTodo se envia la funcion handleDeleteTodo para eliminar un todo
                        onToggleTodo={handleToggleTodo}
                    />
                    
                </div>

                <div className="col-5">
                    <h4>Agregar TODO</h4>
                    <hr />
                    
                    <TodoAdd 
                        onNewTodo={handleNewTodo}  //onNewTodo={ todo => handleNewTodo(todo)}
                    />
    
                </div>
            </div>

        </>
    )
}