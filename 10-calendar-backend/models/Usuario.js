
//Se desestructura mongoose y se extrae Schema y model
const {Schema, model} = require('mongoose'); //const mongoose = require('mongoose');

//Informacion del objeto Usuario a guardar en la BD

//UsuarioSchema será un Schema
const UsuarioSchema = Schema({

    //Campo name
    name:{
        type: String, //tipo String
        require: true, //es requerido
    },
    //Campo email
    email:{
        type: String, 
        require: true,
        unique: true, //Email sera unico, no podra repetirse por otro User
    },

    //Campo password
    password: {
        type: String,
        require: true,
    }

});

//Exportar
//Se creo un modelo llamado Usuario, Mongoose asume que la coleccion a crear se llamará Usuarios.
module.exports = model('Usuario', UsuarioSchema);

