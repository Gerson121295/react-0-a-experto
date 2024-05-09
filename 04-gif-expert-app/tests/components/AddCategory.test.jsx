import { fireEvent, render, screen } from "@testing-library/react";
import AddCategory from "../../src/components/AddCategory";



describe(' Prueba al component AddCategory.jsx', () => {
    test('Debe de cambiar el valor de la caja de texto', () => {

        render( //renderizamos el component AddCategory.jsx
            <AddCategory 
                onNewCategory = { () => {} } //se envia la props onNewCategory
            />
        );
        
        //busca un elemento textbox dentro del html del compoente AddCategory.jsx
        const input = screen.getByRole('textbox'); 

        //Disparamos evento: Establecer valor - un evento luego de tener el elemento input le ingresamos valores con {target: {value:'Saitama'}}
        fireEvent.input(input, {target: {value:'Saitama'}});

        //Asercion si el input tiene el valor de 'Saitama'
        expect(input.value).toBe('Saitama');

        //muestra en pantalla el component que se esta evaluando con sus datos que se ingresan
        screen.debug(); 

    });

    test('Debe de llamar onNewCategory si el input tiene un valor', () => {

        const inputValue = 'Saitama';

        const onNewCategory = jest.fn(); //jest functions. Mock -Funcion ficticia

        render( //renderizamos el component AddCategory.jsx
        <AddCategory 
            onNewCategory = { onNewCategory} //se envia la props onNewCategory
        />
    );

    //busca un elemento textbox dentro del html del componente AddCategory.jsx
    const input = screen.getByRole('textbox'); 
    const form = screen.getByRole('form'); //se agrego:  aria-label="form"   en el form del html de AddCategory para poder encontrar y hacer pruebas

    //Disparar eventos
    //Disparamos un evento: Establecer valor - luego de tener el elemento input le ingresamos valores con {target: {value:'Saitama'}}
    fireEvent.input(input, {target: {value:'Saitama'}});

    //Disparamos el evento Submit y le enviamos el form
    fireEvent.submit(form);
    //screen.debug();
    
    //Luego de hacer el submit el formulario debe estar vacio se limpia
    expect(input.value).toBe('');

    //Verifica que la funcion onNewCategory se halla llamado
    expect(onNewCategory).toHaveBeenCalled();

    //Verifica que la funcion onNewCategory se halla llamado 1 vez
    expect(onNewCategory).toHaveBeenCalledTimes(1);

    //Verifica que la funcion onNewCategory se halla sido llamado con el valor del inputvalue
    expect(onNewCategory).toHaveBeenCalledWith(inputValue);
    });

    
    test('No Debe de llamar el onNewCategory si el input esta vacio ', () => {
        
        //Para esta prueba es necesario solo para pruebas ir al component AddCategory.jsx y
        // agregar useState('') vacio ya que por defecto tiene useState('OnePunch') -> const [inputValue, setInputValue] = useState('');

        const onNewCategory = jest.fn(); //jest functions. Mock -Funcion ficticia

        render( //renderizamos el component AddCategory.jsx
        <AddCategory 
            onNewCategory = { onNewCategory} //se envia la props onNewCategory
        />
    );

    const form = screen.getByRole('form'); //se agrego:  aria-label="form"   en el form del html de AddCategory para poder encontrar y hacer pruebas

    //Disparar eventos
    fireEvent.submit(form);

    //Validamos que el onNewCategory  jest.fn() no halla sido llamado
    expect(onNewCategory).toHaveBeenCalledTimes(0); //forma 1
    expect(onNewCategory).not.toHaveBeenCalled(); //forma 2

    }); 


});
