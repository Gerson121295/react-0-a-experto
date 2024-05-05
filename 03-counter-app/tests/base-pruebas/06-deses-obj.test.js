import { userContext } from "../../src/base-pruebas/06-deses-obj";


describe('Prueba 06-deses-objs.js', () => {
    /*
    test(' userContext  debe retornar un objeto', () => {

         const clave = 'Jas';
        const rango = 'sargento';
        const edad = 1; 

        //objeto de prueba
        const testUser = {
            nombreClave: clave,
            rango: rango,
            anios: edad,
            latlng: {
                lat: 14.1232,
                lng: -12.3232
        }
    };

    //Llamamos la funcion a probar y le enviamos
    const user = userContext( clave, edad, rango);

    expect(testUser).toStrictEqual(user);

    });
*/
    test(' userContext debe retornar un objeto- forma prof', () => {

        //Define objeto que contiene la data a enviar para pruebas
      const objEnviar = {
             clave : 'Jas',
            rango : 'sargento',
            edad : 1
        } 

        //Definir las variables a enviar
 /*     const clave = 'Jas';
        const edad = 1;
        const rango = 'sargento';
*/
        

        //Llamar la funcion se le pasa el obj y guardar su obj retornado
       // const user = userContext( clave, edad, rango); //se envia las variable
       const user = userContext( objEnviar); //mandandole un objeto y en la funcion lo desestructura para obtener la data.

       
        //Valida si los datos retornados son igual al obj enviado
        expect(user).toEqual({
           /*  nombreClave : 'Jas',
            anios : 1,
            rango : 'sargento', */
            nombreClave : objEnviar.clave,
            anios : objEnviar.edad,
            rango : objEnviar.rango,
            latlng: {
                lat: 14.1232,
                lng: -12.3232
            }
        });

    });
});



