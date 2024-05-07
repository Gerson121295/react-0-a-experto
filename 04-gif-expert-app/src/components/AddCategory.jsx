import { useState } from "react";
import PropTypes from 'prop-types'


//export const AddCategory = ({setCategories}) => { //Forma1: recibe como props setCategories que viene del padre GifExpertApp
export const AddCategory = ({onNewCategory}) => { //Forma2: recibe como props onNewCategory que viene del padre GifExpertApp

    //hook useState: inputValue es el valor y con setInputValue cambia el valor de inputValue y con useState('One Punch') inicializamos inputValue
    const [inputValue, setInputValue] = useState('One Punch');

    //Funcion para cambia el valor de inputValue por lo que se escriba en el input para buscar gifs
    const onInputChange = ({target}) => { //const onInputChange = (event) => {   otra forma es desestructurar target del event.
        //console.log(target.value); //console.log(target.value);
        setInputValue(target.value); //con setInputValue cambia el valor de inputValue y le agrega el que el usuario escriba en el input por medio de: event.target.value recoge lo que escribe el user
    }

    // Funcion envia el formulario con el dato ingresado del usuario
    const onSubmit = (event) => {
        event.preventDefault(); //evita que al enviar el formulario se recargue la pagina
        //console.log(inputValue); //muestra el valor escrito por el User y sera enviado

        if(inputValue.trim().length <= 1) return; //valida si el texto escrito del user es menor a 1 caracter hace un return.

        //Forma 1 de enviar el valor escrito en el input del form por el User
        //por medio de la prop setCategories pasa el valor escrito en el input del form por el User y sera enviado al padre 
        //setCategories( (cat) => [ inputValue, ...cat]); //setCategories dentro hay una funcion callback cat, la cual se agrega la nueva categoria y luego se hace un clon de las categorias anteriores ...cat
        

        //Forma 2 de enviar el valor escrito en el input del form por el User - por la prop onNewCategory 
        onNewCategory(inputValue.trim()) 

        //Luego de ingresar y enviar el dato del user escrito del input se borra el input
        setInputValue('');
    }


  return (
    <>
        {/* <form onSubmit={(event) => onSubmit(event) }> */}
        <form onSubmit={onSubmit}>
            <input 
            type="text" 
            placeholder="Buscar gifs"
            value={inputValue}
            //cuando la funcion recibe un argumento y este argumento se usa para mandar a llamar a la funcion, entonces solo se usa la funcion:  onChange={onInputChange}
            onChange={onInputChange} //onChange={(event) => onInputChange(event)}  //capturamos el valor ingresado por el User. 
            />
        </form>
      
    </>
  )
}

export default AddCategory;

AddCategory.propTypes = {
    //setCategories : PropTypes.func.isRequired, //forma 1: de enviar el dato recibido en el input del form del User
    onNewCategory : PropTypes.func.isRequired, //forma 2: de enviar el dato recibido en el input del form del User
}