

//Promesas: decirle al jefe que hare el trabajos.

import { getHeroeById} from "./08-import-export-file";

//las promesas son asincronas y primero se va a ejecutar todo lo sincrono todo secuencial, cuando termine con todo lo sincrono ejecuta los resultados de las promesas
/*
console.log("----- Ejemplo 1 -----");
const promesa = new Promise((resolve, reject)=>{ //son callback - resolve se ejecuta cuando la promesa es exitosa y reject cuando no se cumpla
  setTimeout(() =>{

    const heroe = getHeroeById(4); //tarda 2 segundos en ejecutarse y dar el resultado
    //resolve(heroe); //resolve notificara a cualquiera que este ejecutando el then(), resolve le pasa heroe al then
    reject('No se pudo encontrar el heroe'); //manda al then que no pudo encontrar un heroe
  }, 2000) //2 seg.
});

//Hacer algo cuando la promesa termine
promesa.then((heroe) =>{ //then recibe un heroe
  console.log('heroe', heroe)
})
.catch(err => console.warn(err));
*/


console.log("-------  Ejemplo 2 --------");

//Funcion que tiene dentro una promesa
const getHeroeByIdAsync = (id) =>{ //rcibe el id del heroe a buscar

  //const promesa = new Promise((resolve, reject)=>{ //son callback - resolve se ejecuta cuando la promesa es exitosa y reject cuando no se cumpla
  return new Promise((resolve, reject)=>{ //son callback - resolve se ejecuta cuando la promesa es exitosa y reject cuando no se cumpla
    
    setTimeout(() =>{
      const heroe = getHeroeById(id); //tarda 2 segundos en ejecutarse y dar el resultado
    if(heroe){//si heroe es true existe
      resolve(heroe); //resolve notificara a cualquiera que este ejecutando el then(), resolve le pasa heroe al then
      }else{ 
      reject('No se pudo encontrar el heroe'); //manda al then que no pudo encontrar un heroe
    }
    }, 2000) //2 seg.
  });
  
  //return promesa;
}

//getHeroeByIdAsync(5).then(heroe => console.log('Heroe',heroe))
//.catch(err => console.warn(err)); //si hay error el heroe no existe lo captura en el catch

//forma 2 del  then y catch optimizada
getHeroeByIdAsync(5).then(console.log) //recibe el then lo mande al console.log
.catch(console.warn); 

