import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

//Funcion para traer la coleccion de notes desde Firebase
export const loadNotes = async(uid = '') => {

     //Si no viene el uid del user lance el error
     if(!uid) throw new Error('El UID del  usuario no existe');

     //Traer documentos, collection(notes) de Firebase
     const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`); //collection recibe(FirebaseDB(config de bd), path de la collection a trarer(notes))
     const docs = await getDocs(collectionRef); //getDocs trae la referencia de los documentos de firebase

    //Recorremos docs y extraemos solo las notas que se encuentra en data. //recorre por cada doc encontrado en data
    //docs.forEach(doc => { console.log(doc.data()); })}
    const notes = []; //arreglo guarda las notas obtenidas dek Usuario
    docs.forEach(doc => { 
        notes.push({id: doc.id, ...doc.data()});
    });

    //console.log(notes); //muestra las notas obtenidas del user
    return notes;

}

