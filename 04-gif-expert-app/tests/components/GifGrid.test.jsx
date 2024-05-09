import { render, screen } from "@testing-library/react";
import { GifGrid } from "../../src/components/GifGrid";
import { useFetchGifs } from "../../src/hooks/useFetchGifs";

//Mock completo del hook useFetchGifs
jest.mock('../../src/hooks/useFetchGifs'); 


describe('Pruebas enn el component GifGrid', () => {
    
    const category = 'One Punch';

    test('Debe de mostrar el loading inicialmente', () =>{

        useFetchGifs.mockReturnValue({
            //objetos que simulo que retorna useFetchGifs al inicio
            images: [], //imagenes viene con array vacio
            isLoading: true  //su valor inicial es true
        })

        render (
            <GifGrid 
                category={category}
            />
        );

        screen.debug(); //Muestra ne pantalla los datos de pruebas ingresado en el component GifGrid

        //Aserciones: valida el estado inicial
        expect(screen.getByText('Cargando...')); //al inicio aparece cargando
        expect(screen.getByText(category)); //aparece category. One Punch
    });

    test('Debe de mostrar items cuando se cargan las imagenes useFetchGifs', () => {
        
        //Arreglo de gifss que retorna useFetchGif luego de haber buscado un gif
        const gifs = [
            {
            id: 'ABC',
            title: 'Saitama',
            url: 'https://localhost/saitma.jpg'
            },
            {
                id: '123',
                title: 'Goku',
                url: 'https://localhost/goku.jpg'
                }
        ]

        //Mock completo del hook useFetchGifs
        useFetchGifs.mockReturnValue({
            //objetos que simula que retorna useFetchGifs luego de hacer la busqueda de gif
            images: gifs, //imagenes viene con array vacio
            isLoading: false  //su valor inicial es true
        })

        //Renderiza el component GifGrid
        render (
            <GifGrid 
                category={category}
            />
        );

        //screen.debug();

        //Aserciones
        expect(screen.getAllByRole('img').length).toBe(2); //valida que se reciban 2 gifs

    })
});