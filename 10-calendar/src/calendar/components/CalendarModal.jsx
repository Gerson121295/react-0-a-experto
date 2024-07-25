import { addHours, differenceInSeconds } from "date-fns";
import { useEffect, useMemo, useState } from "react";

import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css';

import Modal from "react-modal";

import DatePicker, {registerLocale} from "react-datepicker"; //Selector de fechas en el form, el registerLocale es para cambiar el idioma a español
import "react-datepicker/dist/react-datepicker.css"; //estilo del Selector de fechas en el form
import { es } from 'date-fns/locale/es'; //cambiar a idioma español el selector de fechas
import { useCalendarStore, useUiStore } from "../../hooks/";
import { getEnvVariables } from "../../helpers";

registerLocale('es', es) //Se define el codigo del idioma a cambiar Español


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };


  //Si es diferente del ambiente de 'test' se puede ejecutar la linea Modal.setAppElement esto xq en test no lo reconoce. 
  //if(getEnvVariables().VITE_MODE !== 'test'){
//Para que el modal se sobreponga ante todo
  Modal.setAppElement('#root'); //recibe el id root del body del index.html
  //}

export const CalendarModal = () => {

  //se extrae propiedades y funciones desestructurando el hook useUiStore
    const {isDateModalOpen, closeDateModal} = useUiStore();

    //se extrae propiedades y funciones desestructurando el hook useCalendarStore
    const {activeEvent, startSavingEvent} = useCalendarStore();

    //Estado de validacion del Form cuando el usuario ha intentado enviar el form(false aun no se ha hecho el envio del form)
    const [formSubmitted, setFormSubmitted] = useState(false); //se inicializa en false

    //Estado del EventForm
    const [formValues, setFormValues] = useState(
        //Estado inical del formValues
        {
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2), //+2 hrs to actual date.
        }
    );

    //UseMemo memoriza el valor de formValues.title y formSubmited ejecuta la funcion si cambia estos valores
    const titleClass = useMemo(() => {
            if(!formSubmitted) return ''; //si es diferente formSubmitted el form no se ha disparado retorna un string vacio en la clase(no se muestra el estilo).
      
            return (formValues.title.length > 0 ) ? '' //no muestra nada, vacio  //'is-valid' //el title no esta vacio muestra check ok verde
                                                  : 'is-invalid'; //el title esta vacio muestra check alerta roja
    }, [formValues.title, formSubmitted])


    //Func. Para establecer los nuevos valores que el User agrega al Form
    const onInputChanged = ({target}) => { //se recibe el (event) pero se desestructura {} el event para obtener el {target} el valor del campo
        setFormValues({
            ...formValues, //se esparce todos los valores del Form(formValues) anteriores, para no sobreescribir(titulo, notes, start, end), solo sobreescribir el que tenga el valor del target.name
            [target.name] : target.value   //a target.name se le agrega el nuevo valor target.value
        })
    }

    //useEffect se dispara cuando cambie activeEvent
    useEffect(() => {
      //setActiveEvent no es igual(diferente de) a null
      if(activeEvent !== null){ 
        setFormValues({
          ...activeEvent //los valores del form se carga con los valores de evento o nota seleccionada
        });
      }
    }, [activeEvent]); //activeEvent es la condicion
    

    //La nueva fecha de inicio y final (start y end) establecida por el User
    const onDateChanged = (event, changing) => { //event es la nueva fecha, changing será para(start end)
        setFormValues({
            ...formValues, //sparce los valores anteriores del formValues para no  perderlos y solo actualizar los nuevos
            [changing] : event  //para changing(start,end) se establece la nueva Date
        })
    }

    //Funcion para cerrar el modal
    const onCloseModal = () => {
        //console.log('Cerrando modal');
        closeDateModal();
    }

    const onSubmit = async(event) => {
      event.preventDefault(); //para que al enviar el formulario no se recargue la pagina
      setFormSubmitted(true); //se hizo el intento de enviar el form

      //definir la fecha final debe ser mayor que la inicial: fechaEnd-FechaStart = +Positivo
      const difference = differenceInSeconds(formValues.end, formValues.start); //fecha final - fecha inicial
      //console.log({difference})
      if(isNaN(difference) || difference <= 0 ){ //Si difference no es un Numero o la differencia es <= 0 (la fecha final es < a la inicial ) no hace nada, return
        Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error'); //alerta de notificacion
        return;
      }

      if(formValues.title.length <=0 ) return; //si el title esta vacio no hace nada return

      //si el formulario es llenado correctamente
      console.log(formValues);
      //Swal.fire('Form enviado', 'El formulario fue enviado exitosamente', 'success'); //alerta de notificacion
      //Remover errores en pantalla

      //Empieza a guardar el evento o nota al calendario -recibe los valores del form 
      await startSavingEvent(formValues); 

      //Cerrar el modal
      closeDateModal();
      
      //Reset Validacion si el usuario ha intentado enviar el form es false
      setFormSubmitted(false);
    }


    return (
      <Modal
        isOpen={isDateModalOpen} //abrir modal
        //onAfterOpen={afterOpenModal}
        onRequestClose={onCloseModal} //cerrar modal
        style={customStyles}

        //estilos personalizados del modal
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={200} //tiempo para cerrar modal
      >
        {/* Contenido a mostrar en el modal */}
        <h1> Nuevo evento </h1>
        <hr />

        <form 
          className="container"
          onSubmit={onSubmit}
        >
          <div className="form-group mb-2">
            <label>Fecha y hora inicio</label>
           {/*  <input className="form-control" placeholder="Fecha inicio" /> */}
           
           <DatePicker  //User puede seleccionar fechas y hora en el form
                className="form-control" //estilo de bootstrap
                selected={formValues.start} 
                onChange={(event) => onDateChanged(event, 'start')} //se envia el event(fecha) al campo start
                
                dateFormat="Pp" //para que aparezcan las hrs.
                showTimeSelect//Seleccionar las hrs

                locale="es" //define el idioma español
                timeCaption="Hora" //cambia la palabra time a Hora
            />

          </div>

          <div className="form-group mb-2">
            <label>Fecha y hora fin</label>
           {/*  <input className="form-control" placeholder="Fecha inicio" /> */}
            <DatePicker  //User puede seleccionar fechas y hora en el form
                className="form-control"
                minDate={formValues.start} //no debe seleccionar una fecha menor a la del Inicio
                selected={formValues.end} 
                onChange={(event) => onDateChanged(event, 'end')} //se envia el event(fecha) al campo end
                
                dateFormat="Pp" //para que aparezcan las hrs.
                showTimeSelect//Seleccionar las hrs

                locale="es" //define el idioma español
                timeCaption="Hora" //cambia la palabra time a Hora
            />
          </div>

          <hr />
          <div className="form-group mb-2">
            <label>Titulo y notas</label>
            <input
              type="text"
              className= {`form-control ${titleClass}`}  
              placeholder="Título del evento"
              name="title"
              autoComplete="off"

              //Agrega valor del formulario - formValues
              value={formValues.title}
              onChange={onInputChanged} //Para establecer los nuevos valores que el User agregue al Form

            />
            <small id="emailHelp" className="form-text text-muted">
              Una descripción corta
            </small>
          </div>

          <div className="form-group mb-2">
            <textarea
              type="text"
              className="form-control"
              placeholder="Notas"
              rows="5"
              name="notes"

               //Agrega valor del formulario - formValues
               value={formValues.notes}
               onChange={onInputChanged} //Para establecer los nuevos valores que el User agregue al Form

            ></textarea>
            <small id="emailHelp" className="form-text text-muted">
              Información adicional
            </small>
          </div>

          <button type="submit" className="btn btn-outline-primary btn-block">
            <i className="far fa-save"></i>
            <span> Guardar</span>
          </button>
        </form>
      </Modal>
    );
    }