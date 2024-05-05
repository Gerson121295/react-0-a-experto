import { getImagen } from "../../src/base-pruebas/11-async-await"

describe(' Pruebas en 11-async-await', () => {
/*    test('getImagen debe de retornar un URL de la imagen', async() =>{
        
        const url = await getImagen();
        console.log(url);
        expect(typeof url).toBe('string'); //validar que la url que se recibe sea un string
    });
*/
    test('getImagen debe de retornar error si no se encontro apikey (se borra la url en 11-async-await', async() =>{
        
        const resp = await getImagen();

        expect(resp).toBe('No se encontro la img'); //validar que la resp sea igual al return del catch de 11-async-await
    });
});