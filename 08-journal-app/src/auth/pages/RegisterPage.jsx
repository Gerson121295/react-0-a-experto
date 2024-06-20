import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'
import { startCreatingUserWithEmailPassword } from '../../store/auth'

//Datos del form
const formData = {
  email: '',
  password: '',
  displayName: ''
}

//Validacion de los campos
const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe de tener una @'],
  password: [(value) => value.length >=6, 'El password debe de tener mas de 6 letras'],
  displayName: [(value) => value.length >=1, 'El nombre es obligatorio'],
}


export const RegisterPage = () => {

  const dispatch = useDispatch(); //para dispatch las funciones definidas en store/auth/thunks

  const [formSubmitted, setFormSubmitted] = useState(false);

  //con useSelector vamos al store y obtenemos state.auth del auth obtenemos el status y errorMessage
  const {status, errorMessage} = useSelector(state => state.auth);

  //useMemo meroriza cuando el status es igual a 'checking' devuelve un boolean, la dependencia es [status], si el estatus cambia un valor diferente a 'checking' se vuelve a calcular, si no cambia no se vuelve a calcular
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status] );


  //se desestructura el hook useForm para extraer email, password, etc. y se inicializa useForm con datos que tendra el Form, y el formValidations
  const {formState, displayName, email, password, onInputChange,  
        isFormValid, displayNameValid, emailValid, passwordValid} = useForm(formData, formValidations);

       
  const onSubmit = (event) => {
    event.preventDefault(); //evita que al enviar el formulario se recargue la pagina
    setFormSubmitted(true);

    if(!isFormValid) return; //si no es valido el form return no hace nada

    //Dispatch la funcion definida en store/auth/thunks la cual recibe un objeto con los datos del User a crear
    dispatch(startCreatingUserWithEmailPassword(formState));
  }
  
  
  return (
    //llama al component AuthLayout renderizarse y se le envia el title y el children(form)
    <AuthLayout 
      title='Crear cuenta'
      >
       {/*  <h1>Form Valid {isFormValid ? 'Valido' : 'Incorrect'}</h1> */}

      <form 
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster" //animacion de: https://animate.style/ definida en el head del index.html
      >
          <Grid container>

            <Grid item xs={12} sx={{mt:2}}> {/* pantallas pequeñas: xs={12} pantallas medianas md={6} estilos: sx */}
              <TextField
                label="Nombre Completo" 
                type="text" 
                placeholder="Nombre Completo"
                fullWidth 
                name="displayName"
                value={displayName}
                onChange={onInputChange}
                error={ !!displayNameValid && formSubmitted } //error={true} //si hay error de validacion el campo cambia de color rojo
                helperText={ displayNameValid } //helperText="El nombre es obligatorio" //texto de alerta del campo cuando da error
              />
            </Grid>

            <Grid item xs={12} sx={{mt:2}}> {/* pantallas pequeñas: xs={12} pantallas medianas md={6} estilos: sx */}
              <TextField
                label="Correo" 
                type="email" 
                placeholder="correo23@gmail.com"
                fullWidth 
                name="email"
                value={email}
                onChange={onInputChange}
                error={ !!emailValid && formSubmitted }
                helperText={ emailValid } 
              />
            </Grid>

            <Grid item xs={12} sx={{mt:2}} >
              <TextField
                label="Contraseña" 
                type="password" 
                placeholder="Contraseña"
                fullWidth 
                name="password"
                value={password}
                onChange={onInputChange}
                error={ !!passwordValid && formSubmitted }
                helperText={ passwordValid } 
              />
            </Grid>

            <Grid container spacing={2} sx={{mb:2, mt:1 }}>{/* mb margin botton, mt margin top */}
              
              <Grid 
                item 
                xs={12}
                display={errorMessage ? '' : 'none' } //si no hay nada muestra el display vacio, : si hay es none (no lo muestra, no aparece).  !!errorMessage(doble negacion) es igual a errorMessage
              >
                <Alert severity='error'>{errorMessage}</Alert>
              </Grid>
              
              <Grid item xs={12}>
                <Button 
                  disabled={isCheckingAuthentication} //boton estará desabilitado cuando se esta registrando el user, cuando el estado es 'checking'
                  type='submit' //al dar clic en el boton Crear cuenta envia el formulario
                  variant="contained"
                  fullWidth
                >
                  Crear Cuenta
                </Button>
              </Grid>

            </Grid>

            <Grid container 
              direction='row' 
              justifyContent='end'
            >
              <Typography sx={{mr:1}}>¿Ya tienes una cuenta?</Typography>
              <Link 
                component={RouterLink} //Link de react-router-dom llamado como RouterLink debido a que Material UI ya usamos un Link
                color='inherit'
                to="/auth/login" //redirige a ruta register
              >
                Ingresar
              </Link>

            </Grid>

          </Grid>
        </form>

      

    </AuthLayout>

      
  )
}
