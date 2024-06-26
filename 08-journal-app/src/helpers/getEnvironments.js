
export const getEnvironments = () =>{

    import.meta.env;


    //La funcion retorna todos los import
    return{
        ...import.meta.env //se esparce los import.meta.env 
    }
}