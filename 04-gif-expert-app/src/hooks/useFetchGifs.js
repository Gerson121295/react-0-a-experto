import { useEffect } from "react";
import { useState } from "react";
import {getGifs} from '../helpers/getGifs'

///Hook peronalizado - un hook no es mas que una funcion que regresa algo
export const useFetchGifs = (category) => { //recibe como argumento caregory

    //estado images, se actualiza con setImages y se inicializa con useState([]) con un arreglo vacio
  const [images, setImages] = useState([]); 

  const [isLoading, setIsLoading] = useState(true); //isLoading lo inicializamos en true porque las imagenes aun no han cargado
  
  //Funciones para obtener los Gifs 
  const getImages = async() => {
    const newImages = await getGifs(category); //el resultado de la funcion lo guarda en newImages, la funcion getGifs(category); hace la consulta a la API para traer los gifs
    setImages(newImages); //setImages cambia el estado de images con newImages que tiene la imagen
    setIsLoading(false); //Luego de cargar las imagenes establecemos isLoading con setIsLoading en false
}

    //useEffect sirve para disparar efectos secundarios cuando algo suceda. Ejemplo: Cuando la categoria Cambie se dispara un efecto. Cuando el componente se renderiza por primera vez se dispara un evento.
    //Cuando el componente se carga por primera vez ahi quiero disparar el evento por primera vez.
    useEffect(() => {
      //El efecto a disparar
      //getGifs(category); //LLama a la funcion que hace la consulta a la API para traer los gifs
      getImages(); //llama a la funcion getImages
    }, [])   // [] sig que el hook useEffect se va disparar la primera vez que se crea y se construye el componente (cuando buscamos un gif se crea el component)


  return {
    //Este hook regresa:
    images, //images: images, //mandamos las imagenes. Cuando una variable es igual al dato que recibe podemos escribirlo una vez
    isLoading  //isLoading: isLoading,
  }

}


