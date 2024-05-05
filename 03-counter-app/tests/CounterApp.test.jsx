import { fireEvent, render, screen } from "@testing-library/react";
import { CounterApp } from "../src/CounterApp"

describe(' Pruebas a CounterApp', () => {

    //Variables globales
    const initialValue = 10;

    test('Pruebas en el <CounterApp /> ', () => {

        const { container} = render(<CounterApp value={initialValue} /> );
        expect(container).toMatchSnapshot();

    });

    
    test('Debe de mostrar el valor inicial de 100 <CounterApp value={100}/>', () => {
        
        render(<CounterApp value = {100} /> );
        //expect(screen.getAllByText(100)).toBeTruthy();//valida que value sea 100 true pero puede haber mas value con valor de 100
       expect(screen.getByText(100)).toBeTruthy();//valida que vsolo halla un value y sea 100 true
        
       //expect(screen.getByRole('heading',{level:2}).innerHTML ).toContain('100'); //valida que exista un h2 y que tenga valor a 100
    });

    test('Debe de incrementar con el boton +1', () => {
        render(<CounterApp value={initialValue} /> ); //valor inicial que se envia es 10 como props
        
        //al dar clic en el boton '+1' aumente la cantidad del contador
        fireEvent.click(screen.getByText('+1')); //para saber que boton es: busca por texto '+1' y da clic
        expect(screen.getByText('11')).toBeTruthy(); //luego de dar clic en '+1' aparecera un texto con valor de 11
    });

    test('debe de decrementar con el boton -1', () => {
        render(<CounterApp value={initialValue} /> ); //valor inicial que se envia es 10 como props
        
        //al dar clic en el boton '-1' decrementa la cantidad del contador
        fireEvent.click(screen.getByText('-1')); //para saber que boton es: busca por texto '-1' y da 1 clic
        screen.debug(); //para ver el estado del dom
        expect(screen.getByText('9')).toBeTruthy(); //luego de dar clic en '-1' aparecera un texto con valor de 9
    });

    test('debe de funcionar el boton reset', () => {
       // render(<CounterApp value={initialValue} /> ); //valor inicial que se envia es 10 como props
       render(<CounterApp value={350} /> ); //valor inicial que se envia es 10 como props
        
         //al dar clic en el boton '+1' aumente la cantidad del contador
         fireEvent.click(screen.getByText('+1')); //busca por texto '+1' da un clic queda en 11
         fireEvent.click(screen.getByText('+1')); //busca por texto '+1' da un clic queda en 12
         fireEvent.click(screen.getByText('+1')); //busca por texto '+1' da un clic queda en 13
      
         
        //al dar clic en el Reset resetea la cantidad del contador al valor inicial 10
        //fireEvent.click(screen.getByText('Reset')); //para saber que boton es: busca por texto 'Reset' luego da clic y resetea el valor
        //screen.debug(); //para ver el estado del dom
        
        //Otra forma de buscar el boton y darle clic usando: aria-label='btn-reset' su key es btn-reset definido en etiqueta Button html de CounterApp.jsx
        fireEvent.click(screen.getByRole('button', {name:'btn-reset'})); 

        expect(screen.getByText(350)).toBeTruthy(); //luego de dar clic en Reset se valida si existe un valor con el valor inicial si existe entonces Ok.
        //expect(screen.getByText(initialValue)).toBeTruthy(); //luego de dar clic en Reset se valida si existe un valor con el valor inicial que es 10. si es true esta ok
    
    });



});


