

const apiKey = 'VGTFsHDEQDQ3G5w9D5Rax75tZaljPOG0';

const peticion = fetch (`https://api.giphy.com/v1/gifs/random?apikey=${apiKey}`)

peticion
  .then(resp => resp.json() //retorna una promesa y se la envia al siguiente .then
  //.then(data.data => {  console.log(data.data) //accediendo a data.data
  .then(({data}) => {  //desestructuramos data para obtener el objeto data
    //console.log(data.images.original.url) //mostramos el objeto data donde esta el subobjeto images
    //url optenida = https://media1.giphy.com/media/3ohs7JcUsODEciTTbi/giphy.gif?cid=e1420c448p9v6jibt8oy8yaftobe7a53tzbv5cnl7kpytay4&ep=v1_gifs_random&rid=giphy.gif&ct=g
  const {url} = data.images.original; //desestructuramos para obtener la url del objeto: data.images.original
    console.log(url);

    const img = document.createElement('img');
    img.src=url; //con etiqueta img mostramos la imagen obtenida en la url

    document.body.append(img);
})
)
.catch(console.warn);//catch atrapa todos

