import { getHeroeById, getHeroesByOwner } from "../../src/base-pruebas/08-imp-exp";
import heroes from "../../src/data/heroes";

//Nota: Para las pruebas lo que se tiene que hacer es ejecutar la funcion y
//evaluar el valor de retorno si es el esperado.

describe('Pruebas en 08-imp-exp ', () => {
    test('Devuelve un heroe por su id', () => {

        //definimos la variable a enviar
        const id = 1; 

        //Definimmos el objeto  a validar con el resultado de la funcion
        const heroe = {
                id: 1,
                name: 'Batman',
                owner: 'DC'
            }
        
        //LLamamos la funcion y guardamos su dato para despues validarlo
        const hero = getHeroeById(id);
        console.log(hero)

        //validar el objeto retornado por la funcion sea igua a un objeto que cumpla con lo esperado
        //expect(hero).toEqual({id:1, name: 'Batman', owner: 'DC'})
        expect(hero).toEqual(heroe) //validando mandando el objeto

    })

    test(' getHeroeById debe retornar undefined si no existe el id', () => {
        //definimos la variable a enviar
        const id = 100; //si mando un id que no existe espero un undefined

        //LLamamos la funcion y guardamos su dato para despues validarlo
        const hero = getHeroeById(id);
        console.log(hero)

        //validar el objeto retornado por la funcion 
        expect(hero).toBeFalsy(); //evaluar que hero sea nulo
    })

    test('Obtener heroes por su dueño DC getHeroesByOwner ', () => {

         //definimos la variable a enviar en la funcion
        const owner = 'DC';

        //LLamamos la funcion y guardamos su dato para despues validar
        const heroe = getHeroesByOwner(owner);
        //console.log(heroe)

        //valida que sean 3 heroes que retornen de la funcion
        expect(heroe.length).toBe(3);

        //validar el objeto retornado por la funcion sea igual al objeto de prueba
        expect(heroe).toEqual([
            {
                id: 1,
                name: 'Batman',
                owner: 'DC'
            },
            {
                id: 3,
                name: 'Superman',
                owner: 'DC'
            },
            {
                id: 4,
                name: 'Flash',
                owner: 'DC'
            },
        ]);

        //Otra forma de validar los owner retornados por la funcion podemos validarlo con el archivo heroes.js 
        expect(heroe ).toEqual(heroes.filter((heroe) => heroe.owner === owner));
    
    })

        test('Obtener heroes por su dueño Marvel getHeroesByOwner ', () => {

            //definimos la variable a enviar en la funcion
           const owner = 'Marvel';
   
           //LLamamos la funcion y guardamos su dato para despues validar
           const heroe = getHeroesByOwner(owner);
   
           //valida que sean 2 heroes que retornen de la funcion
            expect(heroe.length).toBe(2)

           //validar el objeto retornado por la funcion sea igual al objeto de prueba
           expect(heroe).toEqual([
               {
                   id: 2,
                   name: 'Spiderman',
                   owner: 'Marvel'
               },
               {
                   id: 5,
                   name: 'Wolverine',
                   owner: 'Marvel'
               }
           ])
        })
})