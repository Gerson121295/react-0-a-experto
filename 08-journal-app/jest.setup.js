// En caso de necesitar la implementación del FetchAPI
import 'whatwg-fetch'; // <-- yarn add whatwg-fetch
import 'setimmediate'; // <-- para imagenes
import { getEnvironments } from './src/helpers/getEnvironments';

//instalar: npm install -D dotenv  - Para cargar las variables de entorno en el lado de NODE
require('dotenv').config({
    path: '.env.test'
});

//mock para que cuando se haga una solicitud al archivo getEnvironments del lado del testing
//regresa la funcion getEnvironments  que regresa todas la variables de entorno que se encuentran definidas
jest.mock('./src/helpers/getEnvironments', () => ({
    getEnvironments: () => ({ ...process.env})
}));

