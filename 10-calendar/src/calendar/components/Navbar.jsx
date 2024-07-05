import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../hooks"


export const Navbar = () => {

    const navigate = useNavigate(); //obtner la navegacion

    const { startLogout, user} = useAuthStore();

    //funcion Personalizada para salir redirige a /auth/login
    const logout = () => {
        startLogout(),
        navigate("/auth/login");
    }

    return (
        <>  
        <div className="navbar navbar-dark bg-dark mb-4 px-4">
            <span className="navbar-brand">
                <i className="fas fa-calendar-alt">
                    &nbsp; {/* separacion entre el icono calendar */}
                    {user.name}
                </i>
            </span>

            <button 
                className="btn btn-outline-danger"
                //onClick={startLogout} //code Prof
                onClick={ logout }
            >
                <i className="fas fa-sign-out-alt">
                &nbsp;
                    <span>
                        Salir
                    </span>
                </i>
            </button>

        </div>
        </>
    )
    }