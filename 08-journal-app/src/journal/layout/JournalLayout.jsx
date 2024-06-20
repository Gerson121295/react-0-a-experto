import { Box, Toolbar } from "@mui/material"
import { Navbar, SideBar } from "../components";

const drawerWidth = 240;

export const JournalLayout = ({children}) => { //recibe como props children
  return (
    <Box 
      sx={{display:'flex'}}
      className="animate__animated animate__fadeIn animate__faster" //animacion de: https://animate.style/ definida en el head del index.html
    >

      <Navbar drawerWidth={drawerWidth}/>

      <SideBar drawerWidth={drawerWidth} />

      <Box 
        component='main'
        sx={{flexGrow:1, p:3 }}
        >
        
        <Toolbar />

        {children}
      </Box>

    </Box>


  )
}

