import { render, screen } from "@testing-library/react";
import GifItem from "../../src/components/GifItem";

describe('Prueba al component GifItem.jsx', () => {

    //Variables globales para pruebas:
    const title = 'Saitama';
    const url = "https://one-punch.com/saitama.jpg";

    //const initialUrl = 'https://media3.giphy.com/media/hsmHjcUFZQwqd62B58/giphy.gif?cid=e1420c448eznyphdzizynetfoxa7qva8s08wv1qjbjjg2p7p&ep=v1_gifs_search&rid=giphy.gif&ct=g';

    test('Debe hacer match con el snapshot', () => {
        
        //de render extraemos el container para hacer la prueba con el snapshot(una captura que se optiene del componente GifItem )
        const {container} = render( //Renderiza el componente GifItem
            <GifItem 
                //Se el envia las props al component GifItem 
                title={title}
                url = {url}
            />
        )
        //validacion de container y con el snapshot(una captura del commponent) si son iguales pasa la prueba
        expect(container).toMatchSnapshot();

    });

    test("debe de mostrar la imagen con el URL y el ALT indicado", () => {
        render( //Renderiza el componente GifItem
            
            <GifItem 
                //Se el envia las props al component GifItem 
                title={title}
                url = {url}
            />
        );

       
        //console.log(screen.getByRole('img')); //toda la data de la img
       //console.log(screen.getByRole('img').alt);
  
        //expect(screen.getByRole('img').src).toBe(url);
        //expect(screen.getByRole('img').alt).toBe(title);

        //Otra forma mas elegante extraer el texto alternativo de img
        const {src , alt } = screen.getByRole('img'); // as HTMLImageElement;
        expect(src).toBe(url);
        expect(alt).toBe(title);

    });

    test('Debe de mostrar el titulo en el componente', () => {

        render( //Renderiza el componente GifItem
        <GifItem 
            //Se el envia las props al component GifItem 
            title={title}
            url = {url}
        />
        );

        expect(screen.getByText(title)).toBeTruthy(); //Si existe title

    })
});