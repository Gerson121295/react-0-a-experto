import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../src/firebase/config";
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes} from "../../../src/store/journal/journalSlice";
import { startLoadingNotes, startNewNote } from "../../../src/store/journal/thunks";
import { loadNotes } from "../../../src/helpers";


describe('Pruebas en journal/thunks.js', () => {

    //mock
    const dispatch = jest.fn(); //se define dispatch como una funcion
    const getState = jest.fn(); //se define getState como una funcion
    beforeEach( () => jest.clearAllMocks()); //limpia la data de los mocks antes de cada prueba


    test('startNewNote debe de crear una nueva nota en blanco', async() => {
        
        const uid = 'TEST-UID';

        //Funcion getState se simula que retorna el uid del usuario quien sera el dueño de la nota
        getState.mockReturnValue({auth: {uid:uid}});

        //startNewNote () la funcion no recibe un argumento, pero si en el 2do. dispatch
        //inserta la nota en la BD(para testing) con ID del User
        await startNewNote()(dispatch, getState); 

        
        //Asegurar que el dispatch halla llamado savingNewNote(), 
        expect(dispatch).toHaveBeenCalledWith(savingNewNote());
        expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote({
            body:'',
            title: '',
            id: expect.any(String),//para el id espera cualquier String
            date: expect.any(Number), //para la fecha espera cualquier numero
            imageUrls: [],
        }));

        //Asegurar que el dispatch halla llamado satActiveNote(), 
        expect( dispatch ).toHaveBeenCalledWith( setActiveNote({
            body: '',
            title:'',
            id: expect.any( String ),
            date: expect.any( Number ),
            imageUrls: [],
        }));

        //Borrar de Firebase - Borra la entrada para no dejar basura de datos luego de la insercion
        //Referencia del documento donde se va a insertar la nota: necesita FirebaseDB(config para BD definida en firebase/config), String(ruta de la coleccion) se guarda en notes
        const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);


        //todos los documentos que se encuentren dentro de esa collection
        const docs = await getDocs(collectionRef);
        //console.log(docs);
        // Forma 1: usando arreglo de promesas que contiene todas las promesas de eliminacion de los archivos
        const deletePromises = [];
        docs.forEach(doc => deletePromises.push(deleteDoc(doc.ref)));
        await Promise.all(deletePromises); //Borra todas las notas agregadas
        
        //forma 2: usando Map
        //const {docs} = await getDocs(collectionRef);
        //await Promise.all(docs.map(({ref}) => deleteDoc(ref)));

    });

    //Forma 1
    test('Debe de cargar las notas', async () => {
        const uid = 'TEST-UID';
        getState.mockReturnValue({ auth: { uid } });
 
        //Creamos una nueva nota a ese usuario
        await startNewNote()(dispatch, getState);
 
        //luego traemos las notas que tiene dicho usuario
        const resp = await loadNotes(uid);
 
        //Llamamos al thunk de journalSlice
        await startLoadingNotes()(dispatch, getState);
 
        expect(dispatch).toHaveBeenCalledWith(setNotes( resp ));
 
    });
    
})