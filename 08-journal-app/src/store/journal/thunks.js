
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./";
import { fileUpload, loadNotes } from "../../helpers";

//Thunks cuando se quiera despachar tareas asyncronas, thunks tienen acceso al store

//Cuando se de clic en el boton + 
export const startNewNote = () => {
    return async(dispatch, getState) => { //la funcion getstate obtiene los estado de la app. (estado de auth(sus datos), journal(datos)) 

        //Funcion deshabilita el boton + (agregar nueva nota) cuando se ha precionado la primera vez
        dispatch(savingNewNote());

        //console.log(getState())
        const {uid} = getState().auth; //getSate obtiene los datos del auth, se desestructura para obtener el uid del User

        //para guardar la nota en Firebase se necesita uid del Usuario
        const newNote = {
            title: '',
            body: '',
            imageUrls: [],
            date: new Date().getTime(),
        }

        //Estructura de la BD: id-user1(coleccion) ->Journal(documento) ->notes(coleccion) ->documento(datos de la nota)
       //Referencia del documento donde se va a insertar la nota: necesita FirebaseDB(config para BD definida en firebase/config), String(ruta de la coleccion) se guarda en notes
        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));

        //insertar la nota escrita por el User a la BD
        //const setDocResp = await setDoc(newDoc, newNote); //setDoc recibe newDoc(referencia del documento donde se va a inserta), newNote(la nota a insertar)
        //console.log(newDoc, setDocResp)
        await setDoc(newDoc, newNote); //setDoc recibe newDoc(referencia del documento donde se va a inserta), newNote(la nota a insertar)
       
        //Agregarle a la newNote el id generado de Firebase newDoc.id
        newNote.id = newDoc.id;

        dispatch(addNewEmptyNote(newNote)); //se despacha la func addNewEmptyNote de journalSlice
        dispatch(setActiveNote(newNote));
 
    }
}

//Empezar cargando las notas del User
export const startLoadingNotes = () => {
    return async(dispatch, getState) => {
        const {uid} = getState().auth; //getSate obtiene los datos del auth, se desestructura para obtener el uid del User
        
        //Si no viene el uid del user lance el error
        if(!uid) throw new Error('El UID del  usuario no existe');
        
        //llama a Funcion(helpers/loadNotes) para traer la coleccion de notes desde Firebase
        const notes = await loadNotes(uid); 
        
        dispatch(setNotes(notes)); //establecer las notas del usuario
    }
}

//Guardar la nota actualizada
export const startSaveNote = () => {
    return async(dispatch, getState) => {
        //dispach despacha acciones de suscritos en el store
        dispatch(setSaving()); //setSaving bloquea los botones, la app se pone en estado de carga

        const {uid} = getState().auth; //getState obtiene el estado de auth y se extrae el uid del User
        const {active:note} = getState().journal; //getState obtiene el estado de journal y se extrae active que es el obj que trae la nota activa
        
        //En la nota activa viene el id de la nota(y al actualizar no se quiere que firebase cree otro id) por eso se exparce los datos de note y se guarda en noteToFireStore 
        const noteToFireStore = {...note}; //se esparce los campos de la nota y se almacena en noteToFireStore
        delete noteToFireStore.id; //se elimina el id de la nota, para que al guardar no se envie el nuevo id creado por Firestore y asi tenga su id anterior
        //console.log(noteToFireStore) //al enviar el id no aparece en la nota
        
        //Referencia del documento donde se va a actualizar la nota: necesita FirebaseDB(config para BD definida en firebase/config), String(ruta del documento de la nota) se actualiza la note.id
       const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);

       //Actualizar la nota con id
       await setDoc(docRef, noteToFireStore, {merge:true}); //docRef(ruta del documento nota.id a editar), noteToFireStore(nuevos datos de la nota), merge(union de los nuevos campos a acualizar)

       dispatch(updateNote(note)); //actualiza el estado de la nota en pantalla

    }
}

export const startUploadingFiles = (files=[]) => {
    return async(dispatch) => {

        //dispach despacha acciones de suscritos en el store
        dispatch(setSaving()); //setSaving bloquea los botones, la app se pone en estado de carga 
        //console.log(files); //verifica que venga los archivos desde func onFileInputChange NoteView que carga los archivos
    
        //Subir solo 1 imagen
        //await fileUpload(files[0]);

        //Subir todas las imagenes seleccionas al mismo tiempo
        const fileUploadPromises = []; //arreglo de todas las promesas que se tienen que disparar
        for(const file of files){
            fileUploadPromises.push(fileUpload(file)); //arreglo de promesas almacena las imagenes a subir, recorre cada archivo y por cada iteracion lo va almacenando
        }

        //diparar las promesas para subir las imagenes
        const photosUrls = await Promise.all(fileUploadPromises);
        //console.log(photosUrls); //muestra las urls de las imgs a subir

        dispatch(setPhotosToActiveNote(photosUrls)); //dispatcha funciones anotadas del store
    }
}

export const startDeletingNote = () => {
    return async(dispach, getState) => { //getState obtiene los estados

        //Necesita los estados: uid del User y active renombrada como note - es la nota activa
        const {uid} = getState().auth;
        const {active: note} = getState().journal;

        console.log({uid, note}); //al precionar el boton de eliminar muestra el uid y nota(data)

        //Referencia del documento para eliminar la nota: necesita FirebaseDB(config para BD definida en firebase/config), String(ruta de la nota a eliminar) se elimina note.id
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);

        //Eliminar la nota, deleteDoc recibe la refrencia ruta del id de la nota a eliminar
        await deleteDoc(docRef); 
        
        //una vez eliminado la nota, procede a eliminar del store el estado de la nota
        dispach(deleteNoteById(note.id)); //quitar la nota activa y eliminarlo en el arreglo de notas

    }
}