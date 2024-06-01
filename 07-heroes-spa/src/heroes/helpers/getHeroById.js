import { heroes } from "../data/heroes"


export const getHeroById = (id) => { //recibe el parametro id del heroe
  
    //fin returna un nuevo arreglo con el dato del heroe filtrado por su id recibido como argumento.
    return heroes.find(hero => hero.id === id);
}


