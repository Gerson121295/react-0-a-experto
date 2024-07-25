

//Hook para todo lo relacionado con uiStore

import { useDispatch, useSelector } from "react-redux";
import { onCloseDateModal, onOpenDateModal } from "../store";

export const useUiStore = () => {

    //useSelector accedemos al store y obtener los estados definidos ahi como el ui ->reducers de uiSlice
    const {isDateModalOpen} = useSelector(state => state.ui);

    //Dispatch para acceder a los reducer de uiSlice mediante el store
    const dispatch = useDispatch();

    //Funcion para abrir el modal
    const openDateModal = () => {
        dispatch( onOpenDateModal()); //dispatcha la funcion onOpenDateModal definida del uiSlice mediante el Store
    }

    //Funcion para cerrar el modal
    const closeDateModal = () => {
        dispatch(onCloseDateModal());
    }

    //Toggle: Si esta abierto el modal, al dar clic afuera se cierre y si no esta abierto al dar 2 clic en el evento o nota se abra
    const toggleDateModal = () => {
        //(isDateModalOpen) ? openDateModal() : closeDateModal();
        (isDateModalOpen) ? closeDateModal() : openDateModal();
    }

    //propiedades y metodos o funciones que retorna el Hook
return {
    //* propiedades
    isDateModalOpen,

    //* metodos
    openDateModal,
    closeDateModal,
    toggleDateModal,
}


}

