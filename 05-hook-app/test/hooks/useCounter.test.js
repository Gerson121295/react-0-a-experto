import { renderHook } from "@testing-library/react"
import { useCounter } from "../../src/hooks/useCounter"
import { act } from "react";

describe('Pruebas en el useCounter', () => {
    test('debe de retornar los valores por defecto', () => {
        
        //Renderizar el hook y desestructuramos para obtener result
        const {result} = renderHook( () => useCounter());
        //console.log(result) //para ver que retorna 

        //Desestructuramos result.current para extraer las funciones que retorna el hook useCounter
        const {counter, decrement, increment, reset } = result.current;

        expect(counter).toBe(10); //evalua que counter al inicio sea 10. (esta por default en 10)

        //Evalua que decrement, increment y reset sean funciones
        expect(decrement).toEqual(expect.any(Function));
        expect(increment).toEqual(expect.any(Function));
        expect(reset).toEqual(expect.any(Function));
    });

    test(' debe de generar el counter con el valor de 100', () => {

         //Renderizar el hook y desestructuramos para obtener result
         const {result} = renderHook( () => useCounter(100));

         //Desestructuramos result.current para extraer las funciones que retorna el hook useCounter
         const {counter} = result.current;

        expect(counter).toBe(100);
    });

    test('debe de incrementar el contador ', () => {
         //Renderizar el hook y desestructuramos para obtener result
         const {result} = renderHook( () => useCounter(100)); //recibe valor inicial de 100
 
         //Desestructuramos result.current para extraer las funciones que retorna el hook useCounter
         const {counter, increment} = result.current;

         act(() => { //para ejecutar un funcion se debe envolver con act
            increment();//llama a la funcion increment que counter por default esta en 10
            increment(2); //incrementa en 2
        })

        //es necesario obtener el valor actual de counter para evaluar el incremento por eso usar: result.current.counter
        expect(result.current.counter).toBe(103); //al llamar increment counter aumentaria  y su valor actual seria 103

    });

    test('debe de decrementar el contador ', () => {
        //Renderizar el hook y desestructuramos para obtener result
        const {result} = renderHook( () => useCounter(100)); //recibe valor inicial de 100

        //Desestructuramos result.current para extraer las funciones que retorna el hook useCounter
        const {counter, decrement} = result.current;

        act(() => { //para ejecutar un funcion se debe envolver con act
           decrement();//llama a la funcion decrement (para restar 1) counter por default esta en 100
           decrement(2); //decrementa en 2
       })

       //es necesario obtener el valor actual de counter para evaluar el decrement por eso usar: result.current.counter
       expect(result.current.counter).toBe(97); //al llamar increment counter decrementaria  y su valor actual seria 97

   });

   test('debe de resetear el contador ', () => {
    //Renderizar el hook y desestructuramos para obtener result
    const {result} = renderHook( () => useCounter(100)); //recibe valor inicial de 100

    //Desestructuramos result.current para extraer las funciones que retorna el hook useCounter
    const {counter, decrement, reset} = result.current;

    act(() => { //para ejecutar un funcion se debe envolver con act
       decrement();//llama a la funcion decrementar para restar 1 
       reset(); //llama a la funcion reset para resetear el valor
   })

   //es necesario obtener el valor actual de counter para evaluar el reset por eso usar: result.current.counter
   expect(result.current.counter).toBe(100); //evalua que el contador sea igual al valor inicial: 100

});
    
})