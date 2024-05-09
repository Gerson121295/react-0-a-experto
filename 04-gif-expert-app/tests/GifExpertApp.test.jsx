import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import GifExpertApp from "../src/GifExpertApp"



describe('Prueba al component ', () => {

    const newCategory = 'Dragon Ball'
 
    test('debe hacer match con el snapshot', () => {

        const { container} = render( <GifExpertApp /> );
        expect( container ).toMatchSnapshot();
 
    });

    /*
    test('debe agregar una categoria', () => {     
        // Renderizar el componente
        render( <GifExpertApp /> );
    
        // Obtener el input y el form
        const input = screen.getByRole('textbox');
        const form = screen.getByRole('form');
    
        // Agregar la primera categoría
        fireEvent.input(input, { target: { value: 'New Category' } });
        fireEvent.submit(form);
    
        // Limpiar el valor del input
        fireEvent.change(input, { target: { value: '' } });
    
        // Agregar la segunda categoría
        fireEvent.input(input, { target: { value: 'Another Category' } });
        fireEvent.submit(form);
    
        // Verificar que solo se haya agregado una nueva categoría
        const categoryElements = screen.getAllByTestId('category');
        expect(categoryElements.length).toBe(1);
    });
*/

test('no debe agregar una nueva categoria si la categoria ya existe', () => {
    const { container } = render(<GifExpertApp />);

    const input = screen.getByRole('textbox');
    const form = screen.getByRole('form');

    fireEvent.input(input, { target: { value: newCategory }});
    fireEvent.submit(form);

    waitFor(() => {
        const cardGrids = container.querySelectorAll('.card-grid');
        expect(cardGrids.length).toBe(1);
    });
});

});