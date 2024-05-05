
//Forma 1: tradicional
/*
 test('Esta prueba no debe de fallar', ()=> {
    if(1 === 0){
        throw new Error('No puede dividir entre 0');
    } 
})
*/

//Las pruebas conta: 1. Inicializacion. 2. Estimulo. 3. Observar el comportamiento... esperado

//Forma 2: utilizando code Jest evitar escribir el if anterior

describe('Pruebas en <DemoComponent />', () => { //muestra el titulo de la prueba
    test('Esta prueba no debe de fallar', ()=> {
    
        //1. Inicializacion. 
        const message1 = 'Hola Mundo';

        //2. Estimulo. 
        const message2 = message1.trim(); //trim quita los espacios finales de message1

        //3. Observar el comportamiento... esperado
        expect(message1).toBe(message2); //forma jest para validar si message1 y message2 son iguales

    });
});

