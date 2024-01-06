import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './../../pages/Login/Login';
import Dashboard from './../../pages/Dashboard/Dashboard';
import { AuthProvider } from './../../context/AuthContext';

const RouteElement = () => {
    return(
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" Component={Login} />
                    <Route path="/dashboard" Component={Dashboard} />
                </Routes>
            </AuthProvider>
        </Router>
    )
}

export default React.memo(RouteElement);