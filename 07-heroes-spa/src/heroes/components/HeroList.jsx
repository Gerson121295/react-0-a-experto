import { getHeroesByPublisher } from "../helpers";
import PropTypes from 'prop-types'
import { HeroCard } from "./HeroCard";
import { useMemo } from "react";

export const HeroList = ({publisher}) => { //recibe publisher como props del padre: DcPage  o MarvelPage

    //useMemo sirve memoriza un valor calculado y evitar recalculaciones innecesarias, mejorando el rendimiento del componente, solo vuelve a hacer la peticion si la funcion getHeroesByPublisher cambia
    //useMemo dispara el callback o la funcion (() => getHeroesByPublisher(publisher)) cuando su dependencias ([publisher]) cambie. Cuando cambia el el valor de publisher se dispara y guarda el dato en heroes
    const heroes = useMemo( () => getHeroesByPublisher(publisher), [publisher]);

  return (
    <div className="row rows-cols-1 row-cols-md-3 g-3"> 
        {
        //map recorre el array heroes y devolver un "<li>" HeroCard para cada héroe. La key en cada "<li>" HeroCard se establece usando hero.id para asegurar que cada elemento de la lista tenga un id único.
        heroes.map(hero => (
            //<li key={hero.id}> {hero.superhero} </li>
            //Llama al hijo HeroCard a renderizarse por cada heroe, le envia id por cada heroe y envia las props que contiene la data del hero
            <HeroCard  //Retorna el HeroCard
                key={hero.id} 
                {...hero} //se usa spread para pasar las propiedades desestructura del objeto hero como props individuales al componente HeroCard.
                //id={hero.id} superhero={hero.superhero} publisher={hero.publisher} //otra forma es enviarse las props de forma individual
            /> 
        ))
        }
    </div>
  )
}

HeroList.propTypes = {
    publisher : PropTypes.string,
}

