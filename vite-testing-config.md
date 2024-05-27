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

5. Opcional, pero eventualmente necesario, crear archivo Jest config y setup:

__jest.config.cjs__
```
module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFiles: ['./jest.setup.js']
}
```

__jest.setup.js__
```
// En caso de necesitar la implementación del FetchAPI
import 'whatwg-fetch'; // <-- yarn add whatwg-fetch
```
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




