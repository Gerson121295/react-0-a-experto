import { useState } from "react"
import AddCategory from "./components/AddCategory";
import GifGrid from "./components/GifGrid";

const GifExpertApp = () => {

    //hook useState, categories es el estado y con setCategories se cambia el estado de categories, usestate(['One Punch]) inicializa categories con 'One Punch'
    const [categories, setCategories] = useState(['One Punch']);


    //FUncion agregar nueva categoria
    const onAddCategory = (newCategory) => {

        if(categories.includes(newCategory)) return; //Valida si el array categories ya incluye el nueva categoria newCategory si ya lo tiene hace un return;

       //console.log('Valoran')
       setCategories([newCategory, ...categories]); //Forma1: se agrega la nueva categoria al inicio newCategory (recibida del hijo AddCategory) y con ...categories  se hace un clon de las categorias que se tenian anteriores, 
       //setCategories([...categories, 'Valoran']); //Forma1: con: ...categories  se hace un clon de las categorias que se tenian anteriores, luego se agrega la nueva 'Valoran'
        //setCategories(cat => [...cat, 'Valorant']); //forma 2: una funcion define callback cat, la cual se le hace un clon de las categorias anteriores luego se agrega la nueva 'Valoran'
    }


  return (
    <>
      <h1>GifExpertAp</h1>

    {/* Input */}
    <AddCategory 
        // Forma1: Al component Hijo AddCategory se llama para rederizarse se le envia la prop setCategories{setCategories} la cual trae la categoria que el usuario escribio en input para buscar el gif
        //setCategories={setCategories}

        //Forma 2: Al component Hijo AddCategory se llama para rederizarse se le envia la prop onNewCategory la cual trae la categoria que el usuario escribio en input para buscar el gif
        //onNewCategory={(value)=> onAddCategory(value)} //cuando a una funcion recibe un argumento y este argumento se envia a la funcion se omite y se escribe solo el nombre de la funcion:
        onNewCategory={onAddCategory}
    />


    {/* Listado de Gif */}
        {
            categories.map( (category) => (  //map recorre el arreglo para imprimir cada item
                <GifGrid 
                    key={category}
                    category={category}
                />
            ))
        }


    {/* Gif Item */}

    </>
  )
}

export default GifExpertApp
