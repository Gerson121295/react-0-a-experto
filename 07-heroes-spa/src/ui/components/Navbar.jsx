import { Link, NavLink, useNavigate } from 'react-router-dom';


export const Navbar = () => {

    //Custom Hook - Para la navegacion a una ruta
    const navigate = useNavigate();

    //funcion para hacer Logout
    const onLogout = () => {
        navigate('/login', 
            {replace:true} //replace evita que user regrese al historial anterior(funciona en modo incognito)
        ); 
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-2">
            
            <Link 
                className="navbar-brand" 
                to="/"
            >
                Asociaciones
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav">

                    <NavLink 
                    //Navlink aplicar estilos automáticamente cuando la ruta coincide con la ubicación actual,
                    //className actua como una funcion recibe un boolean isActive, retorna un css 'nav-item nav-link' si isActive es true(sig. la ruta del NavLink coincide con la ruta actual(se resalta en blanco) ), si es false: retorna '' no hay estilo para el Navlink
                        className={ ({isActive}) => `nav-item nav-link ${isActive ? 'active' : '' } `} 
                        to="/marvel"
                    >
                        Marvel
                    </NavLink>

                    <NavLink 
                        className={ ({isActive}) => `nav-item nav-link ${isActive ? 'active' : '' } `} 
                        to="/dc"
                    >
                        DC
                    </NavLink>

                    <NavLink 
                        className={ ({isActive}) => `nav-item nav-link ${isActive ? 'active' : '' } `} 
                        to="/search"
                    >
                        Search
                    </NavLink>

                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                <ul className="navbar-nav ml-auto">
                    <span className='nav-item nav-link text-info'>
                        Gerson
                    </span>
                    <button 
                    className='nav-item nav-link btn'
                    onClick={onLogout}
                    >
                        Logout
                    </button>
                </ul>
            </div>
        </nav>
    )
}