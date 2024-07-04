

const express = require('express'); //import express from 'express';
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

//console.log(process.env) //procesos corriendo en el envirement-variables de entorno

//crear el servidor de express
const app = express();

//Funcion para la conexion a la Base de Datos
dbConnection();

//Configurar CORS: Para que el Frontend acceda al recurso API del backend
app.use(cors());

//use() en express es conocido como Un middleware que es una funcion que se 
//ejecuta cuando alguien hace una peticion al servidor.

//Directorio Publico
app.use(express.static('public'));

//Lectura y parseo del body
app.use(express.json()); //recupera la data insertada del User en un Post


//Rutas
//El contenido del archivo(rutas:crear, login, renew) /routes/auth lo mostrará en la ruta: /api/auth - localhost:4000/api/auth
app.use('/api/auth', require('./routes/auth'));

//El contenido del archivo(rutas: CRUD-Eventos) /routes/events lo mostrará en la ruta: /api/auth - localhost:4000/api/events
app.use('/api/events', require('./routes/events'));


//Escuchar peticiones
//Recibe el puerto en el cual se ejecutará, callback se ejecutará cuando el servidor express este arriba
app.listen(process.env.PORT, ()=> { 
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
}); 
