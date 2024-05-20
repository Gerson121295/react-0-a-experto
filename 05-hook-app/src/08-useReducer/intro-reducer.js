

const initialState = [{
    id: 1,
    todo: 'Recolectar la piedra del Alma',
    done: false,
}];

//Un reducer no es mas que una funcion pura, Recibe 2 parametros, el state(valor inicial) y action(inicializado como obj vacio) que es el que dice como se va a cambiar el estado, Reducer retorna un estado
const todoReducer = (state = initialState, action = {}) => {

    //evalua si en todoReducer action.type es igual a '[TODO] add todo', retorna un nuevo state
    if(action.type  === '[TODO] add todo'){
        return [...state, action.payload]; //retorna un nuevo estado, o nuevo arreglo con la data del arreglo anterior(...state) y el nuevo dato que se encuentra en el action.payload
    }
    return state;
}

let todos = todoReducer(); //llama a reducer e imprime sus datos

//Ingresar un nuevo todo al reducer
const newTodo = {
    id: 2,
    todo: 'Recolectar la piedra del poder',
    done: false,
}

//accion para agregar un nuevo todo al Reducer
const addTodoAction = {
    type: '[TODO] add todo', //define la accion que agregar el todo
    payload: newTodo, //newTodo: newTodo, //lo que va en la accion - agrega el nuevo todo
}

todos = todoReducer(todos, addTodoAction); //enviamos todos(el estado), y la accion(addTodoAction)

console.log({state : todos});

