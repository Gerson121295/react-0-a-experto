import { renderHook, waitFor } from "@testing-library/react";
import { useFetchGifs } from "../../src/hooks/useFetchGifs"

describe(' Pruebas al component useFetchGifs', () => {

    test('Debe de regresar el estado inicial', () => {
    //El estado inicial es: imagenes esten en arreglo vacio e isLoading este True.

    //LLamamos el useFetchGifs y le pasamos la categora 'One Punch'
    const {result} = renderHook(() => useFetchGifs('One Punch'));
        //console.log(result);

    const {images, isLoading} = result.current;

    //Aserciones: Cuando el hook esta en un estado inicial
    expect(images.length).toBe(0); //valida que el arreglo de imagenes sea 0,
    expect(isLoading).toBeTruthy(); //valida que isLoading sea true

    })

     
    test('Debe de retornar un arreglo de imagenes y isLoading en false', async() => {
       
        //LLamamos el useFetchGifs y le pasamos la categora 'One Punch'
        const {result} = renderHook(() => useFetchGifs('One Punch'));
        //console.log(result);
    
        //Para disparar, espera que la condicion del callback se cumpla(el arreglo de imagenes sea > 0). O tiene un tiempo de 1s por defecto para dispararse
        await waitFor( 
            () => expect(result.current.images.length).toBeGreaterThan(0),
        );

        //Luego desestructuramos para validar
        const {images, isLoading} = result.current;
    
        //Aserciones: Cuando el hook ya ha recibido valores
        expect(images.length).toBeGreaterThan(0); //valida que el arreglo de imagenes sea > 0,
        expect(isLoading).toBeFalsy(); //valida que isLoading sea false
    
        })
    
    
})