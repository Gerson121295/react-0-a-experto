// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { getEnvironments } from "../helpers";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//Acceso a las variables de entorno por defecto de VITE, para el testing VITE no maneja las variables de entorno las maneja Jest
//console.log(import.meta.env);
//console.log(import.meta.env.MODE);

//Llama funcion /helpers/getEnvironments
//const env = getEnvironments();
//console.log(env)

const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID,
  VITE_MEASUREMENTID,
} = getEnvironments();


//Your web app's Firebase configuration -Variables de entorno para Dev/Prod y test definidas en: .env y .env.test
const firebaseConfig = {
  apiKey: VITE_APIKEY,
  authDomain: VITE_AUTHDOMAIN,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSenderId: VITE_MESSAGINGSENDERID,
  appId: VITE_APPID,
  measurementId: VITE_MEASUREMENTID
};

//console.log(firebaseConfig);


// Your web app's Firebase configuration -- Dev/Prod
/*
const firebaseConfig = {
  apiKey: "AIzaSyDE-qMSscFTkNZAkFBrX15Aa9xVKqkTlPA",
  authDomain: "journal-app-react-78ecd.firebaseapp.com",
  projectId: "journal-app-react-78ecd",
  storageBucket: "journal-app-react-78ecd.appspot.com",
  messagingSenderId: "553989544058",
  appId: "1:553989544058:web:ba77deecce2e8d0d6603c3"
};
/*/


/*
//  Configuracion Testing
const firebaseConfig = {
  apiKey: "AIzaSyA_sp6L_IKcybRQNYqCKOXnen7J6K0_pl4",
  authDomain: "platzblog-e4bb2.firebaseapp.com",
  projectId: "platzblog-e4bb2",
  storageBucket: "platzblog-e4bb2.appspot.com",
  messagingSenderId: "229679113948",
  appId: "1:229679113948:web:44d7ee7d84d500ebfbf619",
  measurementId: "G-QDN2XN21M4"
};
*/


// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

//Para las funcionalidades de authentication
export const FirebaseAuth = getAuth(FirebaseApp);

//para config de la BD
export const FirebaseDB = getFirestore(FirebaseApp);
