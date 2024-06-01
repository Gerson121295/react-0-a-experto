import { heroes } from "../data/heroes";


export const getHeroesByPublisher = (publisher) => { //recibe como parametros publisher

    const validPublishers = ['DC Comics','Marvel Comics'];

    if(!validPublishers.includes(publisher)){//valida si los publisher que se recibe no es igual a los que se valida en validPublishers, include retorna true o false
        throw new Error(`${publisher} is not a valid publisher`); //lanza el error con el publisher
    }

    //Si existe los publisher:
    //Recorre el array de heroes con filter filtra un nuevo array de héroes para devolver solo aquellos cuyo publisher coincide con el valor de publisher proporcionado.
    return heroes.filter(heroe => heroe.publisher === publisher);

}