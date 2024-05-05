import { getSaludo } from "../../src/base-pruebas/02-template-string";


describe('Pruebas en 02-template-string.js', () => {
    test('getSaludo debe retornar "Hola Fernando"', () => {
      const name = 'Fernando'; //nombre que se enviara a la funcion
      const message = getSaludo(name); //llamamos a la funcion getSaludo
      expect(message).toBe(`Hola ${name}`); //valida si message tiene lo que retorna la funcion getSaludo()
    })
    
})
