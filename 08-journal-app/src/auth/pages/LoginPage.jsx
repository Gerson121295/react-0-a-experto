import { Link as RouterLink } from 'react-router-dom'
import { Google } from "@mui/icons-material"
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout'

export const LoginPage = () => {
  return (
    //llama al component AuthLayout renderizarse y se le envia el title y el children(form)
    <AuthLayout 
      title='Login'
      >
      <form >
          <Grid container>
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
              <Grid item xs={12} sm={6}>
                <Button variant="contained"
                  fullWidth
                >
                  Login
                </Button>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Button variant="contained"
                  fullWidth
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
