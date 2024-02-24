import { useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import axios from "axios";
import ModalTemplate from "../../../Modal/Modal";
import { RegisterUserContainer, RegisterUserErrorP, RegisterUserFormGroup, RegisterUserInput, RegisterUserLabel } from "../RegisterUser.styles";
import Carregando from "../../../Carregando/Carregando";
import AlertTemplate from "../../../AlertComponents/AlertTemplate";
import SuccessAlert from "../../../AlertComponents/SuccessAlert/SuccessAlert";
import ErrorAlert from "../../../AlertComponents/ErrorAlert/ErrorAlert";
import { PropTypes } from 'prop-types';

const SecretaryModal = ({ handleClose }) => {
    const { headers, sessao } = useAuth();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [errorGeral, setErrorGeral] = useState('');
    const [errorFullName, setErrorFullName] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorWhatsappNumber, setErrorWhatsappNumber] = useState('');
    const [errorPhoneNumber, setErrorPhoneNumber] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const [alertIsOpen, setAlertIsOpen] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    const validateFullName = (e) => {
        setFullName(e);

        if (e.length < 3) {
            setErrorFullName(true);
        } else {
            setErrorFullName(false);
        }
    }

    const isEmailValid = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateEmail = (e) => {
        setEmail(e);

        if (!isEmailValid(e)) {
            setErrorEmail(true);
        } else {
            setErrorEmail(false);
        }
    }

    const isPasswordValid = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    }

    const validatePassword = (e) => {
        setPassword(e);

        if (!isPasswordValid(e)) {
            setErrorPassword(true);
        } else {
            setErrorPassword(false);
        }
    }

    const maskPhone = (e, tipo) => {
        let value = e.replace(/\D/g, '');
        const valueLength = value.length;

        if (valueLength === 11) {
            value = value.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (valueLength === 10) {
            value = value.replace(/^(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        }

        if(valueLength > 11) return;

        if(tipo === 'whatsapp'){
            setWhatsappNumber(value);
            setErrorWhatsappNumber(false);
        } else {
            setPhoneNumber(value);
            setErrorPhoneNumber(false);
        }
    }

    const validateFields = () => {
        if (fullName.length < 3) {
            setErrorFullName(true);
        } else {
            setErrorFullName(false);
        }

        if (!isEmailValid(email)) {
            setErrorEmail(true);
        } else {
            setErrorEmail(false);
        }

        if (!isPasswordValid(password)) {
            setErrorPassword(true);
        } else {
            setErrorPassword(false);
        }

        if (whatsappNumber.length < 14) {
            setErrorWhatsappNumber(true);
        } else {
            setErrorWhatsappNumber(false);
        }

        if (phoneNumber.length < 14) {
            setErrorPhoneNumber(true);
        } else {
            setErrorPhoneNumber(false);
        }

        if (errorFullName || errorEmail || errorPassword || errorWhatsappNumber || errorPhoneNumber) {
            setErrorGeral(true);
        } else {
            setErrorGeral(false);
        }
    }

    const handleSubmit = async () => {
        validateFields();
        
        if (errorGeral) {
            return;
        }
        
        setIsLoading(true);

        await axios.post(`/api/users/registerSec`, {
            fullName,
            email,
            password,
            whatsappNumber,
            phoneNumber,
            doctorId: sessao.id
        }, {
            headers
        }).then((res) => {
            setIsLoading(false);
            
            setAlertIsOpen(true);
            setAlertTitle('Sucesso');
            setAlertMessage(res.data.message);
            setAlertType('success');
        }).catch(() => {
            setIsLoading(false);
            
            setAlertIsOpen(true);
            setAlertTitle('Erro');
            setAlertMessage('Erro ao cadastrar secretário(a)');
            setAlertType('error');
        })
    }

    return (
        <>
            <ModalTemplate
                onRequestClose={handleClose}
                title='Cadastrar Secretário(a)'
                modalFooter
                submitTitle={'Salvar'}
                funcSubmit={handleSubmit}
            >
                <RegisterUserContainer>
                    <RegisterUserFormGroup>
                        <RegisterUserLabel>Nome</RegisterUserLabel>
                        <RegisterUserInput 
                            type='text' 
                            placeholder='Nome completo' 
                            value={fullName} 
                            onChange={e => validateFullName(e.target.value)}
                        />
                        {errorFullName && <RegisterUserErrorP>Nome Inválido</RegisterUserErrorP>}
                    </RegisterUserFormGroup>

                    <RegisterUserFormGroup>
                        <RegisterUserLabel>Email</RegisterUserLabel>
                        <RegisterUserInput 
                            type='email' 
                            placeholder='Email' 
                            value={email} 
                            onChange={e => validateEmail(e.target.value)} 
                        />
                        {errorEmail && <RegisterUserErrorP>Email Inválido</RegisterUserErrorP>}
                    </RegisterUserFormGroup>

                    <RegisterUserFormGroup>
                        <RegisterUserLabel>Senha</RegisterUserLabel>
                        <RegisterUserInput 
                            type='password' 
                            placeholder='Senha' 
                            value={password} 
                            onChange={e => validatePassword(e.target.value)}
                        />
                        {errorPassword && (
                            <RegisterUserErrorP>
                                A senha deve conter no mínimo 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial
                            </RegisterUserErrorP>
                        )}
                    </RegisterUserFormGroup>

                    <RegisterUserFormGroup>
                        <RegisterUserLabel>Número do whatsapp</RegisterUserLabel>
                        <RegisterUserInput 
                            type='text' 
                            placeholder='Número para contato' 
                            value={whatsappNumber} 
                            onChange={e => maskPhone(e.target.value, 'whatsapp')} 
                        />
                        {errorWhatsappNumber && <RegisterUserErrorP>Insira o número de telefone</RegisterUserErrorP>}
                    </RegisterUserFormGroup>

                    <RegisterUserFormGroup>
                        <RegisterUserLabel>Número do telefone</RegisterUserLabel>
                        <RegisterUserInput 
                            type='text' 
                            placeholder='Telefone para contato' 
                            value={phoneNumber} 
                            onChange={e => maskPhone(e.target.value, 'phone')} 
                        />
                        {errorPhoneNumber && <RegisterUserErrorP>Insira o número de telefone</RegisterUserErrorP>}
                    </RegisterUserFormGroup>
                </RegisterUserContainer>
            </ModalTemplate>

            {isLoading ? (
                <Carregando title="Cadastrando secretário(a)" />
            ) : (alertIsOpen && (
                <AlertTemplate title={alertTitle}>
                    {alertType === 'success' ? (
                        <SuccessAlert message={alertMessage} close={() => {setAlertIsOpen(false); handleClose();}} />
                    ) : (
                        <ErrorAlert message={alertMessage} close={() => setAlertIsOpen(false)} />
                    )}
                </AlertTemplate>
            ))}
        </>
    )
}

SecretaryModal.propTypes = {
    handleClose: PropTypes.func.isRequired,
}

export default SecretaryModal;