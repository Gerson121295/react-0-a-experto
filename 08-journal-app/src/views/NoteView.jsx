import { useEffect, useMemo, useRef } from "react"
import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, Input, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../views"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "../hooks/useForm"
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from "../store/journal"
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css';


export const NoteView = () => {

    const dispatch = useDispatch(); //despacha funciones del store

    //con useselector va a store y obtiene state.journal se desestructura y se optiene: active
   const {active: note, messageSaved, isSaving}= useSelector(state => state.journal);

   //customHook useForm para crear formulario de editar la nota, recibe objeto nota(con sus campos) para campos del Form
   const {body, title, date, onInputChange, formState} = useForm(note);

   //useMemo esta funcion se ejecuta cada vez que cambie date, se recalcula el nuevo Date
   const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
   }, [date])

   //este fileInputRef mantiene la referencia html de nuestro input(oculto) de tipo file
   //const fileInputRef = useRef(); //no se uso

   useEffect(() => {
        dispatch(setActiveNote(formState)); //setActiveNote activa la nota al darle clic y se puede ver en pantalla su data
   }, [formState]) //se ejecuta cada vez que cambie el formState(formState tiene todas las propiedades de la nota)

   useEffect(() => {
        if(messageSaved.length > 0){//valida que messageSaved no sea un String vacio '' para mostrar la alert
            Swal.fire('Nota actualizada', messageSaved, 'success');
        }
   }, [messageSaved])//se dispara cuando cambie el estado(texto o String vacio '') de messageSave


   const onSaveNote = () => {
    dispatch(startSaveNote());
   }

   const onFileInputChange = ({target}) => {
    if(target.files === 0) return; //si no se eligio imagenes no hace nada, return
    dispatch(startUploadingFiles(target.files));
    console.log('Subiendo archivos');
   }

   const onDelete = () => {
    dispatch(startDeletingNote());
   }
   
  return (
    <Grid
    className='animate__animated animate__fadeIn animate__faster' //animacion de: https://animate.style/ definida en el head del index.html
        container
        direction='row' 
        justifyContent='space-between' 
        alignItems='center'
        sx={{mb:1}}
    >
        <Grid item>
            <Typography fontSize={39} fontWeight='light'>{dateString}</Typography>
        </Grid>

        <Grid item>
             <IconButton
                    component="label"
                    color="primary"
                    disabled={isSaving} //se desabilita si se esta subiendo una img
                    sx={{ p: 1 }}
            >
                    <input 
                        type="file" //tipo archivo
                        multiple //permite seleccionar multiples imagenes
                        hidden //oculta el input
                        onChange={onFileInputChange}/>    
                    <UploadOutlined />
            </IconButton> 
                
            <Button 
                disabled={isSaving} //desabilita si isSaving es true
                onClick={onSaveNote}
                color="primary" 
                sx={{padding:2}}>
                <SaveOutlined sx={{fontSize: 30, mr: 1 }} />
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese un titulo"
                label='Titulo'
                sx={{border:'none', mb: 1}}
                name="title"
                value={title}
                onChange={onInputChange}
            />
            <TextField
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="¿Qué sucedio hoy?"
                minRows={5}
                name="body"
                value={body}
                onChange={onInputChange}
            />
        </Grid>

        <Grid
            container
            justifyContent='end'
        >
            <Button
                onClick={onDelete}
                sx={{mt:2}}
                color="error"
            >
                <DeleteOutline/>
                Borrar
            </Button>
        </Grid>

        <ImageGallery
            //active: note tiene actualizado los estados por lo que se le manda la imageUrls
            images={note.imageUrls} //se envia como prop images al hijo ImageGallery para que muestre las imagenes de las notas
        />

    </Grid>
  )
}

