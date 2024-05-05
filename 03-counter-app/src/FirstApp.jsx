import PropTypes from 'prop-types'


//Recomendable agregar variables o funciones que no tengan nada que ver con la funcionalidad a fuera de la funcion 
//const newMessage = 'Gerson';
//const newMessage = [1,2,3,4,5,6,7];

/* const newMessage = {
     message: 'Hola',
    title: 'Gep'
} 
*/

function suma(a,b){
    return a + b;
}

export const FirstApp = ({title='No hay title', subTitle='No hay subtitle', name='Gema'}) =>{ //recibe props del padre main.jsx: {title} esta desestructurado de props

    return(
        <>
            {/* <h1>GErson Ep</h1> */}
            {/* <p>{newMessage.message}</p> */} {/* impresion de variables en el HTML */}
            {/* <code>{JSON.stringify(newMessage)}</code>  */}{/* impresion de objeto js */}
            {/* {<p>La suma es: {suma(5,5)}</p>} */}

            {/* Recibe datos mediante props */}
            {/* Title es recibida como props */}
            <h1 data-testid="test-title">{title}</h1> 
            <p>{subTitle}</p> {/* <p>{subTitle} {suma(5,5)}</p>  */}
            <p>{subTitle}</p> 
            <h2>{name}</h2>
        </>
    )
}

/*
export function FirstComponent(){
    return(
        <h3>First component number 2</h3>
    )
}
*/

//Validar las props que se recibe del padre cumpla con el tipo de dato requerido
FirstApp.propTypes ={
    //name: PropTypes.string,
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string,
    name: PropTypes.string,
    
}


//Definir los props por defecto en caso de que no viene del padre pero si viene tomará la del padre
//Para futuras versiones ya no se utilizará .defaultProps = {  
//para establecer props por defecto se realizará en la funcion donde se define la props a recibir del padre:
//export const FirstApp = ({ title = 'No hay título', subTitle = 'No hay subtítulo' }) => {...}
/*
FirstApp.defaultProps = {
    name: 'Gerson Ep',
    subTitle: 'No hay subtitulo',
    //title: "No hay titulo"
}
*/
export default FirstApp;