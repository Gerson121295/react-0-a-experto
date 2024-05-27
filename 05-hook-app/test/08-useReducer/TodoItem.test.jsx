import { fireEvent, render, screen } from "@testing-library/react";
import { TodoItem } from "../../src/08-useReducer/TodoItem";

describe('Pruebas al componente TodoItem', () => {

    //data de prueba - TODO
    const todo = {
        id: 1,
        description: 'Piedra del Alma',
        done: false
    };

    //funciones
    const onDeleteTodoMock = jest.fn();
    const onToggleTodoMock = jest.fn();

    //para resetar las funciones en cada prueba
    beforeEach(() => jest.clearAllMocks()); 


    test('debe de mostrar el TODO pendiente de completar ', () => {
       
        //Renderiza el component TodoItem
        render(
        <TodoItem 
            todo={todo} 
            onToggleTodo={onToggleTodoMock} 
            onDeleteTodo={onDeleteTodoMock} 
        />
    );

    const liElement = screen.getByRole('listitem');
    //console.log(liElement.innerHTML);

    //screen.debug(); //para hacer la depuracion ver codigo html
    //evalua si el elemento li tiene la clase: list-group-item d-flex justify-content-between
    expect(liElement.className).toBe('list-group-item d-flex justify-content-between');

    //accede al elemento span ya que se le agrego una key: aria-label='span'
    const spanElement = screen.getByLabelText('span')

    console.log(spanElement.className);
    expect(spanElement.className).toContain('align-self-center')//forma 1: evalua el contenido en la clase
    expect(spanElement.className).toBe('align-self-center ')//forma 2: agregar el espacio que tien en la clase
    expect(spanElement.className).not.toContain('text-decoration-line-through')//forma 3: no contiene la clase
    });

    
    test('debe de mostrar el TODO completado ', () => {

        todo.done = true; //todo pasa a estar completado
       
        //Renderiza el component TodoItem
        render(
        <TodoItem 
            todo={todo} 
            onToggleTodo={onToggleTodoMock} 
            onDeleteTodo={onDeleteTodoMock} 
        />
    );

    //accede al elemento span ya que se le agrego una key: aria-label='span'
    const spanElement = screen.getByLabelText('span')
    //console.log(spanElement.className);
    //evalua el contenido en la clase- porque cuando esta en true cambia de clase el span aparece tachado
    expect(spanElement.className).toContain('text-decoration-line-through')
  });

    test('spand debe de llamar el ToggleTodo cuando se hace Click', () => {
      
        //Renderiza el component TodoItem
      render(
        <TodoItem 
            todo={todo} 
            onToggleTodo={onToggleTodoMock} 
            onDeleteTodo={onDeleteTodoMock} 
        />
      );

    //accede al elemento span ya que se le agrego una key: aria-label='span'
    const spanElement = screen.getByLabelText('span')
    //simular dar clic en el spanElement
    fireEvent.click(spanElement); 

    //evalua que al dar clic en spanElement se llame la funcion onToggleTodoMock con el id del TODO
    expect(onToggleTodoMock).toHaveBeenCalledWith(todo.id);
    });

    test('spand debe de llamar el deleteTodo cuando se hace Click', () => {
      
        //Renderiza el component TodoItem
      render(
        <TodoItem 
            todo={todo} 
            onToggleTodo={onToggleTodoMock} 
            onDeleteTodo={onDeleteTodoMock} 
        />
      );

    //accede al elemento button ya que se le agrego una key: aria-label='borrar'
    //const deleteButton = screen.getByLabelText('borrar') 
    const deleteButton = screen.getByRole('button'); //forma 2 - ir a buscar el boton
    //simular dar clic en el boton 
    fireEvent.click(deleteButton); 

    //evalua que al dar clic en spanElement se llame la funcion onToggleTodoMock con el id del TODO
    expect(onDeleteTodoMock).toHaveBeenCalledWith(todo.id);
    });
    
})