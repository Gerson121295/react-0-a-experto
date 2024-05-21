import { Navigate, Route, Routes } from "react-router-dom"
import { UserProvider } from "./context/UserProvider"
import { HomePage } from "./HomePage"
import { LoginPage } from "./LoginPage"
import { AboutPages } from "./AboutPages"
import { Navbar } from "./Navbar"



export const MainApp = () => {
  return (
    <>
        <UserProvider> {/* Se llama al UserProvider en el main por lo que cualquier otro component podra accedes a su data */}
            <Navbar />
            <hr />

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="about" element={<AboutPages />} />

                {/* Para Rutas no especificada */}
                {/* <Route path="/*" element={<LoginPage />}/> */}
                <Route path="/*" element={ <Navigate to ="/about" />} />
            </Routes>
        </UserProvider>
    </>
  )
}

