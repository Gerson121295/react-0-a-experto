import { fireEvent, render, screen } from "@testing-library/react";
import { LoginPage } from "../../src/09-useContext/LoginPage";
import { UserContext } from "../../src/09-useContext/context/UserContext";


describe('Pruebas al component LoginPage', () => {


    test('debe de mostrar el component sin usuaro', () => {
      
        render(
            //se renderiza el componente <LoginPage /> pero como este importa datos como el user(en este caso se define como null) del UserContext por eso se envuelve
            <UserContext.Provider value={{user : null}}>
                <LoginPage />
            </UserContext.Provider>
        );

        //obtiene la Etiqueta pre que contiene el dato del user
        const preTag = screen.getByLabelText('pre');
        //Evalua si el dato de la etique pre el user es igual a null(sin usuario)
        expect(preTag.innerHTML).toBe('null');
    });


    test('debe de llamar el setUser cuando se hace click en el boton', () => {
        
        const setUserMock = jest.fn(); //se define funcion que establece el user

        render(
            //se renderiza el componente <LoginPage /> pero como este importa datos como el user(en este caso se define como null) y setUser del UserContext por eso se envuelve
            <UserContext.Provider value={{user : null, setUser: setUserMock}}>
                <LoginPage />
            </UserContext.Provider>
        );

        //obtiene del boton para darle clic
        //const button = screen.getByLabelText('establece_user'); //forma 1: agregar aria-label establece_user al boton para encontrarlo
        const button = screen.getByRole('button');
        fireEvent.click(button); //clic al button

        //evalua que al dar clic en el boton se llame la funcion con el user
        expect(setUserMock).toHaveBeenCalledWith({"email": "juan@gmail.com", "id": 123, "name": "Juan"});


    });
    
})