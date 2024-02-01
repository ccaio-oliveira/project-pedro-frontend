import { useState } from "react";
import { BtnLogin, BtnNext, ErrorP, FormElement, FormGroupLogin, FormLabelLogin, InfoForgotContainer, InputFormLogin, TextH1 } from "../../pages/Login/Login.styles";
import IsLogin from "../Login/Login";
import { PropTypes } from 'prop-types';
import axios from 'axios';

const ForgotPassword = ({ setView }) => {
    const [email, setEmailLogin] = useState('');

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

        await axios.post('/api/forgotPassword', {
            email
        })
        .then(res => {
            if(res.data.status === 200){
                setView(<IsLogin changeComponent={setView} />);
            } else {
                setErrorEmailText(res.data.message);
                setErrorEmail(true);
            }
        })
    }


    return (
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
                <p>Enviaremos um código de verificação a este e-mail se corresponder a uma conta de usuário.</p>
            </InfoForgotContainer>
            <BtnNext type="button" onClick={handleForgotPassword}>
                Avançar
            </BtnNext>
            <BtnLogin type="button" onClick={() => setView(<IsLogin changeComponent={setView} />)}>
                Voltar
            </BtnLogin>
        </FormElement>
    )
}

ForgotPassword.propTypes = {
    setView: PropTypes.func.isRequired
}

export default ForgotPassword;