import { getHeroeByIdAsync } from "../../src/base-pruebas/09-promesas";

describe('Pruebas 09-promesas ', () => {
    test('getHeroeByAsync debe retornar un heroe', (done) => { //done - funcion se manda cuando se termina de ejecutar

        const id = 1;
        getHeroeByIdAsync( id )
            .then( hero => { //como yo se que ese id existe por eso se llama al .then
            //expect(true).toBe(false);
            expect(hero).toEqual({
                id: 1,
                name: 'Batman',
                owner: 'DC'
            });

           done();
        });
    });

    test('getHeroeByAsync debe retornar un error si heroe no existe', (done) => { //done - funcion se manda cuando se termina de ejecutar

        const id = 100;
        getHeroeByIdAsync( id )
        
/*      //si existe el heroe con el id
        .then(hero => {
            expect(hero).toBeFalsy();
            done();
        })
*/
        //como yo se que ese id no existe por eso se llama al .catch
            .catch(error => {
                //console.log(error);
                //otra forma de validar - Es comparar el error obtenido del error que se envio en el archivo: 09-promesas.js
                expect(error).toBe(`No se pudo encontrar el héroe: ${id}`);
                done();

        });
    });

});