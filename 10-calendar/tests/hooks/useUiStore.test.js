
import { configureStore } from '@reduxjs/toolkit';
import { act, renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useUiStore } from '../../src/hooks/useUiStore';
import { uiSlice } from '../../src/store';

//MockStore para ejecutar el hook
const getMockStore = ( initialState ) => {
    return configureStore({
        reducer: {
            ui: uiSlice.reducer
        },
        preloadedState: {
            ui: { ...initialState }
        }
    })
}


describe('Pruebas en useUiStore', () => {

    test('debe de regresar los valores por defecto', () => {

        const mockStore = getMockStore({ isDateModalOpen: false }); //false o true para agregar el estado del store

        //se llama a renderizacion del hook con el provedor del store
        const { result } = renderHook( () => useUiStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        });

        expect(result.current).toEqual({
            isDateModalOpen: false,
            closeDateModal: expect.any(Function),
            openDateModal: expect.any(Function),
            toggleDateModal: expect.any(Function),
        });
        
    });

    test('openDateModal debe de colocar true en el isDateModalOpen', () => {
        
        const mockStore = getMockStore({ isDateModalOpen: false });

        //se llama a renderizacion del hook con el provedor del store
        const { result } = renderHook( () => useUiStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        });

        //llama la funcion result.currect y guarda el valor de openDateModal
        const { openDateModal } = result.current;

        //act para ejecutar la funcion
        act( () => {
            openDateModal();
        });

        expect( result.current.isDateModalOpen ).toBeTruthy();

    });

    //Esta prueba es igual a la anterior lo que cambia es isDateModalOpen es true
    test('closeDateModal debe de colocar false en isDateModalOpen', () => {
        
        const mockStore = getMockStore({ isDateModalOpen: true });

        //se llama a renderizacion del hook con el provedor del store
        const { result } = renderHook( () => useUiStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        });

         //act para ejecutar la funcion
        act(() => {
            result.current.closeDateModal(); //F2 de llamar la funcion es igual el resultado que el test anterior
        });

        expect( result.current.isDateModalOpen ).toBeFalsy();

    });


    test('toggleDateModal debe de cambiar el estado respectivamente', () => {
        
        const mockStore = getMockStore({ isDateModalOpen: true });
        const { result } = renderHook( () => useUiStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        });

        act(() => {
            result.current.toggleDateModal();
        });
        expect( result.current.isDateModalOpen ).toBeFalsy();
        

        //Prueba 2 esperar que sea verdad
        act(() => {
            result.current.toggleDateModal();
        });
        expect( result.current.isDateModalOpen ).toBeTruthy();

    });


    
});

