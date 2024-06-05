import { types } from "../../../src/auth/types/types";


describe('Prueba a types/types.js', () => {
  test('debe de regresar estos types', () => {
    
    //Valida que los types definidos en types.js sean estos 
   expect(types).toEqual({
     login: '[Auth] Login',
     logout: '[Auth] Logout',
    });

  });
  
});
