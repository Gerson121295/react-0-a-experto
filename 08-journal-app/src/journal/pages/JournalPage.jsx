import { useDispatch, useSelector } from "react-redux"
import { IconButton, Typography } from "@mui/material"
import { JournalLayout } from "../layout/JournalLayout"
import { NoteView, NothingSelectedView } from "../../views"
import { AddOutlined } from "@mui/icons-material"
import { startNewNote } from "../../store/journal"


export const JournalPage = () => {

  const dispatch = useDispatch(); //dispatch funciones del thunks

   //con useSelector vamos al store y obtenemos state.journal del auth obtenemos el isSaving
  const {isSaving, active} = useSelector(state => state.journal);

  const onClickNewNote = () => {
    dispatch(startNewNote()); //dispatch funcion startNewNote definida en el thunks
  }

    return (
      <JournalLayout>
        {/* <Typography>
        Ctrl + shif + p y escribir Lorem y clic para insertar texto de relleno,  Ex magna irure officia ut incididunt tempor ut irure et eu ullamco amet.
        </Typography> */}

        {
          (active) ?  <NoteView />  //si nota esta activa (active= true) muestra: Noteview
          : <NothingSelectedView/> // si no, nota estará false muestra: <NothingSelectedView/>
        }

          <IconButton
            onClick={onClickNewNote}
            disabled={isSaving} //se deshabilita el btn si isSaving es true
            size="large"
            sx={{
              color:'white',
              backgroundColor:'error.main',
              ':hover': {backgroundColor:'error.main', opacity: 0.9},
              position: 'fixed',
              right: 50,
              bottom: 50
            }}
          >
            <AddOutlined sx={{fontSize:30}} />
          </IconButton>
      </JournalLayout>
    )
  }