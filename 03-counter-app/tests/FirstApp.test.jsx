import { render } from "@testing-library/react";
import FirstApp from "../src/FirstApp";

describe('Prueba en <FirstApp /> ', () => {
/*
    test('Debe de hacer match con el snapshot', () =>{

        const title = "Hola, soy Goku";
        const {container} = render(<FirstApp title={title}/>) //render devuelve un container
        //console.log(container);
        expect(container).toMatchSnapshot(); //se crea una carpeta llamada _snapshots_ al mismo nivel de FirstApp.test.jsx esta toma un foto de lo que renderizo el componet

    });
*/

    test('Debe de mostrar el titulo en un h1', () => {

        const title = "Hola, soy Goku";
        const {container, getByText, getByTestId} = render(<FirstApp title={title}/>) //render devuelve un container
      
        expect(getByText(title)).toBeTruthy();

        //const h1 = container.querySelector('h1'); //buscar el h1 con querySelector, solo regresa 1
        //expect(h1.innerHTML).toBe(title) //asegurandome que h1 este dentro de un h1
        //expect(h1.innerHTML).toContain(title) 
        //console.log(h1.innerHTML);
        
        //Buscar el test-title con getByTestId
        //expect(getByTestId('test-title')).toBeTruthy();
        expect(getByTestId('test-title').innerHTML).toContain(title);//toContain no importa el espacio valida el titulo //.toBe(title);
    });

    test('debe de mostrar el subtitulo enviado por props', () => {
        const title = "Hola, soy Goku";
        const subTitle = "Soy un subtitulo";

        const { getByText, getAllByText } = render(  //render devuelve un container
            <FirstApp 
                title={title}
                subTitle={subTitle} //se le envia el subtitle a FirstApp
            />
        );
      
        //expect(getByText(subTitle)).toBeTruthy(); //getByText se asegura que valide uno
        //expect(getAllByText(subTitle)).toBeTruthy(); //getAllByText se asegura que valide mas de una etiqueta
        expect(getAllByText(subTitle).length).toBe(2); //getAllByText se asegura que valide 2 con elementos variables subTitle
    
    });
});

