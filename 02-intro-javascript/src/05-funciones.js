

 //Funciones

//Forma 1 de crear funcion
//const saludar = function(nombre){ // otra forma recomendada
function saludar(nombre){
    return `Hola, ${nombre}`;
  }

  console.log(saludar('Goku'));


//Forma 2 de crear funcion - Arrow function
const saluda = (nombre)=>{
  return `Hola, ${nombre}`;
}
console.log(saluda('Bulma'));

//Forma 2 de crear funcion - Arrow function optimizada debido a que solo devueve una linea
const saluda1 = (nombre) =>  `Hola, ${nombre}`;
console.log(saluda1('Brus'));

//Forma 2 de crear funcion - Arrow function optimizada y no devuelve nada
const saluda2 = () =>  `Hola mundo`;
console.log(saluda2());

//function
const getUser = () => {
      return{
        uid: "ABC123",
        username: 'El_papi1502'
      }
}
console.log(getUser());



//function getUser Optimizada
const getUser0 = () => ({
    uid: "ABC123",
    username: 'El_papi1502'
  })

//const user = getUser0();
//console.log(user);
console.log(getUser0());



function getUsuarioActivo(nombre){
  return{
    uid:'ABC567',
    username: nombre
  }
}

const usuarioActivo = getUsuarioActivo('Fernando');
console.log(usuarioActivo);

// Tarea - convertir funcion anterior en arrow funtion y retornar un objeto implicito => ({ })
const getUsuarioActive = (nombre) => ({
    uid:'ABC567',
    username: nombre
  })

const usuarioActive = getUsuarioActive('Fernanda');
console.log(usuarioActive);

