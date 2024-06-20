import { LoginOutlined, MenuOutlined } from "@mui/icons-material"
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material"
import { useDispatch } from "react-redux";
import { startLogout } from "../../store/auth";


export const Navbar = ({drawerWidth = 240}) => { //recibe como props del padre el drawerWidth ancho del elemento por defecto 240
  
  const dispatch = useDispatch(); //dispatch para despacchar las func de store/auth/thunks

  const onLogout = () => {
    dispatch(startLogout()); //Ejecuta funcion para hacer logout
  }
  
  return (
    <AppBar 
        position="fixed"
        sx={{
            width:{sm: `calc(100% - ${drawerWidth}px)`}, //ancho para pantallas medianas, en pequeñas no deja espacio para el sidebar
            ml: {sm: `${drawerWidth}px`}
        }}
    >
      <Toolbar>
        <IconButton
            color="inherit"
            edge="start"
            sx={{mr:2, display: {sm:'none'} }} //icono solo aparece en pantallas pequeñas no en medianas
        >
            <MenuOutlined />
        </IconButton>

        <Grid container direction='row' justifyContent='space-between' alignItems='center'>
            <Typography variant="h6" noWrap component='div'>JournalApp</Typography>

            <IconButton 
              color="error"
              onClick={onLogout}
            >
                <LoginOutlined/>
            </IconButton>
        </Grid>

      </Toolbar>
    </AppBar>
  )
}


