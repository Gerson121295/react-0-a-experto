import { render, screen } from "@testing-library/react"; //screen ayuda a hacer limpiezas automaticas depues de pruebas
import FirstApp from "../src/FirstApp";

describe('Prueba en <FirstApp /> ', () => {

    //Variables globales para todas las test
    const title = 'Hola, Soy goku';
    const subTitle = 'Hola, Soy un subtitle';

    test('Debe hacer match con el snapshot', () => {

        const {container} = render(
            <FirstApp 
                title={title}
            />
        );

        expect(container).toMatchSnapshot(); //crea el snapshot
        
    });

    test('debe de mostrar el mensaje "Hola Soy Goku', () => {

        render(
            <FirstApp 
                title={title}
            />
        );

        //expect(screen.getByText(title)).not.toBeTruthy();  //valida que no exista
        expect(screen.getByText(title)).toBeTruthy();  //que exista
        

    });

    test('debe de mostrar el titulo en un h1', () => {
        render(
            <FirstApp 
                title={title}
            />
        );

        //muestra el title en h1 heading level 1
        expect(screen.getByRole('heading', {level: 1}).innerHTML ).toContain(title);
    });

    test('debe de mostrar el subtitulo enviado por props', () => {
        render(
            <FirstApp 
                title={title}
                subTitle={subTitle}
            />
        );
        expect(screen.getAllByText(subTitle).length).toBe(2);

    });
});

