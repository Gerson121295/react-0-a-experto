import { useCalendarStore, useUiStore} from "../../hooks"

export const FabDelete = () => {

    //Se desetructura el hook useCalendarStore para obtener la func. startDeletingEvent
    const { startDeletingEvent, hasEventSelected } = useCalendarStore();

    const {isDateModalOpen} = useUiStore();

    //Maneja el abrir el modal al precionar el boton para agregar nueva nota o evento
    const handleDelete = () => {
        startDeletingEvent();
    }

    return (
       
        <button 
            className="btn btn-danger fab-danger"
            onClick={handleDelete} //abre el modal al dar clic en el boton
            style={{
                
                //tiene evento seleccionado y no esta abierto el modal, "" VACIO, no regresar nada, muestra el boton. : "none" si no tiene evento seleccionado oculta el boton.
                //display: hasEventSelected && !isDateModalOpen ? "" : "none" //forma de validar 1: isDateModalOpen viene del useUiStore, para que aparezca boton del modal debe estar cerrado
                display: hasEventSelected ? '' : "none" //forma de validar 2 mejor: hasEventSelected valida que el event seleccionado tenga id(si tiene id existe y aparece el boton eliminar)
            }}
        >
            <i className="fas fa-trash-alt"></i>
        </button>
    )
    }