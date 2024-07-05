

import axios from 'axios';
import { getEnvVariables } from '../src/helpers/getEnvVariables';

//Extrae la ruta principal para las peticiones desde .env variables de entorno
const { VITE_API_URL } = getEnvVariables();


const calendarApi = axios.create({
    baseURL: VITE_API_URL
});


// Configurar interceptores: interceptan las peticiones que van al backend o las que regresan

//interceptor de peticion
calendarApi.interceptors.request.use(config => {

    //Configura el header para cualquier peticion(GET,PUT,POST,DELETE) definida como: 'x-token' y se le envia de value: el token guardado en el localStorage
    //esto para validar que el usuario esta autenticado
    config.headers ={
        ...config.headers, // esparce todos los headers que viene en la config
        'x-token': localStorage.getItem('token')
    }

    return config; //retorna la config modificada
})

//Exporta la funcion
export default calendarApi;


