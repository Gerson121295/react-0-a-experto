
//Async y Await

const getImage = async() => {

    try { //cuando se usa async es reomendable usar try catch para manejar si existiera errores
  
      const apiKey = 'VGTFsHDEQDQ3G5w9D5Rax75tZaljPOG0';
        
      //resp es de tipo response y await dice espera a que termine de ejecutar esta promesa para ejecutar las siguientes lineas
      const resp = await fetch (`https://api.giphy.com/v1/gifs/random?apikey=${apiKey}`) 
      //const data = await resp.json(); //espera para obtener json de la data y luego guardarla en data, la cual se desestructura la data
      //const {url} = data.data.images.original; //desestructuramos y extraemos la url del objeto data
    
      const {data} = await resp.json(); //espera para obtener json de la data y luego guardarla en data, la cual se desestructura la data
      const {url} =  data.images.original; //desestructuramos y extraemos la url del objeto data
  
      //console.log(url);
      
      //Mostrar la imagen de la url en pantalla
      const img = document.createElement('img');
      img.src=url; //con etiqueta img mostramos la imagen obtenida en la url
  
      document.body.append(img);
    } catch (error) {
      //Manejo del error si existiera un error, podemos agrega una imagen por defecto
      console.log("error");
      console.error(error);
  }
  }
  getImage();

  