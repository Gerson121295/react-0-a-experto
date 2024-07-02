import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks"

export const FabAddNew = () => {

    //Se desetructura el hook useUiStore para obtener la func. opeDateModal
    const { openDateModal } = useUiStore();

    const { setActiveEvent } = useCalendarStore();

    //Maneja el abrir el modal al precionar el boton para agregar nueva nota o evento
    const handleClickNew = () => {

        //Limpiar el formulario antes de abrirlo  reseteando sus valores o estado 
        setActiveEvent(
            {
                title: '',
                notes: '',
                start: new Date(), //fecha inicia el evento
                end: addHours(new Date(), 2), //al new Date se le suma 2 horas
                bgColor: '#fafafa',
                user: {
                    _id: '123',
                    name: 'Fernando'
                }
            }
        );

        //Abre el form
        openDateModal();
    }

    return (
       
        <button 
            className="btn btn-primary fab"
            onClick={handleClickNew} //abre el modal al dar clic en el boton
        >
            <i className="fas fa-plus"></i>
        </button>
    )
    }