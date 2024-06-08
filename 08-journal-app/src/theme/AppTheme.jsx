import { CssBaseline, ThemeProvider } from "@mui/material"
import { purpleTheme } from "./purpleTheme"


/*
Un Higher-Order Component (HOC) es una función en React que toma un componente y 
devuelve un nuevo componente con lógica adicional o comportamientos mejorados.
HOH es un componente que va a tener otros componentes hijos.
*/
//Este AppTheme se utiliza en <JournalApp> envolviendo el AppRouter que tiene toda la App
export const AppTheme = ({children}) => { //recibe un  HOC - componente Children es el App 

  return (
    <ThemeProvider theme={purpleTheme} //theme recibe el tema a mostrar en el App
    > 
        <CssBaseline /> 
        {children} {/* El children es el App */}
    </ThemeProvider>
  )

}


