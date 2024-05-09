

//Funcion Fetch API- Para obtener las imagenes deseadas. - Retornar un arreglo de gifs
export const getGifs = async(category) => {
        
    const url = ` http://api.giphy.com/v1/gifs/search?api_key=VGTFsHDEQDQ3G5w9D5Rax75tZaljPOG0&q=${category}&limit=10`;
    const resp = await fetch(url);
    const {data} = await resp.json(); //se desestructura resp y se obtiene data
    
    const gifs = data.map(img => ({ //con map recorre el arreglo data y devuelve un nuevo objeto solo con datos especificos
        id:img.id,
        title:img.title,
        url: img.images.downsized_medium.url
    }));
    //console.log(gifs);
    return gifs;
}

