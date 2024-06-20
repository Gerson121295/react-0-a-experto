// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDE-qMSscFTkNZAkFBrX15Aa9xVKqkTlPA",
  authDomain: "journal-app-react-78ecd.firebaseapp.com",
  projectId: "journal-app-react-78ecd",
  storageBucket: "journal-app-react-78ecd.appspot.com",
  messagingSenderId: "553989544058",
  appId: "1:553989544058:web:ba77deecce2e8d0d6603c3"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

//Para las funcionalidades de authentication
export const FirebaseAuth = getAuth(FirebaseApp);

//para config de la BD
export const FirebaseDB = getFirestore(FirebaseApp);
