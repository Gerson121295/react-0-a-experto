import { Navigate, useNavigate, useParams } from "react-router-dom"
import { getHeroById } from "../helpers";
import { useMemo } from "react";


export const HeroPage = () => {

  //Hook useParams sirve para obtener los parametros, se desestructura y se obtiene el id y el ...res resto de elementos
  const {id} = useParams();
  
  //hero guarda los datos del hero que obtiene la funcion getHeroById(id)
  //useMemo sirve memoriza un valor calculado y evitar recalculaciones innecesarias, mejorando el rendimiento del componente, solo vuelve a recalcular si la funcion getHeroeById cambia
  const hero = useMemo(() =>  getHeroById(id), [id]);// useMemo dispara el callback o la funcion(() =>  getHeroById(id)) cuando su dependencias ([id]) cambien. Cuando cambia el id se dispara y guarda el dato en hero

  //Hook para navigate  a una url
  const navigate = useNavigate();

  //Funcion para el Boton regrasar hacia atras
  const onNavigateBack = () => {
   navigate(-1); //(-1) navega al historial anterior otra ("/marvel")
   //hero.publisher==='DC Comics'?navigate('/dc'):navigate('/marvel'); //otra forma de retornar es evaluar de que tipo de hero esta para volver a su categoria. Si es DC vuelve a DC
  }

  //si hero no existe se redirige a una pantalla marvel.
  if(!hero){ 
    return <Navigate to = "/marvel" />
  }

    return (
      <div className="row mt-5"> {/* animate__animated animate__fadeInLeft" */}
        <div className="col-4">
          <img
            className="img-thumbnail  animate__animated animate__fadeInLeft" //clase: class="animate__animated animate__bounce o fadeIn es del sitio: https://animate.style/ 
            src={`/assets/heroes/${id}.jpg`} 
            alt={hero.superhero} 
          />
          </div>
          <div className="col-8">
            <h3>{hero.superhero}</h3>
            <ul className="list-group list-group-flush">
              <li className="list-group-item"><b>Alter ego: </b> {hero.alter_ego}</li>
              <li className="list-group-item"><b>Publisher: </b> {hero.publisher}</li>
              <li className="list-group-item"><b>First appearance: </b> {hero.first_appearance}</li>
            </ul>

            <h5 className="mt-3">Characters</h5>
            <p>{hero.characters}</p>

            <button
              className="btn btn-outline-primary"
              onClick={onNavigateBack}
            >
              Regresar
            </button>
          </div>
      </div>
    )
  }
