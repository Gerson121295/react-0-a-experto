# Instalación y configuracion de Jest + React Testing Library
## En proyectos de React + Vite

1. Instalaciones:
```
yarn add --dev jest babel-jest @babel/preset-env @babel/preset-react 
yarn add --dev @testing-library/react @types/jest jest-environment-jsdom

npm add --dev jest babel-jest @babel/preset-env @babel/preset-react 
npm add --dev @testing-library/react @types/jest jest-environment-jsdom

```

2. Opcional: Si usamos Fetch API en el proyecto:
```
yarn add --dev whatwg-fetch

npm i --save-dev whatwg-fetch

```

3. Actualizar los scripts del __package.json__
```
"scripts: {
  ...
  "test": "jest --watchAll"
```

4. Crear archivo con la configuración de babel __babel.config.cjs__ //en nivel de src o junto package.json
```
module.exports = {
    presets: [
        [ '@babel/preset-env', { targets: { esmodules: true } } ],
        [ '@babel/preset-react', { runtime: 'automatic' } ],
    ],
};
```


5. Para componentes que importen CSS, crear un archivo llamado: tests/mocks/styleMock.js
	module.exports = {};


6. Opcional, pero eventualmente necesario, crear archivo jest.config.cjs y setup:

__jest.config.cjs__

module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFiles: ['./jest.setup.js'],
    transformIgnorePatterns: [],
    
	//... transform: { '\\.[jt]sx?$': 'babel-jest', }, ... };  //opcional

    // ModuleNameMapper sólo si ocupamos importar CSS en nuestros componentes para el testing
    moduleNameMapper: {
        '\\.(css|less)$': '<rootDir>/tests/mocks/styleMock.js',
    },
}




__jest.setup.js__
```
// En caso de necesitar la implementación del FetchAPI
import 'whatwg-fetch'; // <-- yarn add whatwg-fetch

```

	__jest.setup.js__
// En caso de necesitar la implementación del FetchAPI
// yarn add -D whatwg-fetch
// import 'whatwg-fetch'; 

// En caso de encontrar paquetes que lo requieran 
// yarn add -D setimmediate
// import 'setimmediate';

// En caso de tener variables de entorno y aún no soporta el import.meta.env
// yarn add -D dotenv
// require('dotenv').config({
//     path: '.env.test'
// });

// Realizar el mock completo de las variables de entorno
// jest.mock('./src/helpers/getEnvVariables', () => ({
//     getEnvVariables: () => ({ ...process.env })
// }));

7. Crear archivo: .env.test   //Contendra las variables de entorno para testing




### La extension para los archivos de pruebas
Dentro de la carpeta del proyecto a nivel de src Crear una carpeta llamada tests
Esta sera para pruebas un espejo de todas las carpetas y los archivos de la carpeta src.
Los archivos de test deben tener la extension: .test.js para archivos javascript y
para los archivos o componentes de react debe tener la extension: .test.jsx
ejemplo: 02-template-string.test.js
Para components en React es: .test.jsx -> FirstApp.test.jsx
-- No se puede hacer pruebas a un archivo que no este exportado: export


#### Para ejecutar las pruebas
- ejecutar: npm run test  -> presionar w -> precionar p -> escribir el nombre de
- archivo "02-template-string" a ejecutar a probar. esto para solo ejecutar este archivo.



#### Por si da el error de ES Modules con NPM, hacer lo siguiente:
1. Cambien el archivo de babel.config.js a babel.config.cjs
2. Cambien el archivo de jest.config.js a jest.config.cjs




