import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './../../pages/Login/Login';
import Dashboard from './../../pages/Dashboard/Dashboard';
import { AuthProvider } from './../../context/AuthContext';
import Perfil from "../../pages/Perfil/Perfil";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import Contato from "../../pages/Contato/Contato";
import Configuracoes from "../../pages/Configuracoes/Configuracoes";

const RouteElement = () => {
    return(
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" Component={Login} />
                    <Route path="/relatorio" Component={Dashboard} />
                    <Route path="/perfil" Component={Perfil} />
                    <Route path="/contato" Component={Contato} />
                    <Route path="/agenda" Component={Perfil} />
                    <Route path="/configuracao" Component={Configuracoes} />
                    <Route path="/resetPassword" Component={ResetPassword} />
                </Routes>
            </AuthProvider>
        </Router>
    )
}

export default React.memo(RouteElement);