
// Estado inicial para usar en las pruebas

//Estado inicial 
export const initialState = {
    //informacion que esta fluyendo en el store
    status: 'checking', //'checking', 'not-authenticated', 'authenticated' //el estatus por 1ra. vez es 'checking' valida si hay un ser logeado
    uid: null, //cuando se autentique el user
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage:null,
}

//Estado de autenticacion
export const authenticatedState = {
    //informacion que esta fluyendo en el store
    status: 'authenticated', //'checking', 'not-authenticated', 'authenticated' //el estatus por 1ra. vez es 'checking' valida si hay un ser logeado
    uid: '123ABC', //cuando se autentique el user
    email: 'demo@google.com',
    displayName: 'Demo User',
    photoURL: 'https://demo.jpg',
    errorMessage:null,
}

//Estado de no autenticado
export const notAuthenticatedState = {
    //informacion que esta fluyendo en el store
    status: 'not-authenticated', //'checking', 'not-authenticated', 'authenticated' //el estatus por 1ra. vez es 'checking' valida si hay un ser logeado
    uid: null, //cuando se autentique el user
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage:null,
}

export const demoUser = {
    uid: 'ABC123', //cuando se autentique el user
    email: 'demo@google.com',
    displayName: 'Demo User',
    photoURL: 'https://foto.jpg',
}