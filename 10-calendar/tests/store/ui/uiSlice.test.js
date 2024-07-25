
import { onCloseDateModal, onOpenDateModal, uiSlice } from "../../../src/store/ui/uiSlice";


describe('Pruebas en uiSlice', () => {
    
    test('debe de regresar el estado por defecto', () => {
        
        //Al inicio la App en initialState isDateModalOpen por default es false, el modal esta cerrado
        expect(uiSlice.getInitialState()).toEqual({ isDateModalOpen: false })

    });


    test('debe de cambiar el isDateModalOpen correctamente', () => {

        //Guarda el estado inicial en state
        let state = uiSlice.getInitialState();

        //cambia el estado con reducer se envia el state y la acccion onOpenModal, para cambiar: isDateModalOpen es true
        state = uiSlice.reducer( state, onOpenDateModal() )

        //Valida que se halla cambia el estado de isDateModalOpen de false a true
        expect(state.isDateModalOpen).toBeTruthy();
        
        //Dispara la accion onCloseDateModal() para cerrar el modal: isDateModalOpen de true a false
        state = uiSlice.reducer( state, onCloseDateModal() );

        //Valida que se halla cambia el estado de isDateModalOpen de true a false
        expect(state.isDateModalOpen).toBeFalsy();
        
    });


});