import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Google } from "@mui/icons-material"
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth'

const formData = {
  email: '',
  password: '',
}

export const LoginPage = () => {

  //con useSelector vamos al store y obtenemos state.auth del auth obtenemos el status y errorMessage
  const {status, errorMessage} = useSelector(state => state.auth);
  
  const dispatch = useDispatch(); //dispatch

  //se desestructura el hook useForm para extraer email, password, etc. y se inicializa useForm con datos que tendra el Form
  const {email, password, onInputChange} = useForm(formData);

  //useMemo meroriza cuando el status es igual a 'checking' devuelve un boolean, la dependencia es [status], si el estatus cambia el valor de 'checking' se vuelve a calcular, si no cambia no se vuelve a calcular
  const isAuthentication = useMemo(() => status === 'checking', [status] );

  const onSubmit = (event) => {
    event.preventDefault(); //evita que al enviar el formulario se recargue la pagina
    //console.log({email, password});
  
    //dispatch el thunks startLoginWithEmailPassword - definida en store/auth/thunks
    dispatch(startLoginWithEmailPassword({email, password})); //Se le envia email y password que son los que se insertan en el form

  }

  const onGoogleSignIn = () => {
    console.log('onGooGleSignIn')
    //dispatch el thunks startGoogleSignIn
    dispatch(startGoogleSignIn());
  }

  return (
    //llama al component AuthLayout renderizarse y se le envia el title y el children(form)
    <AuthLayout 
      title='Login'
      >
      <form 
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster" //animacion de: https://animate.style/ definida en el head del index.html  
      >
          <Grid container>
            <Grid item xs={12} sx={{mt:2}}> {/* pantallas pequeñas: xs={12} pantallas medianas md={6} estilos: sx */}
              <TextField
                label="Correo" 
                type="email" 
                placeholder="corre123@gmail.com"
                fullWidth 
                name='email'
                value={email}
                onChange={onInputChange}
              />
            </Grid>

            <Grid item xs={12} sx={{mt:2}} >
              <TextField
                label="Contraseña" 
                type="password" 
                placeholder="Contraseña"
                fullWidth 
                name='password'
                value={password}
                onChange={onInputChange}
              />
            </Grid>

            <Grid 
              container
              display={errorMessage ? '' : 'none' } //si no hay nada muestra el display vacio, : si hay es none (no lo muestra, no aparece).  !!errorMessage(doble negacion) es igual a errorMessage
              sx={{mt:1}} //mt:1, mb:1  margin botton margin top
            >
              <Grid 
                item 
                xs={12}
              >
                <Alert severity='error'>{errorMessage}</Alert>
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{mb:2, mt:1 }}>{/* mb margin botton, mt margin top */}
              <Grid item xs={12} sm={6}>
                <Button 
                  disabled={isAuthentication} //boton estará desabilitado cuando se esta autenticando el user, el estado es 'checking'
                  type="submit"//dispara el envio del form
                  variant="contained"
                  fullWidth
                >
                  Login
                </Button>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Button 
                  disabled={isAuthentication} //boton estará desabilitado cuando se esta autenticando el user, el estado es 'checking'
                  variant="contained"
                  fullWidth
                  onClick={onGoogleSignIn}
                >
                  <Google /> {/* Icono de Google */}
                  <Typography sx={{ml:1}}>Google</Typography>
                </Button>
              </Grid>

            </Grid>

            <Grid container 
              direction='row' 
              justifyContent='end'
            >
              <Link 
                component={RouterLink} //Link de react-router-dom llamado como RouterLink debido a que Material UI ya usamos un Link
                color='inherit'
                to="/auth/register" //redirige a ruta register
              >
                Crear una cuenta
              </Link>

            </Grid>

          </Grid>
        </form>

      

    </AuthLayout>

      
  )
}
