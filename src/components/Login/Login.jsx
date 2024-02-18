// resources/js/Pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import Cookies from 'js-cookie';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { PropTypes } from 'prop-types';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import { BtnLogin, ErrorP, ForgotPasswordP, FormElement, FormGroupLogin, FormLabelLogin, IconEye, InputFormLogin, TextH1 } from '../../pages/Login/Login.styles';

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

    const handleEmailChange = (e) => {
        setEmailLogin(e.target.value);
        setErrorEmail(false);
    };

    const handleLogin = async () => {

        if (!isEmailValid(email)) {
            setErrorEmail(true);
            return;
        }

        await axios.get('/sanctum/csrf-cookie').then(() => {
            axios.post('/api/login', {
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
            .catch(() => {
                setErrorLogin(true);
            })
        });

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
        <FormElement>
            <TextH1>Acessar conta</TextH1>
            <FormGroupLogin>
                <FormLabelLogin>E-mail</FormLabelLogin>
                <InputFormLogin
                    type="text"
                    value={email}
                    onChange={(e) => handleEmailChange(e)}
                    placeholder='E-mail'
                />
                {errorEmail && (
                    <ErrorP>Email inválido</ErrorP>
                )}
            </FormGroupLogin>
            <FormGroupLogin>
                <FormLabelLogin>Senha</FormLabelLogin>
                <InputFormLogin
                    type={inputPasswordType}
                    value={senha_login}
                    onChange={(e) => setSenhaLogin(e.target.value)}
                    placeholder='Senha'
                />
                <IconEye icon={inputPasswordIcon} onClick={handleInputPasswordType} />
                {errorLogin && (
                    <ErrorP>Usuário ou senha inválidos</ErrorP>
                )}
            </FormGroupLogin>
            <ForgotPasswordP className='forgotPassword' onClick={() => changeComponent(<ForgotPassword setView={changeComponent} />)}>Esqueci minha senha</ForgotPasswordP>
            <BtnLogin type="button" onClick={handleLogin}>
                Entrar
            </BtnLogin>
        </FormElement>
    );
};

IsLogin.propTypes = {
    changeComponent: PropTypes.func.isRequired
}

export default IsLogin;
