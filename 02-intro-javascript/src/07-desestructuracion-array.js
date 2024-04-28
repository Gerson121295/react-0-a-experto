

//Desestructuracion de Arreglos

const personajes = ['Goku', 'Vegeta', 'Trunks'];

//Extrae los personajes por medio del indice del arreglo
console.log(personajes[0]);
console.log(personajes[1]);

console.log("--------------------");
//Desestructuracion para Extraer los personajes de forma independiente
//const [goku] = personajes; //Extrae el personaje Goku del arreglo personajes y lo guarda en la variable Goku
//const [p1] = personajes; //Extrae el personaje Goku del arreglo personajes y lo guarda en la variable p1
//const [, p2] = personajes; //Extrae el personaje Vegeta del arreglo personajes y lo guarda en la variable p2, como no se nececita el elemento Goku, se escribe 1 coma
const [, , p3] = personajes; //Extrae el personaje Trunks del arreglo personajes y lo guarda en la variable p3, como no se nececita el elemento anteriores se agrega una coma en esas posiciones

console.log(p3);


const retornaArreglo = () => {
  return['ABC', 123];
}
const arr = retornaArreglo(); //llama funcion retornaArreglo y guarda los datos en arr
console.log(arr); 

//Desestructuracion del resultado de la funcion que retorna
const [ letras, numeros] = retornaArreglo();// las variables letras y numeros guardan los datos retornados de la funcion retornaArreglo. 
console.log(letras, numeros); //mostramos los datos de las variables

//Tarea funcion
const useState = (valor) => { //recibe como parametro valor
  return[valor, ()=> {console.log('Hola Mundo')} ]; //retorna el valor en la posicio 0 y retorna una funcion en el posicion 1
}

const arre = useState('Sandho'); //se llama la funcion useState y se le envia el parametro Goku y se guarda el resultado en arr
console.log(arre); 
arre[1](); //ejecuta la funcion que esta en la posicion 1 del arreglo


console.log("----------------");
//Desestructuracion: 1. primer valor del arre se llama nombre. 2. se llama setNombre
const [nombre, setNombre] = useState('Goku'); //nombre es el valor y setNombre es la funcion
console.log(nombre);
setNombre();  //llama a la funcion que fue retornada de useState

