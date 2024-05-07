import PropTypes from 'prop-types'
import GifItem from './GifItem';
import { useFetchGifs } from '../hooks/useFetchGifs';


export const GifGrid = ({category}) => {

  //Hook personalizado peromite obtener images e isLoading
  const {images, isLoading } = useFetchGifs(category);
  console.log({isLoading});


  /* // Todo este bloque de codigo estará en el Custom Hook useFetchGifs
  //estado images, se actualiza con setImages y se inicializa con useState([]) con un arreglo vacio
  const [images, setImages] = useState([]); 

  //Funciones para obtener los Gifs 
  const getImages = async() => {
    const newImages = await getGifs(category); //el resultado de la funcion lo guarda en newImages, la funcion getGifs(category); hace la consulta a la API para traer los gifs
    setImages(newImages); //setImages cambia el estado de images con newImages que tiene la imagen
  }

    //useEffect sirve para disparar efectos secundarios cuando algo suceda. Ejemplo: Cuando la categoria Cambie se dispara un efecto. Cuando el componente se renderiza por primera vez se dispara un evento.
    //Cuando el componente se carga por primera vez ahi quiero disparar el evento por primera vez.
    useEffect(() => {
      //El efecto a disparar
      //getGifs(category); //LLama a la funcion que hace la consulta a la API para traer los gifs
      getImages(); //llama a la funcion getImages
    }, [])   // [] sig que el hook useEffect se va disparar la primera vez que se crea y se construye el componente (cuando buscamos un gif se crea el component)
*/


  return (
    <>
      <h3>{category}</h3>

     {/*  //Forma 1 isLoading
      {
        isLoading ? (<h2>Cargando...</h2>) //si isLoading es true muestra h2
        : null  //si isLoading es false muestra false, no se renderiza en react
      } */}
      
      
      {  //Forma 2 isLoading usando && and logico
        isLoading && (<h2>Cargando...</h2>)  //si isLoading es true ejecuta muestra h2, si es false ya no continua haciendo la evaluacion
      }

      <div className='card-grid'>
        { //con el map recorremos las images por cada item y devolvemos su titulo
          //images.map((image => ( <li key={image.id}>{image.title}</li> ))) //Forma 1 //Forma 2: desestructurando image y obteniendo datos: id, title
          images.map((image) => ( 
            //el padre GifGrid llama al componente hijo GifItem y le envia title como props
            //<GifItem  key={image.id} image={image} />   //se envia el objeto image con todos sus datos
            
            <GifItem  
              key={image.id} 
              {...image} //otra forma de pasar un objeto es con spread, sparcir sus datos del objeto image
            /> 

        )) 
        }
      </div>
    </>
  )
}

//export default GifGrid;

GifGrid.propTypes = {
    category : PropTypes.string.isRequired,
}
