import { useEffect, useState } from "react"

//Incorporar cache: Cuando se realice la primera peticion se guardara en cache para poder usarla 
//y asi evitar hacer la peticion cuando se quiere volver a ver el recurso es mas rapido
const localCache = {
}

export const useFetch = (url) => { //recibe como parametro la url

    //state es el estado, con setState se modifica el state y con useState definimos un objeto con datos que inicializan el state
    const [state, setState] = useState({
        data: null,
        isLoading: true,
        hasError : false,
        error: null
    })

     //Dispara un evento secundario luego de que se cumpla una dependencia(cuando url cambie)
     useEffect(() => {
        getFetch(); //funcion a llamar cuando se dispare 
    }, [url]); //se dispara cuando cambia el url


    //Establecer el estado de loading
    const setLoadingState = () => {
        setState({
            data:null,
            isLoading: true,
            hasError: false,
            error:null,
        });
    }

    //Funcion que realiza la peticion Fetch()
    const getFetch = async() => {

        //antes de hacer la peticion verificar si la data ya existe en cache, Si ya existe entonces servimos desde el cache y evitamos hacer la peticion
        if(localCache[url]){
            console.log('Usando Cache');
            setState({
                data:localCache[url], //data es igual a localCache[url]
                isLoading: false,
                hasError: false,
                error:null,
            });
            return;
        }

        setLoadingState(); //establecer los valor de estado cargando

        const resp = await fetch(url);

        //sleep - para ver el isLoading: espera 1.5seg para despues seguir ejecutando
        await new Promise(resolve => setTimeout(resolve, 1500));

        if(!resp.ok){ //si la resp no esta bien hubo error
            setState({
                data:null,
                isLoading:false,
                hasError:true,
                error: { //retorna el error
                    code: resp.status,
                    message: resp.statusText,
                }
            });
            return; //luego del error hace un return evita que se continue ejecutando
        }

        //si en la peticion no hubo error obtenemos la data
        const data = await resp.json(); //obtenemos la data del resp.json()

        //cambiamos el state con setState
        setState({
            data: data,
            isLoading: false,
            hasError: false,
            error: null,
        })
        
        //Manejo del caché
        localCache[url] = data; //localCache tendra toda la data que obtengamos de respuesta



    }

    


   

    //Funcionalidades que retorna el hook en un objeto para que otros componentes puedan consumirlo
  return {
    data: state.data,
    isLoading : state.isLoading,
    hasError: state.hasError
  }
}


