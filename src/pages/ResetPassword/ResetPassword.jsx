import { useEffect, useState } from "react";
import { BtnLogin, Direitos, FormElement, FormGroupLogin, FormLabelLogin, IconEye, ImgElement, InputFormLogin, LeftElement, LoginElement, RightElement, TextElement, TextH1, TextP } from "../Login/Login.styles";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Carregando from "../../components/Carregando/Carregando";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { ErrorReset } from "./ResetPassword.styles";
import AlertTemplate from "../../components/AlertComponents/AlertTemplate";
import SuccessAlert from "../../components/AlertComponents/SuccessAlert/SuccessAlert";
import ErrorAlert from "../../components/AlertComponents/ErrorAlert/ErrorAlert";

library.add(faEye, faEyeSlash);

const ResetPassword = () => {

    // input senha 
    const [senha, setSenha] = useState('');
    const [errorSenha, setErrorSenha] = useState(false);
    const [inputPasswordType, setInputPasswordType] = useState('password');
    const [inputPasswordIcon, setInputPasswordIcon] = useState('eye-slash');

    // input confirmar senha
    const [confirmar_senha, setConfirmarSenha] = useState('');
    const [errorSenhaConf, setErrorSenhaConf] = useState(false);
    const [inputPasswordTypeConf, setInputPasswordTypeConf] = useState('password');
    const [inputPasswordIconConf, setInputPasswordIconConf] = useState('eye-slash');

    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingTitle, setIsLoadingTitle] = useState('');

    const [alertIsOpen, setAlertIsOpen] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    const navigate = useNavigate();

    const location = useLocation();

    const parametros = new URLSearchParams(location.search);

    const checkToken = async () => {
        const token = parametros.get('token');

        setIsLoadingTitle('Verificando token...');

        await axios.post(`/api/resetPassword/checkToken`, { token })
        .then((response) => {

            if(response.data.status === 200){
                setIsLoading(false);
            } else {
                setIsLoadingTitle('Token inválido');
            }
        })
    }

    const handleInputPasswordType = (input) => {

        if(input === 'senha') {
            if (inputPasswordType === 'password') {
                setInputPasswordType('text');
                setInputPasswordIcon('eye');
            } else {
                setInputPasswordType('password');
                setInputPasswordIcon('eye-slash');
            }
        } else {
            if (inputPasswordTypeConf === 'password') {
                setInputPasswordTypeConf('text');
                setInputPasswordIconConf('eye');
            } else {
                setInputPasswordTypeConf('password');
                setInputPasswordIconConf('eye-slash');
            }
        }
    }

    const handleResetPassword = async () => {
        const token = parametros.get('token');

        setIsLoading(true);
        setIsLoadingTitle('Redefinindo senha...');

        await axios.post(`/api/resetPassword`, { token, senha })
        .then((response) => {
            setAlertIsOpen(true);
            setAlertTitle('Sucesso');
            setAlertMessage('Senha redefinida com sucesso');
            setAlertType('success');

            setIsLoading(false);

            setTimeout(() => {
                navigate('/');
            }, 5000);
        })
        .catch(() => {
            setAlertIsOpen(true);
            setAlertTitle('Erro');
            setAlertMessage('Erro ao redefinir senha');
            setAlertType('error');

            setIsLoading(false);
        })
    }

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    }

    const handleSenha = (input, e) => {

        if(input === 'senha') {
            setSenha(e);
            if (!validatePassword(e) || e.length < 6 ) {
                setErrorSenha(true);
            } else {
                setErrorSenha(false);
            }
        } else {
            setConfirmarSenha(e);
            if (e !== senha) {
                setErrorSenhaConf(true);
            } else {
                setErrorSenhaConf(false);
            }
        }
    }

    useEffect(() => {
        document.title = "Redefinir senha";
        checkToken();
    }, [])

    return(
        <>
            {isLoading ? (
                <Carregando title={isLoadingTitle} />
            ) : (
                <LoginElement>
                    <LeftElement>
                        <ImgElement src="images/medicine2.png" alt="Medicine 2" />
                        <TextElement>
                            <TextH1>Se conecte com sua equipe e salve vidas!</TextH1>
                            <TextP>Mande solicitações de relatórios, agende consultas e gerencie o seu tempo.</TextP>
                        </TextElement>
                    </LeftElement>

                    <RightElement>
                        <FormElement>
                            <TextH1>Redefinir Senha</TextH1>
                            <FormGroupLogin>
                                <FormLabelLogin>Nova senha</FormLabelLogin>
                                <InputFormLogin
                                    type={inputPasswordType}
                                    value={senha}
                                    onChange={(e) => handleSenha('senha', e.target.value)}
                                    placeholder='Senha'
                                />
                                <IconEye icon={inputPasswordIcon} onClick={() => handleInputPasswordType('senha')} />
                                {errorSenha && (
                                    <ErrorReset>
                                        A senha deve conter no mínimo 8 caracteres, sendo eles ao menos 1 número, 
                                        1 letra maiúscula e 1 caractere especial.
                                    </ErrorReset>
                                )}
                            </FormGroupLogin>
                            <FormGroupLogin>
                                <FormLabelLogin>Confirmar nova senha</FormLabelLogin>
                                <InputFormLogin
                                    type={inputPasswordTypeConf}
                                    value={confirmar_senha}
                                    onChange={(e) => handleSenha('conf', e.target.value)}
                                    placeholder='Senha'
                                />
                                <IconEye icon={inputPasswordIconConf} onClick={() => handleInputPasswordType('conf')} />
                                {errorSenhaConf && (
                                    <ErrorReset>A confirmação de senha deve ser igual a nova senha</ErrorReset>
                                )}
                            </FormGroupLogin>
                            <BtnLogin type="button" onClick={handleResetPassword}>
                                Confirmar
                            </BtnLogin>
                        </FormElement>

                        <Direitos>
                            <small>NOME © Todos os direitos reservados.</small>
                        </Direitos>
                    </RightElement>
                </LoginElement>
            )}

            {alertIsOpen && (
                <AlertTemplate title={alertTitle}>
                    {alertType === 'success' 
                        ? (
                            <SuccessAlert message={alertMessage} close={() => setAlertIsOpen(false)} />
                        ) : (
                            <ErrorAlert message={alertMessage} close={() => setAlertIsOpen(false)} />
                        )}
                </AlertTemplate>
            )}
        </>
    )
}

export default ResetPassword;