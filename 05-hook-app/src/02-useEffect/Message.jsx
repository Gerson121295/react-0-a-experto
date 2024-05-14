import { useEffect } from "react";

export const Message = () => {

       /*  //useEffect para disparar efectos secundarios cuando cambie el 
        useEffect(() => { //callback
            console.log('Message Mounted - Montado'); //Se ejecuta cuando el estado de Username es igual a Strider2
            return () => { //cleanup - limpiamos el listener para evitar que siga consumiendo memoria
                console.log('Message UnMounted - DesMontado'); //Se ejecuta cuando el estado de Username no es igual a Strider2
            }
          }, []) //El useEffect se ejeucta cuando el componente se monta por primera vez 
 */


           //useEffect para disparar efectos secundarios cuando cambie el 
        useEffect(() => { //callback

            //Coordenadas
            const onMouseMove = ({x,y}) =>{ //se desestructura el event y se obtiene x, y
                const coords = {x,y}
                console.log(coords);
            }

            //Escucha el evento de mover el mouse, muestra las coordenadas x y cuando el username es igual a Strider2
            window.addEventListener('mousemove',onMouseMove); //cuando el component se monta se crea el listener 'mousemove' y lo apunta a la funcion onMouseMove

             return () => { //cleanup - limpiamos el listener para evitar que siga consumiendo memoria
                window.removeEventListener('mousemove',onMouseMove); //elimina el listener mousemove se le pasa la funcion onMouseMove, ya no muestra las coordenadas x y cuando el username no es igual a Strider2
            }
          }, []) //El useEffect se ejeucta cuando el componente se monta por primera vez 


    return(
        <>
            <h3>usuario ya existe</h3>
        
        </>
    )
}