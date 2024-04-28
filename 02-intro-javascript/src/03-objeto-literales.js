

//Objetos Literales

const persona = {
    nombre: 'Toni',
    apellido: 'Stark',
    edad: 45,
  };
  
  console.log(persona.nombre);
  console.log({persona:persona}); //se crea un objeto persona y apunta al valor objeto persona, otra forma de escribirlo cuando se llama igual es solo agregar 1 vez
  console.log({persona}); //se crea un objeto persona y apunta al valor objeto persona, como se llama igual se escribe 1 vez
  //console.table({persona}); //table para una mejor vista del objeto persona
  
  //Los objetos pueden tener dentro otros objetos
  const people = {
    nombre: 'Toni',
    apellido: 'Stark',
    edad: 45,
    //Objeto direccion dentro de people
    direccion:{
      ciudad: 'New york',
      zip: 55321221,
      lat: 14.3232,
      lng: 34.9233321,
    }
  };
  
  console.log(people);
  
  //Clonar el objeto people
  console.log("----------Clon de people -----------");
  const people2 = people; //no se copia el valor de persona, copia la referencia espacio en memoria donde se guarda people
        people2.nombre = 'Peter';
  console.log(people2);
  
  //Para clonar un objeto lo recomendable es crear un objeto y agregar las propiedades
  const people3 = {nombre: 'Pablo', apellido: 'Lu', edad:'21'}
  
  //Que pereza es agregar todas las propiedades del objeto para crear un clon por lo que se utiliza el operador Spread para agregarlas
  console.log("------ Crear un clon de people utilizando el operador ... spread ------")
  const people4 = {...people}; //en people4 se crea un clon del objeto people con sus datos.
        people4.nombre = 'Luis'; //se modifica solo el nombre del objeto people4
        console.log(people4);

        