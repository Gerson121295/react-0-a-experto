import {todoReducer} from '../../src/08-useReducer/todoReducer'

describe('Pruebas al hook todoReducer', () => {

    const initialState = [{
        id:1,
        description: 'Demo Todo',
        done: false,
    }];

    test('debe de regresar el estado inicial', () => {
    
        //newstate guarda obj retornado de todoReducer
        const newState = todoReducer(initialState, {});
        //console.log(newState)
        expect(newState).toBe(initialState); //valida si el obj retornado es igual al obj initialState
    });
    
    test('debe de agregar un todo', () => {

        //Datos para la prueba
        const action = {
                type:'[TODO] Add Todo',
                payload:{
                    id:2,
                    description: 'Nuevo Todo',
                    done: false,
                }
        };

        //Inserta el nuevo TODO enviandole action
        const newState = todoReducer(initialState, action);
        expect(newState.length).toBe(2); //valida que tenga 2 TODO, uno anterior + el nuevo ingresado
        //console.log(newState);
        expect(newState).toContain(action.payload); //valida que newState contenga dentro de action el payload

    });

    test("debe de eliminar un todo", () => {

      //Datos para la prueba - ingresa un TODO
      const action = {
        type: "[TODO] Add Todo",
        payload: {
          id: 2,
          description: "Nuevo Todo",
          done: false,
        },
      };

      //Datos para la prueba - Elimina un todo 
      const action1 = {
        type: "[TODO] Remove Todo",
        payload: 2, //id del TODO a eliminar
      };

      //Inserta el nuevo TODO enviandole action
      const newState = todoReducer(initialState, action);
      expect(newState.length).toBe(2); //valida que tenga 2 TODO, uno anterior + el nuevo ingresado
      //console.log(newState);


      //Elimina el TODO con id: 1
      const newState1 = todoReducer(initialState, action1);
      expect(newState1.length).toBe(1); //valida que tenga 1 TODO, el otro fue eliminado
      console.log(newState1);

    });

    test('debe de realizar el Toggle del todo - cambiar el TODO de false a true', () => {
       
        //Datos para la prueba - TODO hecho
       const action = {
        type: '[TODO] Toggle Todo',
        payload: 1,
      };

      //Cambia el estado del TODO de false a true
      const newState = todoReducer(initialState, action);
      expect(newState[0].done).toBe(true); //valida que tenga 2 TODO, uno anterior + el nuevo ingresado
      console.log(newState);
      
      //cambia TODO de true o false
      const newState2 = todoReducer(newState, action);
      expect(newState2[0].done).toBe(false); //valida que tenga 2 TODO, uno anterior + el nuevo ingresado
     console.log(newState2);

    })
    
    

});