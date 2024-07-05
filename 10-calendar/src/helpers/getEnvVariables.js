
//archivo para exportar las variables de entorno

export const getEnvVariables = () => {
    //importa todas las variables de entorno
    import.meta.env;
    return{
        ...import.meta.env //esparse y exporta las variables de entorno
    }
}