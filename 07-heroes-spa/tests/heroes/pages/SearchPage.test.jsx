import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom";
import { SearchPage } from "../../../src/heroes/pages/SearchPage";

//mock para simular que se navega a una ruta(establecida) cuando se llama la funcion mockedUseNavigate
const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}));


describe('Prueba al compoente SearchPage', () => {
  
    beforeEach(() => jest.clearAllMocks()); //limpiar cualquier mocked antes de cada prueba

    test('debe de mostrarse correctamente con valores por defecto', () => {
      
        //se desestructura de render el container
        const {container} = render(
            <MemoryRouter>
                <SearchPage/>
            </MemoryRouter>
        );

        //screen.debug();
        //asercion  container sea igual que la snapshot
        expect(container).toMatchSnapshot();
    })
    

    test('Debe de mostrar a Batman y el input con el valor del QueryString', () => {
        
         //se desestructura de render el container
        render(
            //ubicado en la pagina /search y la busqueda de img batman
            <MemoryRouter initialEntries={['/search?q=batman']}> 
                <SearchPage/>
            </MemoryRouter>
        );

         screen.debug();
        const input = screen.getByRole('textbox'); //obtiene el texto de la etiqueta textbox
        //valida si input tiene el valor de batman
        expect(input.value).toBe('batman');

        //img guarda el valor de la etiqueta img
        const img = screen.getByRole('img');

        //valida si img.src tiene la url de la img de batman
        expect(img.src).toContain('/heroes/dc-batman.jpg');
        //expect(img.src).toBe('http://localhost/heroes/dc-batman.jpg');
 
        //alertDanger guarda la data del div. se agrego al div la etiqueta aria-label='alert-danger'
        const alertDanger = screen.getByLabelText('alert-danger');
        //valida que el div tenga el style.display:none
        expect(alertDanger.style.display).toBe('none'); 
    });

    test('Debe de mostrar un error si no se encuentra el heroe', () => {
        
        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage/>
            </MemoryRouter>
        );

        //alertDanger guarda la data del div. se agrego al div la etiqueta aria-label='alert-danger'
        const alertDanger = screen.getByLabelText('alert-danger');

        //valida que el div tenga el style.display:''  si ya se busco un heroe pero no se encontro muestra esta alerta: el ''
        expect(alertDanger.style.display).toBe('');
    });


    test('Debe de llamar el navigate a la pantalla nueva', () => {
        
        const inputValue = 'superman';

        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage/>
            </MemoryRouter>
        );

       // screen.debug();

        //input guarda la daata almacenada en textbox
        const input = screen.getByRole('textbox');
        //llenar los valores del input. Target: name=searchText y value=inputValue(dato a ingresar al input)
        fireEvent.change(input, {target: {name: 'searchText', value: inputValue}});
        //console.log(input.value);  //ver que si se ingreso el valor de inputValue al input

        //en el form se agrego la key aria-label="form"
        const form = screen.getByRole('form'); 
        fireEvent.submit(form); //se envia el form 
        
        //Valida que mockedUseNavigate halla sido llamado con el heroe a buscar
        expect(mockedUseNavigate).toHaveBeenCalledWith(`?q=${inputValue}`);
    
    })

})
