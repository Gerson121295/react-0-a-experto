import { render, screen } from "@testing-library/react";
import { HomePage } from "../../src/09-useContext/HomePage";
import { UserContext } from "../../src/09-useContext/context/UserContext";

describe('Pruebas en el componente HomePage', () => {

    //dato de prueba
    const user = {
        id: 1,
        name: 'Fernando'
    }

    test('debe de mostrar el component  sin el usuario', () => {
        
        //renderizar el component HomePage
        render( 
            //el component <HomePage/> importa datos del UserContext por eso se tiene que envolver para acceder al user
            <UserContext.Provider value={{user:null}}>
                <HomePage/>
            </UserContext.Provider>
            
        );

        const preTag = screen.getByLabelText('pre'); //se agrego en la etique pre - aria-label="pre"
        console.log(preTag.innerHTML); //null

        //evalua que etiqueta sea null
        expect(preTag.innerHTML).toBe('null');

        //screen.debug();
    });

    test('debe de mostrar el component  sin el usuario', () => {
        
        //renderizar el component HomePage
        render( 
            //el component <HomePage/> importa datos del UserContext por eso se tiene que envolver para acceder al user
            <UserContext.Provider value={{user:user}} //recibe el user: user:user = user
            > 
                <HomePage/>
            </UserContext.Provider>
            
        );

        const preTag = screen.getByLabelText('pre'); //se agrego en la etique pre - aria-label="pre"
        //console.log(preTag.innerHTML); //null

        //evalua que etiqueta tenga el contenido del user.name
        expect(preTag.innerHTML).toContain(user.name);
        //evalua que etiqueta tenga el contenido del user.id pero debe ser String
        expect(preTag.innerHTML).toContain(`${user.id}`); //Forma 1
        //expect(preTag.innerHTML).toContain(user.id.toString()); //Forma 2
        
        //screen.debug();
    });
    
});