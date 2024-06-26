
//Funcion para subir imagen a cloudinary

export const fileUpload = async(file) => { //recibe como parametro el archivo a subir
    
    if(!file) throw new Error('No tenemos ningun archivo a subir'); //si se cancela, o no se manda imagenes a subir luego de dar clic al boton subir
    //if(!file) return null; //--> para los test, esta linea, reemplaza al anterior: si no se manda el archivo retorna null,


    const cloudUrl = 'https://api.cloudinary.com/v1_1/dnuomqvsk/upload'; //Ruta a insertar imgs

    //formData
    const formData = new FormData();
    formData.append('upload_preset','react-journal'); //upload_preset, va el nombre(react-journal) del cloud storage de cloudinary
    formData.append('file',file); //key: 'file', file(es la imagen a seleccionar para subir)

    try {
        //Hacer la publicacion usando Fetch
        const resp = await fetch(cloudUrl,{
            method: 'POST',
            body: formData
        });

        //console.log(resp);

        //si la respuesta tuvo error(imagen no se pudo subir) es diferente de resp.ok
        if(!resp.ok) throw new Error('No se pudo subir imagen');

        //Si sale bien(la imagen es subida correctamente) resp.ok
        const cloudResp = await resp.json();
        //console.log(cloudResp);

        //secure_url contiene la url de la imagen que se subio al storage de cloudinary, esta es la URL que se manda a Firebase a guardar en el campo de la imagenURL
        return cloudResp.secure_url; 

    } catch (error) {
        //console.log(error);
        throw new Error(error.message);
        //return null; //--> para los test, esta linea reempla a la anterior(throw new...)
    }
}


/*
-> Abrir Postman: Metodo:POST https://api.cloudinary.com/v1_1/demo/image/upload
-> datos de la URL: demo:cloude name(code)

-> Abrir Postman: Metodo:POST https://api.cloudinary.com/v1_1/dnuomqvsk/upload
->En Postman -> Body ->Clic form-data -> KEY escribir file ->  VALUE:Select Files->(selecciona imgs) 
					-> KEY escribir upload_preset ->  VALUE: escribir: react-journal (nombre cloud)
->Clic en send ->Obtiene respuesta(datos de la img). secure_url contiene la url de la imagen que se subio al storage de cloudinary
-> la url de la imagen contiene el id de la imagen para modificarla(eliminar, saturar imagen, bordes, etc) su id es el bloque antes de .png (ycwjfnu52bpec03nh3wf)
*/