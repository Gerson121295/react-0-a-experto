import { fireEvent, render, screen } from '@testing-library/react';
import { FabDelete } from '../../../../src/calendar/components/FabDelete';
import { useCalendarStore } from '../../../../src/hooks/useCalendarStore';


jest.mock('../../../../src/hooks/useCalendarStore');

describe('Pruebas en <FabDelete />', () => {

    const mockStartDeletingEvent = jest.fn(); //para simular una funcion en jest

    //permite borrar datos antes de cada prueba
    beforeEach( ()=> jest.clearAllMocks() );
    beforeEach( ()=> jest.clearAllTimers() );

    
    test('debe de mostrar el componente correctamente', () => {

        useCalendarStore.mockReturnValue({
            hasEventSelected: false
        });
        
        render(<FabDelete />);

        const btn = screen.getByLabelText('btn-delete'); //btn-delete es la key para test en FabDelete
        // console.log(btn.classList.toString());

        //valida que btn.classList contenga 'btn', 'btn-danger', 'fab-danger'
        expect( btn.classList ).toContain('btn');
        expect( btn.classList ).toContain('btn-danger');
        expect( btn.classList ).toContain('fab-danger');

        //Valida que el btn tenga el style en none
        expect( btn.style.display ).toBe('none');
        
    });

    test('debe de mostrar el botón si hay un evento activo', () => {

        useCalendarStore.mockReturnValue({
            hasEventSelected: true
        });
        
        render(<FabDelete />);

        const btn = screen.getByLabelText('btn-delete');
        // console.log(btn.classList.toString());

         //Valida que el btn tenga el style en string vacio ''
        expect( btn.style.display ).toBe('');
        
    });

    test('debe de llamar startDeletingEvent si hay evento activo', () => {

        useCalendarStore.mockReturnValue({
            hasEventSelected: true,
            startDeletingEvent: mockStartDeletingEvent
        });
        
        render(<FabDelete />);

        const btn = screen.getByLabelText('btn-delete');
        fireEvent.click( btn ); //dispara el evento

        // valida que la func. mockStartDeletingEvent halla sido llamado
        expect( mockStartDeletingEvent ).toHaveBeenCalledWith();
        
    });

});
