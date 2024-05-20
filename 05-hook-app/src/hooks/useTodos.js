import { useEffect, useReducer } from "react";
import { todoReducer } from "../08-useReducer/todoReducer";

//const initialState= [];

//Funcion inicializa nuestro arreglo (carga los todos) - con los datos almacenados en el local Storage, si no hay guardado en local storage muestra un arreglo vacio
const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || []; //convierte de string a JSON.   || []; si es nulo retorna un arreglo vacio
}

export const useTodos = () => {

        //Hook useReducer recibe la funcion todoReducer(contiene los casos a ejecutar) y el initalState. Se desestructura el useReducer para obtener los todos y dispatch(despacha las acciones se puede nombrar con otro nombre dispatchTodos)
        //const [todos, dispatch] = useReducer(todoReducer, initialState, init); //El initialState no es necesario definirlo puede ser: [],
        const [todos, dispatch] = useReducer(todoReducer, [], init); //El initialState no es necesario definirlo puede ser: [],

        //useEffect se dispara cuando cambie los todos(inserte, borre, actualice) 
        useEffect(() => {
            localStorage.setItem('todos', JSON.stringify(todos)); //Guarda los todos en el local storage(solo se puede guardar String por eso se usa JSON para convertirlo) y 'todos' es la clave para acceder a la data de todo guardada
        }, [todos])
    
    
        //Funcion para agregar un nuevo todo
        const handleNewTodo = (todo) => {
            const action = { //accion que se va a enviar al todoReducer por medio del dispatch
                type: '[TODO] Add Todo',
                payload: todo //se envia el nuevo dato del todo a agregar
            }
            
            dispatch(action); //con dispatch se envia la accion al useReducer
            //console.log({todo});
        }
    
        //Funcion para eliminar un todo
        const handleDeleteTodo = (id) => { //recibe el id a eliminar
            dispatch({
                type: '[TODO] Remove Todo', //define la accion a ejecutar en el todoReducer
                payload: id, //payload envia el id del todo a eliminar
            });
        }
    
        //Funcion cambiar el estado del todo a completado campo done: false a true
        const handleToggleTodo = (id) => { //recibe el id del todo a modificar completado
            console.log(id);
             dispatch({
                type: '[TODO] Toggle Todo', //define la accion a ejecutar en el todoReducer
                payload: id, //payload envia el id del todo a eliminar
            }); 
        }

    //El hook devuelve un objeto con las funcionalidades para que otros componentes puedan utilizarlas
  return {
    todos, 
    handleDeleteTodo, 
    handleToggleTodo, 
    handleNewTodo,
    todosCount: todos.length, 
    pendingTodosCount: todos.filter(todo => !todo.done).length,
  }
}

