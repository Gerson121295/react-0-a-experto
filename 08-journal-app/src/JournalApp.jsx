
import { AppRouter } from "./router/AppRouter"
import { AppTheme } from "./theme/AppTheme"


export const JournalApp = () => {
    return (
          <AppTheme> {/* Aplica el tema de Material UI */}
            <AppRouter />
          </AppTheme>
            
      )
    }
