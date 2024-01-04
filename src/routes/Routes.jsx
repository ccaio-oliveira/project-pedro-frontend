import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../components/Login/Login";
import Dashboard from "../components/Dashboard/Dashboard";

const RouteElement = () => {
    return(
        <Router>
            <Routes>
                <Route path="/" Component={Login} />
                <Route path="/dashboard" Component={Dashboard} />
            </Routes>
        </Router>
    )
}

export default RouteElement;