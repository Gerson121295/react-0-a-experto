import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string"; //instalado: npm install query-string

import { useForm } from "../../hooks/useForm";
import { HeroCard } from "../components";
import { getHeroesByName } from "../helpers";

export const SearchPage = () => {

  //funcion navigate
  const navigate = useNavigate(); //obtner la navegacio
  const location = useLocation();//obtener la informacion de la ubicacion donde nos encontramos.

   //queryString podremos extraer lo que se encuentre dentro del location.search, lo que la persona escriba lo extraemos y mostramos en div
  //const query = queryString.parse(location.search);
  const { q = '' } = queryString.parse(location.search); //de queru se extrae la q y si no viene se define vacio. ''

  //Busqueda del hero con el name con la funcion: getHeroesByName
  const heroes = getHeroesByName(q);

  //Condicion para mostrar la alerta - //Si query esta vacio(no se a buscado un heroe)
  const showSearch = (q.length === 0); //regresa un booleano si es true o false
  //Condicion para mostrar la alerta - //si ya se busco  un heroe pero no se encontro muestra esta alerta
  const showError = (q.length > 0) && heroes.length === 0; //q.length > 0 (ya se escribio en el campo), heroes.length === 0 (query no regreso nada)

  //Se llama al hook useForm(se envia el estado inicial del useForm) y se desestructura para obtener: searchText y onImputChange 
  const {searchText, onInputChange } = useForm({ searchText: q });

  const onSearchSubmit = (event) => {
    event.preventDefault(); //evita que haga un full refresh, evitar que se recargue la pagina al hacer el submit enviar el form
   
    //if(searchText.trim().length <= 1 ) return; //valida que el input searchText no sea <= 1

    //para navegar a la ruta actual pero en la url se le envia por query param el Heroe a buscar en la url: http://localhost:5173/search?q=batman
    navigate(`?q=${searchText}`);   //{searchText.toLowerCase().trim()}`) //toLowerCase para convertir todo en minuscula y trim para borrar espacios en blanco

  }

  return (
    <>
      <h1>search</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Searching</h4>
          <hr />
          <form onSubmit={onSearchSubmit} aria-label='form'>
            <input
              type="text"
              placeholder="Search a hero"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={searchText}
              onChange={onInputChange}
            />

            <button className="btn btn-outline-primary mt-1">Search</button>
          </form>
        </div>

        {/* Mostrar el resultado de la busqueda */}
        <div className="col-7">
          <h4>Results</h4>
          <hr />

        {/*  // Forma 1 de hacer las validaciones de busquedas de heroes y mostrar alertas
          {  
            (q === '') ? <div className="alert alert-primary">Search a hero</div> //Si query esta vacio(no se a buscado un heroe) muestra esta alerta
            : (heroes.length === 0) && //&& si esto se cumple(condicion) mostrar la alerta
            <div className="alert alert-danger">No hero with <b>{q}</b> </div> //si ya se busco  un heroe pero no se encontro muestra esta alerta
          } */}
          

         {/*  // Forma 2 de hacer las validaciones de busquedas de heroes y mostrar alertas*/}
         {/* //Si query esta vacio(no se a buscado un heroe) muestra esta alerta */}
         <div 
          className="alert alert-primary animate__animated animate__fadeIn"  //clase: class="animate__animated animate__bounce es del sitio: https://animate.style/ 
          style={{display: showSearch ? '' : 'none' }}  //  style={{display: q !== '' ? 'none' : '' }}>  - si q es diferente(!==) a '' vacio mostrar none de lo contrario mostrar '' vacio 
        > 
          Search a hero
         </div>

          {/* Si showError es true, el div se muestra (display: '', que mantiene el comportamiento por defecto). Si showError es false, el div se oculta (display: 'none'). 
            si ya se busco un heroe pero no se encontro muestra esta alerta: el '' indica que si se vera la alerta, el none oculta la alerta */}
         <div 
          aria-label="alert-danger" //es la key para tener acceso a este div para las pruebas
          className="alert alert-danger animate__animated animate__fadeIn" 
          style={{display: showError ? '' : 'none' }} 
        > 
          No hero with <b>{q}</b> 
        </div>


          { //Luego de hacer la busqueda: regresa el Hero
            heroes.map( hero => (
              <HeroCard //llama al component HeroCard a renderizarse y se le envia los datos hero buscado
                key={hero.id} 
                {...hero} //son spread pasamos todos los datos del objeto hero
              />
            ))
          }
        
        </div>
      </div>
    </>
  );
}

