import calendarApi from "../../api/calendarApi";

describe('Pruebas en el CalendarApi', () => {
    
    test('debe de tener la configuración por defecto', () => {

        // console.log(calendarApi);
         //console.log(process.env) //muestra la variable de entorno VITE_API_URL definida en .env  

         //Valida la ruta definida en variable de entorno .env sea la de por defecto baseURL definida en calendarApi.js 
        expect( calendarApi.defaults.baseURL ).toBe( process.env.VITE_API_URL );
    
    });

    
    test('debe de tener el x-token en el header de todas las peticiones ', async() => {

        const token = 'ABC-123-XYZ';

        localStorage.setItem('token', token ); //obtiene del localStorage con la clave 'token' el token almacenado

/*
        const res = await calendarApi
            .get("/auth")   //hace peticion get
            .then((res) => res)
            .catch((res) => res);
        expect(res.config.headers["x-token"]).toBe(token);
*/
    
        try {
            const res = await calendarApi.post('/auth', {  //hace peticion post - Autenticacion
                email: 'test@gmail.com',
                password: '123456',
        });
     
            expect(res.config.headers['x-token']).toBe( token );
     
            } catch (error) {
                console.log(error.data);
        };

    });


});