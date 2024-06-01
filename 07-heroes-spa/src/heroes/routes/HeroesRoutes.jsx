
import { Navbar } from '../../ui/components/Navbar'
import { Outlet } from 'react-router-dom'

export const HeroesRoutes = () => {
  return (
    <>
        <Navbar />

        <div className="container">
        <Outlet 
        //AppRoutes define las rutas de la app y Outlet se utiliza dentro de los componentes de esas rutas para renderizar sus rutas hijas.
        />
        </div>
    </>
  )
}

