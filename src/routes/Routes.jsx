import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../components/Login/Login";

const RouteElement = () => {
    return(
        <Router>
            <Routes>
                <Route path="/" Component={Login} />
            </Routes>
        </Router>
    )
}

export default RouteElement;