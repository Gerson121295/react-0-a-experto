
// Desestructuración
// Asignación Desestructurante

//export const userContext = ( clave, edad, rango ) => { //recibe las variables a asignar
    export const userContext = ( {clave, edad, rango }) => { //desestructura el objeto recibido
    // console.log( nombre, edad, rango );
    return {
        nombreClave: clave,
        anios: edad,
        rango: rango,
        latlng: {
            lat: 14.1232,
            lng: -12.3232
        }
    }
//console.log(userContext('jas',25,'m2'));
}




