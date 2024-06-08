
import { IconButton, Typography } from "@mui/material"
import { JournalLayout } from "../layout/JournalLayout"
import { NoteView, NothingSelectedView } from "../../views"
import { AddOutlined } from "@mui/icons-material"


export const JournalPage = () => {
    return (
      <JournalLayout>
        {/* <Typography>
        Ctrl + shif + p y escribir Lorem y clic para insertar texto de relleno,  Ex magna irure officia ut incididunt tempor ut irure et eu ullamco amet.
        </Typography> */}
        <NothingSelectedView/>
          {/* <NoteView /> */}

          <IconButton
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