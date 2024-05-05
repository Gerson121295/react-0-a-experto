import { getUser, getUsuarioActivo } from "../../src/base-pruebas/05-funciones";


describe('Pruebas en 05-funciones', () => {
    test('getUser debe de retornar un objeto', () => {
        
        const testUser = { //objeto de prueba
            uid: 'ABC123',
            username: 'El_Papi1502'
        };

        //Llamamos la funcion a probar, esta funcion debe estar exportada
        const user = getUser();
        //console.log(user);

        //Para comparar objetos se compara usando toStrictEqual o el toEqual para compararlo en base a su ubicacion en memoria ya que no es como los primitivos que se compara por su valor usar toBe
        expect(testUser).toEqual(user); //valida si testUser es igual al user que guarda el resultado de la funcion getUser
    });

    test('getUsuarioActivo debe retornar un objeto', () => {
/*
        const nombre= 'Gerson';
        //objeto de prueba
        const testUser = {
            uid: 'ABC567',
            username: nombre
        }

        //Llamamos la funcion a probar y le enviamos el objeto, 
        const user = getUsuarioActivo(nombre);
        expect(testUser).toEqual(user);
*/
        //Forma 2 validarlo
        const name= 'Gerson';
        const user = getUsuarioActivo(name);
        expect(user).toStrictEqual({
            uid:'ABC567',
            username: name
        });

    });
});
