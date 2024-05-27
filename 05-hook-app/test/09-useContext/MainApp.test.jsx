import { render, screen } from "@testing-library/react";
import { MainApp } from "../../src/09-useContext/MainApp";
import { MemoryRouter } from "react-router-dom";

describe('Pruebas en el componente MainApp', () => {

    test('debe de mostrar el HomePage', () => {
      
        render(
            //Renderiza el Main App como esta envuelta por Routes por eso se usa MemoryRouter
            <MemoryRouter>
                <MainApp/>
            </MemoryRouter>
        );

    //screen.debug(); //muestra el code html

    //evalua que exista el HomePages en el component HomePages
    expect(screen.getByText('HomePages')).toBeTruthy();

    render(
        //Renderiza el Main App como esta envuelta por Routes por eso se usa MemoryRouter
        <MemoryRouter initialEntries={['/login']} // initialEntries indica la url en la que se encuentra
        >
            <MainApp/>
        </MemoryRouter>
        );

    //evalua que exista el LoginPage en el component LoginPage
    expect(screen.getByText('LoginPage')).toBeTruthy();
    screen.debug(); //muestra el code html

    });
    
})