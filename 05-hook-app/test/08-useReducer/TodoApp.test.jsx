import { render, screen } from "@testing-library/react"
import { TodoApp } from "../../src/08-useReducer/TodoApp";
import { useTodos } from "../../src/hooks/useTodos";


  // mock del hook useTodos: para simular los datos que retorna el hook
  jest.mock('../../src/hooks/useTodos')

describe('Pruebas al component TodoApp', () => {

     //simula los datos que retorna el hook
     useTodos.mockReturnValue({
        todos: [
            { id: 1, description: 'Todo 1', done: false  },
            { id: 2, description: 'Todo 2', done: true  },
        ], 
        handleDeleteTodo: jest.fn(),
        handleToggleTodo: jest.fn(),
        handleNewTodo: jest.fn(),
        todosCount: 2,
        pendingTodosCount: 1
    });

    test('debe de mostrar el component correctamente', () => {
      
        //renderizamos el component TodoApp
        render( <TodoApp /> );
        //screen.debug(); // muestra el html del code
        
        //evalua que el componente renderize lo que es:
        expect(screen.getByText('Todo 1')).toBeTruthy();
        expect(screen.getByText('Todo 2')).toBeTruthy();
        expect(screen.getByRole('textbox')).toBeTruthy();
        console.log(screen.getByRole('textbox').name);
    });
    
});