import { useState } from "react";
import { useGetTodoQuery} from "./store/apis/todosApi"


export const TodoApp = () => {

    //Hook useState maneja el estado: todoId es la variable, con setTodoId se modifica todoId y useState(1) se inicializa el todoId
    const[todoId, setTodoId] = useState(1);

    //const algo = useGetTodosQuery();
    //console.log(algo)
    //useGetTodosQuery es un customHook que genero createApi en todosAPI(que se define en el store) de la funcion getTodos para obtener todos.
    //Se desestructura lo retorna el customHook useGetTodosQuery para obtener {data, isLoading}, isLoading(viene del store) 
    //const {isLoading, data: todos=[]} = useGetTodosQuery(); 
    //console.log(todos)

    //customHook para obtener TODO por ID
    const {data:todo, isLoading} = useGetTodoQuery(todoId);
    //console.log(todo)

    const nextTodo = () => {
        setTodoId(todoId + 1);
    }

    const prevTodo = () => {
        if(todoId === 1 ) return; //si todoId es igual a 1 no hace nada.
        setTodoId(todoId - 1); //si es diferente de 1 si lo reduce
    }

    return (
        <>  
        <h1>Todos - RTK Query</h1>
        <hr />
        <h4>isLoading: { isLoading ? 'True' : 'False' } </h4>

        <pre>{JSON.stringify(todo)}</pre>

        <button onClick={prevTodo}>
            Prev Todo
        </button>

        <button onClick={nextTodo}>
            Next Todo
        </button>

        {/* Otiene TODO por ID */}


        {/* Obtener los TODOS */}
{/*     <ul>
            {
                todos.map(todo => (
                    <li key={todo.id}>
                        <strong>{todo.completed ? 'DONE ' : 'Pending ' }</strong> 
                        {todo.title}
                    </li>
                ))
            }
        </ul>
 */}

        </>
    )
    }