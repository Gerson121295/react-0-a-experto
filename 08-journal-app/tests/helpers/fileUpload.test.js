
import {v2 as cloudinary} from 'cloudinary'
import { fileUpload } from "../../src/helpers/fileUpload"

/*
 Para el test de la funcion de fileUpload  se realizo cambios en el archivo: helpers/fileUpload.js

Para borrar las imagenes de los Test:
->instalar: npm install -D cloudinary
->instalar: npm install -D setimmediate

- Se modifico el archivo: jest.setup.js  --para cargar las imgs
// En caso de necesitar la implementación del FetchAPI
import 'whatwg-fetch'; // <-- yarn add whatwg-fetch
import 'setimmediate'; // <-- para imagenes

*/

    //Configuracion de admin de cloudinary para eliminar img
    cloudinary.config({
        cloud_name: 'dnuomqvsk',
        api_key: '853158475526628',
        api_secret: '7xjQfFo0s3c0Pk-Pt_J8yB9_Sb0',
        secure: true
    });

describe('Pruebas en fileUpload ',() => {

    test('debe de subir el archivo correctamente a cloudinary', async() => {

        const imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYc_gqKsC0zjAlA6m5nrazK2oXg8YqCMTSAg&s';
        const resp = await fetch(imageUrl);
        const blob = await resp.blob(); //se crea un blob
        //El Blob es un método que se usa para trabajar con objetos de tipo Blob que básicamente representan datos inmutables, 
        //puedes pensar en un Blob como un archivo en memoria, se usa mucho cuando trabajas con archivos multimedia como imágenes, 
        //audios, videos, o cuando necesitas manipular archivos para descargarlos

        const file = new File([blob], 'foto.jpg'); //new File(recibe el blob y se da nombre a la img)
        const url = await fileUpload(file); //envia la img

        //Evaluando
        expect(typeof url).toBe('string'); //se evalua que url se tipo 'string'

        //Limpieza: BOrrar la imagen subida para pruebas en Cloudinary

        //console.log(url); //obtiene la url de la img para conocer el tipo(jpg, png) y su id: antes del .jpg esta el id de la img
        const segments = url.split('/'); //realiza cortes por cada / y los guarda en un JSON por cada corte
        //console.log(segments); //muestra el json con los cortes
        const imageId = segments[segments.length - 1].replace('.jpg',''); //imageId guarda el id, obtenido del ultimo segments y jpg se reemplaza por vacio ''
        //console.log(imageId);

        //se envia a cloudinary el id de la imagen a eliminar
        //con esto funcion elimina la img subida para pruebas
        await cloudinary.api.delete_resources([imageId]); 

        //Se especifica el folder 'journal' donde se encuentra la img(no funciono)
       /* 
        const cloudResp = await cloudinary.api.delete_resources(['journal/'+ imageId], {
            resource_type: 'image' //especifica el recurso a eliminar es una img
        });
        */
        //console.log(cloudResp);
    });

    test('debe de retornar null, cuando no se envia la img', async() => {
      
        const file = new File([], 'foto.jpg'); //file no recibe la img
        const url = await fileUpload(file);

        //valida
        expect(url).toBe(null); //se evalua que url sea null
    })
    
})