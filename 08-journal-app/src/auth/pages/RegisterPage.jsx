import { Link as RouterLink } from 'react-router-dom'
import { Google } from "@mui/icons-material"
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout'

export const RegisterPage = () => {
  return (
    //llama al component AuthLayout renderizarse y se le envia el title y el children(form)
    <AuthLayout 
      title='Crear cuenta'
      >
      <form >
          <Grid container>

            <Grid item xs={12} sx={{mt:2}}> {/* pantallas pequeñas: xs={12} pantallas medianas md={6} estilos: sx */}
              <TextField
                label="Nombre Completo" 
                type="text" 
                placeholder="Nombre Completo"
                fullWidth 
              />
            </Grid>

            <Grid item xs={12} sx={{mt:2}}> {/* pantallas pequeñas: xs={12} pantallas medianas md={6} estilos: sx */}
              <TextField
                label="Correo" 
                type="email" 
                placeholder="corre123@gmail.com"
                fullWidth 
              />
            </Grid>

            <Grid item xs={12} sx={{mt:2}} >
              <TextField
                label="Contraseña" 
                type="password" 
                placeholder="Contraseña"
                fullWidth 
              />
            </Grid>

            <Grid container spacing={2} sx={{mb:2, mt:1 }}>{/* mb margin botton, mt margin top */}
              <Grid item xs={12}>
                <Button variant="contained"
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
