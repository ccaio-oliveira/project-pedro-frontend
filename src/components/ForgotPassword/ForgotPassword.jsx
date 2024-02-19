import { useState } from "react";
import { BtnLogin, BtnNext, ErrorP, FormElement, FormGroupLogin, FormLabelLogin, InfoForgotContainer, InfoForgotP, InputFormLogin, TextH1 } from "../../pages/Login/Login.styles";
import IsLogin from "../Login/Login";
import { PropTypes } from 'prop-types';
import axios from 'axios';
import AlertTemplate from "../AlertComponents/AlertTemplate";
import SuccessAlert from "../AlertComponents/SuccessAlert/SuccessAlert";
import ErrorAlert from "../AlertComponents/ErrorAlert/ErrorAlert";
import Carregando from "../Carregando/Carregando";

const ForgotPassword = ({ setView }) => {
    const [email, setEmailLogin] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingTitle, setIsLoadingTitle] = useState('');

    const [alertIsOpen, setAlertIsOpen] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    const [errorEmail, setErrorEmail] = useState(false);
    const [errorEmailText, setErrorEmailText] = useState('');

    const isEmailValid = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleForgotPassword = async () => {

        if (!isEmailValid(email)) {
            setErrorEmailText('E-mail inválido');
            setErrorEmail(true);
            return;
        }

        setIsLoading(true);
        setIsLoadingTitle('Enviando e-mail de recuperação...');

        await axios.post('/api/forgotPassword', {
            email
        })
        .then(res => {
            if(res.data.status === 200){
                setAlertIsOpen(true);
                setAlertTitle('Sucesso');
                setAlertMessage(res.data.message);
                setAlertType('success');

                setErrorEmail(false);
                setIsLoading(false);
            } else {
                setAlertIsOpen(true);
                setAlertTitle('Erro');
                setAlertMessage(res.data.message);
                setAlertType('error');

                setIsLoading(false);
            }
        })
        .catch(() => {
            setAlertIsOpen(true);
            setAlertTitle('Erro');
            setAlertMessage('Erro ao enviar e-mail de recuperação');
            setAlertType('error');

            setIsLoading(false);
        });
    }

    document.title = "Esqueceu a senha";

    return (
        <>
            <FormElement>
                <TextH1>Esqueci minha senha</TextH1>
                <FormGroupLogin>
                    <FormLabelLogin htmlFor="email">E-mail</FormLabelLogin>
                    <InputFormLogin
                        type="text"
                        value={email}
                        onChange={(e) => setEmailLogin(e.target.value)}
                        placeholder='E-mail'
                    />
                    {errorEmail && (
                        <ErrorP>{errorEmailText}</ErrorP>
                    )}
                </FormGroupLogin>
                <InfoForgotContainer>
                    <InfoForgotP>Enviaremos um código de verificação a este e-mail se corresponder a uma conta de usuário.</InfoForgotP>
                </InfoForgotContainer>
                <BtnNext type="button" onClick={handleForgotPassword}>
                    Avançar
                </BtnNext>
                <BtnLogin type="button" onClick={() => setView(<IsLogin changeComponent={setView} />)}>
                    Voltar
                </BtnLogin>
            </FormElement>

            {isLoading ? (
                <Carregando title={isLoadingTitle} />
            ) : (alertIsOpen && (
                    <AlertTemplate title={alertTitle}>
                        {alertType === 'success' 
                            ? (
                                <SuccessAlert message={alertMessage} close={() => setAlertIsOpen(false)} />
                            ) : (
                                <ErrorAlert message={alertMessage} close={() => setAlertIsOpen(false)} />
                            )}
                    </AlertTemplate>
                ))
            }
        </>
    )
}

ForgotPassword.propTypes = {
    setView: PropTypes.func.isRequired
}

export default ForgotPassword;