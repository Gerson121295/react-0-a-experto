import { AuthProvider } from './auth';
import {AppRoutes} from './router/AppRouter'

export const HeroesApp = () => {
  return (
    <AuthProvider> {/* AuthProvider compartira toda la informacion del Provider en todoa la aplicacion */}
      <AppRoutes/>
    </AuthProvider>
  );
}
