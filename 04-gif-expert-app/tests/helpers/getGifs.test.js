import { getGifs } from "../../src/helpers/getGifs"



describe('Pruebas en getGifs()', () => {

    test('Debe de retornar un arreglo de gifs', async() => {

        //guardamos en gifs el arreglo de gifs que devuelve la funcion getGifs que recibe ccmo parametro One Punch a buscar
        const gifs = await getGifs('One Punch'); //Mandamos una categoria
        console.log(gifs);

        //evalua que el arreglo de gifs devuelto sea mayor que 0
        expect(gifs.length).toBeGreaterThan(0);

        //evalua 1 elemento del arreglo devuelto cuente con los atributos y su tipo de dato esperados
        expect(gifs[0]).toEqual({
            id : expect.any(String),
            title : expect.any(String),
            url : expect.any(String),
        })
    })
})