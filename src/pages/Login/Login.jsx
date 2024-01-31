// resources/js/Pages/Login.jsx
import { useState } from 'react';
import './login.css';
import IsLogin from '../../components/Login/Login';

const Login = () => {
    const handleComponent = (component) => {
        setComponent(component);
    }

    const [component, setComponent] = useState(<IsLogin changeComponent={handleComponent} />);

    return (
        <>
            {component}
        </>
    );
};

export default Login;
