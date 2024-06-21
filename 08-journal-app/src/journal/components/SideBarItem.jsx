import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { setActiveNote } from "../../store/journal";

export const SideBarItem = ({ title='', body, id, date, imageUrls=[] }) => {//{note} -> //espera el title y body como props del padre SideBar

    const dispatch = useDispatch(); //dispatch funciones thunks y journalSlice

    //Al click la nota muestra su data
    const onClickNote = () => {
        dispatch(setActiveNote({title, body, id, date, imageUrls}));
    }

    //hook useMemo memoriza el valor de note.tittle y la funcion se ejecuta cada vez que cambie el note.title
    const newTitle = useMemo(() => {
        return title.length > 17 ? title.substring(0,17) + '...' //si title es > 17 caracteres se corta y se agrega ... para no escribir todo el titulo
                                : title; //si title es < 17 caracteres mostrar todo el title
    }, [title])

  return (
    <ListItem disablePadding>
      <ListItemButton 
        onClick={onClickNote} //funcion al dar clic en la nota muestra su data.
      >
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
}