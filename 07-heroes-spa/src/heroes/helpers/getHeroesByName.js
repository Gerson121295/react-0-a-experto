import { heroes } from "../data/heroes";

//Filtro del heroe por medio del Heroe
export const getHeroesByName = (name = '') => {

    //Limpiar la url: name se convierte a minuscula(toLocaleLowerCase()) y se quita los espacios(trim()) si tuviera
    name = name.toLocaleLowerCase().trim(); 

    if(name.length === 0) return []; //si tamaño de name es 0 el user no busco ningun heroe

    //filtra con filter que retorna un nuevo arreglo con el nombre del heroe(hero.superhero) si el name que se recibe como argumento son iguales, si no son iguales o no encuentra filter retorna un arreglo vacio.
    return heroes.filter(
        hero => hero.superhero.toLocaleLowerCase().includes(name)
    );
}