
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//Ventaja de RTK Query que hacer peticiones con createApi que las peticiones se guardan en cache por 1 minuto, si el user quiere hacer la misma peticion la respuesta la obtine mas rapido ya que se encuentra en cache y no va al servidor.(al servidor solo va la primera vez)

export const todosApi = createApi({
    reducerPath: 'todos', //se define el nombre RTK Query

    baseQuery: fetchBaseQuery({
        baseUrl:'https://jsonplaceholder.typicode.com'
    }),

//url de todos: https://jsonplaceholder.typicode.com/todos

    //Funciones para traer la informacion: 
    endpoints: (builder) => ({
        
        //Funcion getTodos 
        getTodos: builder.query({
            query: () => '/todos' 
        }),

        //Function getTodo by Id
        getTodo: builder.query({
            query:(todoId) => `/todos/${todoId}`
        })

    })
})

//createApi crea CustomHooks que son exportados para que otros componentes lo utilicen
//Funcion getTodos es exportada como CustomHook useGetTodosQuery, solo agregar use y se autocompleta el customHook a exportar
export const {useGetTodosQuery, useGetTodoQuery } = todosApi;

