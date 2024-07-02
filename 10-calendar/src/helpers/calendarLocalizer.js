
import { dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
//import enUS from 'date-fns/locale/en-US' //Idioma ingles del calendario
import esES from 'date-fns/locale/es' //Idioma español del calendario

//Idioma Español
const locales = {
    'es': esES,  //Ingles: 'en-US': enUS,
}

export const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  })


