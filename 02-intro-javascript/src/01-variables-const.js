
//Este archivo.js almacena lo realizado en main.js para ejecutarlo pegar a main.js y levantar la app

/*** Variables  y constantes ***/
//var para definir variables y constantes ya no se utilizan
const nombre = 'Pepe'; 
let apellido = 'Rdas'

let valorDado = 5;
valorDado = 6;

console.log("-----------Imprime dato dentro del if------------- ")
if ( true ){
  const nombre = "Sara";
  let valorDado = 3;
  console.log(nombre + " " + valorDado);
}

console.log("------------- Imprime dato de variables----------- ")
console.log(nombre + '  ' + apellido + ' ' + valorDado);
console.log("------------- Imprime dato de variables usando Template String----------- ")
console.log(`nombre ${nombre}  apellido ${apellido} valor Dado ${valorDado}`);


//function getSaludo(nombre){  //Funcion norma
  const getSaludo = () => {  //usando arrow function 
  return 'hola '+ nombre;
}

console.log(`Este es my name: ${getSaludo(nombre)}`); //Llama funcion dentro de Template String
