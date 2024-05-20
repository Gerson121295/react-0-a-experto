

//Hook todoReducer: recibe el initialState y la action a ejecutar
export const todoReducer = (initialState = [], action) => {
  
    switch (action.type) {
        case '[TODO] Add Todo': //action caso 'Add Todo'
            //return un nuevo state : retorna un nuevo arreglo, se esparcen los datos anteriores(...initialState) y se agrega el nuevo dato con action.payload
            return [ ...initialState, action.payload];

        case '[TODO] Remove Todo':
            return initialState.filter(todo => todo.id !== action.payload); //filter regresa un nuevo arreglo sin el dato del todo que contiene el id recibido a eliminar(por lo tanto lo elimina) en action.payload tiene el id a eliminar
            
        case '[TODO] Toggle Todo':
            //map regresa un nuevo arreglo con los datos anteriores y el nuevo dato del todo modificado
            return initialState.map(todo => { //map recorre todos los elementos del arreglo de todo
                if(todo.id === action.payload){ //si todo.id es igual al id del todo a modificar(action.payload) modifica sus dato del todo
                    return{
                        ...todo, //esparcimos los datos anteriores del todo
                        done: !todo.done //cambiamos el valor anterior que tenia el campo done del todo, si era false pasa a true o al revez.
                    }
                }
                return todo;    
            });
            
            //Si el caso no esta definido por default retorna
        default:
            return initialState;
    }

}
