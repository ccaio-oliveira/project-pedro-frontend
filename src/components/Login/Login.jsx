// resources/js/Pages/Login.jsx
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { PropTypes } from 'prop-types';

library.add(faEye, faEyeSlash);

const IsLogin = ({ changeComponent }) => {
    const { handleSetSessao } = useAuth();
    const [email, setEmailLogin] = useState('');
    const [senha_login, setSenhaLogin] = useState('');
    const [inputPasswordType, setInputPasswordType] = useState('password');
    const [inputPasswordIcon, setInputPasswordIcon] = useState(['far', 'eye-slash']);

    const [errorEmail, setErrorEmail] = useState(false);
    const [errorLogin, setErrorLogin] = useState(false);
    const navigate = useNavigate();

    const isEmailValid = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleLogin = async () => {

        if (!isEmailValid(email)) {
            setErrorEmail(true);
            return;
        }

        await axios.get('/sanctum/csrf-cookie');

        await axios.post('/api/login', {
            email,
            senha_login,
        })
        .then(res => {
            handleSetSessao({
                loggedin: true,
                bloqueado: false,
                token: res.data.token,
                ...res.data.data
            });

            if(res.data.status === 403){
                setErrorLogin(true);
                return;
            } else {
                setEmailLogin('');
                setSenhaLogin('');
                setErrorLogin(false);
                Cookies.set('sessaoSalva', JSON.stringify({
                    loggedin: true,
                    bloqueado: false,
                    token: res.data.token,
                    ...res.data.data
                }), {expires: 7});
                
                navigate('/relatorio?grau=prioridade');
            }
        })
        .catch(error => {
            console.log(error)
            setErrorLogin(true);
        })

    };

    const handleInputPasswordType = () => {
        if(inputPasswordType === 'password'){
            setInputPasswordType('text');
            setInputPasswordIcon(['far', 'eye']);
        } else {
            setInputPasswordType('password');
            setInputPasswordIcon(['far', 'eye-slash']);
        }
    }

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
                        <label>E-mail</label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmailLogin(e.target.value)}
                            placeholder='E-mail'
                        />
                        {errorEmail && (
                            <p>Email inválido</p>
                        )}
                    </div>
                    <div>
                        <label>Senha</label>
                        <input
                            type={inputPasswordType}
                            value={senha_login}
                            onChange={(e) => setSenhaLogin(e.target.value)}
                            placeholder='Senha'
                        />
                        <FontAwesomeIcon className='iconEye' icon={inputPasswordIcon} onClick={handleInputPasswordType} />
                        {errorLogin && (
                            <p>Usuário ou senha inválidos</p>
                        )}
                    </div>
                    <Link className='forgotPassword' onClick={() => changeComponent('forgot')}>Esqueci minha senha</Link>
                    <button type="button" onClick={handleLogin}>
                        Entrar
                    </button>
                </form>

                <div className="direitos">
                    <small>NOME © Todos os direitos reservados.</small>
                </div>
            </div>
        </div>
    );
};

IsLogin.prototype = {
    changeComponent: PropTypes.func.isRequired
}

export default IsLogin;
