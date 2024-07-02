import { Provider } from "react-redux"
import { AppRouter } from "./router"
import { store } from "./store"

export const CalendarApp = () => {
    return (
        <> 
        <Provider store={store}> {/* Se agrega el store en el punto mas alto de la App */}
            <AppRouter />
        </Provider>
        </>
    )
    }