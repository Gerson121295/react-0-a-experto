
//Personalizar el cuadro de evento o nota a guardar e

export const CalendarEvent = ({event}) => { //recibe como props el event

    //se desestructura event para obtener title y user
    const {title, user} = event;


    return (
        <>  
            {/* En la nota del calendar solo muestra el titulo y nombre del user que lo creo */}
            <strong>{title}</strong>
            <span> - {user.name}</span>
        </>
    )
    }