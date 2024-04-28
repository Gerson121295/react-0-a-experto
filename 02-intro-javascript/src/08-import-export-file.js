


// Import, export y funciones comunes en arreglos

//Forma 1: definir al arreglo:export const heroes = [  la clase heroes.js 
//import  {heroes} from "./data/heroes" 

// Forma 2: de importar archivo definido el arreglo como: export default [{
//import  heroes  from "./data/heroes" //heroes es el nombre que se da a la importacion(puede ser cualquiera), y con from definimos la ruta de donde viene el archivo

//Forma 3-Se importa el archivo heroes hubicado dentro de la carpeta src/data/heroes.js, definido el arreglo como: const heroes = [  y al al final del archivo como: export default heroes; 
//import  heroes from "./data/heroes" 

//Forma 3-Se importa el archivo heroes.js cuando se tiene un arreglo por defecto y otro solo se exporta, //Tambien para la forma 4 cuando se define un arreglo a exportar por defecto y otro solo a exportar
import  heroes, {owners} from "./data/heroes" //heroes es el arreglo por default a exportar y owners es otro arreglo que se declara como export const owners 

//Forma 4 de importar heroes.js
//import { heroes, owners} from "./data/heroes"

//console.log(heroes); //mostramos el arreglo heroes que fue importado
//console.log(owners); //mostramos el arreglo owners que fue importado

console.log(" --- Usando find ---")
//Funcion para retornar un heroe por el id usando find() find solo retorna 1
export const getHeroeById = (id) => {
  return heroes.find((heroes) => heroes.id === id);//find recibe el arreglo(a recorrer todos sus elementos), hace la condicion si heroes.id es igual al id que se recibe como parametro, si es si, lo retorna true.
}

//Funcion para retornar un heroe por el id - Optimizada
//const getHeroeById = (id) => heroes.find((heroes) => heroes.id === id);

console.log(getHeroeById(3));

console.log(" --- Usando filter ---")
//Funcion para obtener el heroe por medio del campo owner usando filter para filtrar
const getHeroesByOwner = (owner) => heroes.filter((heroes) => heroes.owner === owner);
console.log(getHeroesByOwner('DC'))
