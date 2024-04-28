
 //Desestructuracion de Objetos

 const persona = {
    nombre: 'tony',
    edad:45,
    clave:'Ironman'
  }
  
  console.log(persona.nombre);
  console.log(persona.edad);
  console.log(persona.clave);
  
  //Extraer  datos especificos del objeto persona por medio de desestructuracion
  const {nombre} = persona; //extrae los campos que estan en parentesis(variables para almacenar) del objeto persona
  console.log(nombre); //muestra el campo nombre extraido del objeto persona
  
  const {nombre:nombre2} = persona; //extrae el campo nombre del objeto persona y lo guarda en la variable nombre 2
  console.log("nombre " + nombre2); //muestra el campo nombre extraido del objeto persona
  
  
  const {nombre:nombre3, edad, clave} = persona; //extrae los campos que estan en parentesis(variables para almacenar) del objeto persona
  console.log(`nombre: ${nombre3}  edad: ${edad}  clave: ${clave}`); //con Template string muestra los campos extraido del objeto persona
  
  
  
  //Desestructuracion en funcion - 
  const retornaPersona = (usuario) =>{ //recibe el objeto como parametro
    const {nombre, edad, clave} = usuario;
    console.log(`nombre: ${nombre}  edad: ${edad}  clave: ${clave}`); //con Template string muestra los campos extraido del objeto usuario
  
  }
  retornaPersona(persona); //llama a la funcion y le pasa objeto persona
  
  
  //Desestructuracion en funcion - 
  const retornaPerson = ({nombre, edad}) =>{ //desestructura el objeto que se recibe y solo recibe los parametros especificos a usar
    console.log(`nombre: ${nombre}  edad: ${edad}`); //con Template string muestra los campos extraido del objeto usuario
  }
  retornaPerson(persona); //llama a la funcion y le pasa objeto persona
  
  
  //Desestructuracion en funcion - 
  const retornaPersons = ({nombre, edad, rango ='Capitan'}) =>{ //desestructura el objeto que se recibe y solo recibe los parametros especificos a usar y le agrega otros parametro que el objeto no trae
    console.log(`nombre: ${nombre}  edad: ${edad}  rango: ${rango}`); //con Template string muestra los campos extraido del objeto usuario
  }
  retornaPersons(persona); //llama a la funcion y le pasa objeto persona
  
  
  //Desestructuracion en funcion - 
  const useContext = ({nombre, edad, rango ='Capitan'}) =>{ //desestructura el objeto que se recibe y solo recibe los parametros especificos a usar y le agrega otros parametro que el objeto no trae
    
    //retorna un objeto
    return {
      nombreClave: clave,
      anios: edad,
      latlng:{
        lat: 14.255,
        lng: -12.258,
      }
    }
  }
  const avenger = useContext(persona); //llama a la funcion y le pasa objeto persona y los datos los guarda en avenger
  console.log(avenger);
  
  //desestructura los datos que retorna la funcion useContext
  const {nombreClave, anios, latlng} = useContext(persona);
  const {lat, lng} = latlng;
  //console.log(latlng); //muestra el objeto extraido del objeto que retorna la funcion useContext
  
  //const {nombreClave, anios, latlng:{lat, lng}} = useContext(persona); //del objeto latlng extrae lat y lng
  console.log(lat, lng); //muestra campo del objeto latlng 
  console.log(nombreClave, anios); //muestra los datos retornados de la funcion useContext
  

  
