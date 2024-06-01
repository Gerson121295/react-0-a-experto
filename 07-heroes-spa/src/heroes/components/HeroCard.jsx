import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';


//Forma 3 definir etiqueta p en un component que no se exporta
const CharactersByHero = ({alter_ego, characters}) => {
    //Forma 1 - Funcion
    //if(alter_ego === characters) return (<></>); //si son iguales no retorna nada
    //return <p>{characters}</p> //si no son iguales retorna el parrafo

    //Forma 2 - Operador ternario
    return (alter_ego === characters) ? <></> //si cumple la condicion retorna un fragmento vacio
    : <p>{characters}</p> //si no se cumple la condicion, no son iguales retorna el parrafo
}

export const HeroCard = (
    {
        id,
        superhero, 
        publisher, 
        alter_ego,
        first_appearance,
        characters,
    }
) => {

    const heroImageUrl = `/assets/heroes/${id}.jpg`;

    //Forma 2 definir etiqueta p en una const
    const charactesByHero = (<p>{characters}</p>);

  return (
    <div className='col animate__animated animate__fadeIn'> {/* clase: class="animate__animated animate__bounce es del sitio: https://animate.style/ */}
        <div className="card">
            <div className="row g-0"> {/*"row no-gutters" */}
                <div className="col-4"> 
                    <img src={heroImageUrl} alt={superhero} className='card-img' />
                </div>

                <div className="col-8">
                    <div className="card-body">
                        <h5 className="card-title"> {superhero} </h5>
                        <p className="card-text">{alter_ego}</p>
                        
                      {/*   Forma 1 y 2 de validar que en characters no se repita alter_ego si esta no se muestra otra vez
                        { //condicion si alter_ego no se encuentre en character se agrega si se encuentra no se agrega esto para evitar que se repita alter_ego
                            //(alter_ego !== characters) && (<p>{characters}</p>) //Forma 1: definir la etiqueta p aqui.
                            (alter_ego !== characters) && charactesByHero //definer la etiqueta en p en un const
                        } */}

                        {/* Forma 3 - usando un component dentro de este */}
                        <CharactersByHero characters={characters} alter_ego={alter_ego} />

                        <p className="card-text">
                            <small className="text-muted">{first_appearance}</small>
                        </p>

                        <Link to={`/hero/${id}`}> 
                            Más...
                        </Link>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

HeroCard.propTypes = {
    id:PropTypes.string.isRequired,
    superhero:PropTypes.string.isRequired,
    publisher:PropTypes.string.isRequired,
    alter_ego:PropTypes.string.isRequired,
    first_appearance:PropTypes.string.isRequired,
    characters:PropTypes.string.isRequired,
}

