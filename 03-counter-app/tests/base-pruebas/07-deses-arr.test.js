import { retornaArreglo } from "../../src/base-pruebas/07-deses-arr";

describe('Prueba en 07-deses-arr', ()=> {
    test('debe de retornar un STRING Y UN NUMERO',() => {

        //valor de retorno
        //const retorno = retornaArreglo();
        const [letters, numbers] = retornaArreglo(); //con desestructuracion se obtiene letters y numbers

        //validaciones
        expect(letters).toBe('ABC');
        expect(numbers).toBe(123);
        
        //Validando por el tipo de dato que se espera
        expect(typeof letters).toBe('string') //letters espera un string
        expect(typeof numbers).toBe('number')

        expect(letters).toEqual(expect.any(String));

    });
});