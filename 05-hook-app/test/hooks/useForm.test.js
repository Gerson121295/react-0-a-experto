import { renderHook } from "@testing-library/react"
import { useForm } from "../../src/hooks/useForm";
import { act } from "react";

describe('Pruebas en useForm', () => {

    const initialForm = {
        name:'Fernando',
        email: 'fer@gmail.com'
    }

    test('debe de regresar los valores por defecto', () => {

        //renderHook - Renderizar el hook useForm y desestructuramos para obtener result(lo que retorna el hook)
        const {result} = renderHook(() => useForm(initialForm)); 

        //Para ver lo que retorna el hook useForm
        //console.log(result.current);
        
        //Evalua los valores que se retorna sean los esperados
        expect(result.current).toEqual({
            name: initialForm.name,
            email: initialForm.email,
            formState: initialForm,
            onInputChange: expect.any(Function),
            onResetForm: expect.any(Function),
        });
    });

    test('debe de cambiar el nombre del formulario', () => {

        const newValue = 'Juan';

        //renderHook - Renderizar el hook useForm y desestructuramos para obtener result(lo que retorna el hook)
        const {result} = renderHook(() => useForm(initialForm));

        const { onInputChange} = result.current;

        act(() => {
            onInputChange({target: {name:'name', value: newValue}}); //target define el campo(name) objetivo y se estable un nuevo valor a ese campo del form
        });

        //Evalua que el campo name del form tenga el nuevo valor newValue
        expect(result.current.name).toBe(newValue);
        expect(result.current.formState.name).toBe(newValue);
    });

    test('debe de realizar el reset del formulario', () => {

        const newValue = 'Juan';

        //renderHook - Renderizar el hook useForm y desestructuramos para obtener result(lo que retorna el hook)
        const {result} = renderHook(() => useForm(initialForm));

        const { onInputChange, onResetForm} = result.current;

        act(() => {
            onInputChange({target: {name:'name', value: newValue}}); //target define el campo(name) objetivo y se estable un nuevo valor a ese campo del form
            onResetForm(); //resetea el formulario a los valores inciales
        });

        //Evalua que el campo name del form tenga el valor inicial del form
        expect(result.current.name).toBe(initialForm.name);
        expect(result.current.formState.name).toBe(initialForm.name);
    });
    
});