// resources/js/Pages/Login.jsx
import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import './login.css';
import { useAuth } from '../../context/AuthContext';
import Cookies from 'js-cookie';

const Login = () => {
    const { sessao, handleSetSessao, handleSetHash, hash, handleValidaSessao } = useAuth();
    const [usuario_login, setUsuarioLogin] = useState('');
    const [senha_login, setSenhaLogin] = useState('');

    const [errorLogin, setErrorLogin] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        await axios.get('/sanctum/csrf-cookie');

        await axios.post('/api/login', {
            usuario_login,
            senha_login,
        })
        .then(res => {
            handleSetSessao({
                loggedin: true,
                bloqueado: false,
                token: res.data.token,
                ...res.data.data
            });

            setUsuarioLogin('');
            setSenhaLogin('');
            setErrorLogin(false);
            
            navigate('/dashboard');
        })
        .catch(error => {
            setErrorLogin(true);
        })

    };

    return (
        <div className="loginElement">
            <div className="left">
                <img src="images/medicine2.png" alt="Medicine 2" />
                <div className="text">
                    <h1>Se conecte com sua equipe e salve vidas!</h1>
                    <p>Mande solicitações de relatórios, agende consultas e gerencie o seu tempo.</p>
                </div>
            </div>
            <div className="right">
                <form>
                    <h1>Acessar conta</h1>
                    <div>
                        <label>Usuário</label>
                        <input
                            type="text"
                            value={usuario_login}
                            onChange={(e) => setUsuarioLogin(e.target.value)}
                            placeholder='Usuário'
                        />
                    </div>
                    <div>
                        <label>Senha</label>
                        <input
                            type="text"
                            value={senha_login}
                            onChange={(e) => setSenhaLogin(e.target.value)}
                            placeholder='Senha'
                        />
                        {errorLogin && (
                            <p>Usuário ou senha inválidos</p>
                        )}
                    </div>
                    <Link to="/forgotPassword" className='forgotPassword'>Esqueci minha senha</Link>
                    <button type="button" onClick={handleLogin}>
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
