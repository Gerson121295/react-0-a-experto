import { TurnedInNot } from "@mui/icons-material"
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { SideBarItem } from "./";


export const SideBar = ({ drawerWidth = 240}) => {

     //con useSelector vamos al store y obtenemos state.auth del auth obtenemos el displayName
    const {displayName} = useSelector(state => state.auth);
    const {notes} = useSelector(state => state.journal);

  return (
    <Box
        component='nav'
        sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
    >
        <Drawer
            variant='permanent' //temporary
            open //open={true}
            sx={{
                display: {xs: 'block'},
                '& .MuiDrawer-paper' : {boxSizing: 'border-box', width: drawerWidth}
            }}
        >
            <Toolbar>
                <Typography variant="h6" noWrap component='div'>
                    {displayName}
                </Typography>
            </Toolbar>
            <Divider />

            <List>
                {
                    notes.map(note => (
                        <SideBarItem 
                            key={note.id} 
                            //note={note} //envia objeto note
                            {...note} //se envia, esparce todo los campos de note
                        />
                    ))
                }
            </List>

        </Drawer>

    </Box>
  )
}

