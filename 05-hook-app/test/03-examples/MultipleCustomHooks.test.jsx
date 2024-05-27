import { fireEvent, render, screen } from "@testing-library/react"
import { MultipleCustomHooks } from "../../src/03-examples/MultipleCustomHooks"
import { useFetch } from "../../src/hooks/useFetch";
import { useCounter } from "../../src/hooks/useCounter";

//mock del useFetch
jest.mock('../../src/hooks/useFetch')

//mock del useCounter
jest.mock('../../src/hooks/useCounter')


describe('Pruebas en el componente MultipleCustomHooks', () => {

/*    //test sin agregar el: jest.mock('../../src/hooks/useFetch')
    test('Debe mostrar el component por defecto o su estado inicial', () => {

        //Renderizamos el component: MultipleCustomHooks
        render(<MultipleCustomHooks/>); 

        //evalua que en texto optenido con screen el codigo tenga el texto:  Cargando...
        expect(screen.getByText('Cargando...'));
        expect(screen.getByText('Informacion de Pokémon'));

        // del codigo html del screen buscar un boton con nombre Siguiente
        const nextButton = screen.getByRole('button', {name: 'Siguiente'})

        //evalua si el boton con nombre Siguiente tiene el disable en true
        //console.log(nextButton.disabled)
        expect(nextButton.disabled).toBeTruthy(); //pregunta si el Boton Siguiente este en true

        //Muestra el component como el estado actualmente del componente(estructura body - html)
        //screen.debug();
    });
*/

    const mockIncrement = jest.fn(); //establecer simulacion de funciones de un hook useCounter para funcion Increment

    //Simulacion - Estado del hook useCounter
    useCounter.mockReturnValue({
        counter: 1,
        increment: mockIncrement
    })

    //antes de cada prueba limpiar los mocks
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Debe mostrar el component por defecto o su estado inicial', () => {
        
        //Estado del hook cuando es el componente por defecto
        useFetch.mockReturnValue(
            {  
                data: null, 
                isLoading: true, 
                hasError:null 
            }
        )

        //Renderizamos el component: MultipleCustomHooks
        render(<MultipleCustomHooks/>); 

        //evalua que en texto optenido con screen el codigo tenga el texto:  Cargando...
        expect(screen.getByText('Cargando...'));
        expect(screen.getByText('Informacion de Pokémon'));

        // del codigo html del screen buscar un boton con nombre Siguiente
        const nextButton = screen.getByRole('button', {name: 'Siguiente'})

        //evalua si el boton con nombre Siguiente tiene el disable en true
        //console.log(nextButton.disabled)
        expect(nextButton.disabled).toBeTruthy(); //pregunta si el Boton Siguiente este en true

        //Muestra el component como el estado actualmente del componente(estructura body - html)
        //screen.debug();
    });

    test('Debe de mostrar un Pokemon', () => {

        //Estado del hook cuando en el componente ya se ha mandado una peticion de los pokemon
        useFetch.mockReturnValue({ 
                //simula la data del pokemon que se recibe luego de hacer la peticion al hook useFetch 
                data:{
                        id:1,
                        name:"Charmander",
                        sprites: {
                            front_default: "front_default",
                            front_shiny: "front_shiny",
                            back_default: "back_default",
                            back_shiny: "back_shiny",
                        }
                      },  
                isLoading: false, 
                hasError: null,
            }
        );

        //Renderizamos el component: MultipleCustomHooks
        render(<MultipleCustomHooks/>); 
        //screen.debug();
        //al hacer la peticion evalua que haya un texto llamado "Charmander"
        expect(screen.getByText('Charmander')).toBeTruthy(); 

        // del codigo html del screen buscar un boton con nombre Siguiente
        const nextButton = screen.getByRole('button', {name: 'Siguiente'})
        //evalua si el boton con nombre Siguiente tiene el disable en false
        expect(nextButton.disabled).toBeFalsy(); //pregunta si el Boton Siguiente este en true

    });

    test('Debe de llamar a la funcion de incremenentar para mostrar el siguiente Pokemon', () => {

        //Estado del hook cuando en el componente ya se ha mandado una peticion de los pokemon
        useFetch.mockReturnValue({ 
                //simula la data del pokemon que se recibe luego de hacer la peticion al hook useFetch 
                data:{
                        id:1,
                        name:"Charmander",
                        sprites: {
                            front_default: "front_default",
                            front_shiny: "front_shiny",
                            back_default: "back_default",
                            back_shiny: "back_shiny",
                        }
                      },  
                isLoading: false, 
                hasError: null,
            }
        );

        //Renderizamos el component: MultipleCustomHooks
        render(<MultipleCustomHooks/>); 
        //screen.debug();
    
        // del codigo html del screen buscar un boton con nombre Siguiente
        const nextButton = screen.getByRole('button', {name: 'Siguiente'})
        
        //Simular que dar clic al boton nextButton
        fireEvent.click(nextButton);
        expect(mockIncrement).toHaveBeenCalled(); //al dar clic en siguiente la funcion mockIncrement debio llamarse

    });

})