
  //pasamos al elemento root que es el id del div definido en el body del index.html que renderiza el html
 // document.getElementById('root')


//Em este archivo se hace la practica de los conceptos de javaScript luego se pega a otros archivos para almacenarlos
//Este archivo main.js  se ejecuta. Puede acceder a otros archivos siempre y cuando esos archivos esten exportados

//Operador condicional ternario
const activo = true;

/*
let mensaje = '';

//if(activo){ //si esta activo esta true
if(!activo){ //si esta diferente de activo true esta false muestra Inactivo se corre al else
  mensaje='Activo'
}else{
  mensaje=
}
*/
//operador ternario
 const mensaje = (activo) ? 'Activo' : 'Inactivo'; //si activo es true muestra de mensaje: 'Activo' si es false muestra: 'Inactivo'
console.log(mensaje);

//Ejemplo solo se ejecuta si cumple la condicion si no cumple no queremos hace nada
const mensaje2 = (activo) ? 'Activo' : null; //si activo es true muestra de mensaje: 'Activo' si es false, no muestra nada.
console.log(mensaje2);

//Ejemplo solo se ejecuta si cumple la condicion si no cumple no queremos hace nada
//const mensaje3 = !activo &&  'Activo'; //si activo es true muestra de mensaje: 'Activo' si es false, mostraria false
const mensaje3 = activo &&  'Activo'; //si activo es true muestra de mensaje: 'Activo' si es false, mostraria false

console.log(mensaje3);

