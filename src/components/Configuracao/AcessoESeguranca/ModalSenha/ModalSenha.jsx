import { useState } from "react";
import { FormGroup, FormLabel, InputData } from "../../../../global.styles";
import ModalTemplate from "../../../Modal/Modal"
import { PropTypes } from 'prop-types';
import { InputPassword, ModalSenhaContainer } from "./ModalSenha.styles";
import axios from "axios";
import { useAuth } from "../../../../context/AuthContext";
import Carregando from "../../../Carregando/Carregando";
import AlertTemplate from "../../../AlertComponents/AlertTemplate";
import SuccessAlert from "../../../AlertComponents/SuccessAlert/SuccessAlert";
import ErrorAlert from "../../../AlertComponents/ErrorAlert/ErrorAlert";

const ModalSenha = ({ handleClose }) => {
    const { headers, sessao } = useAuth();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [loadingTitle, setLoadingTitle] = useState('');

    const [alertIsOpen, setAlertIsOpen] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    const [errorCurrentPassword, setErrorCurrentPassword] = useState(false);
    const [errorNewPassword, setErrorNewPassword] = useState(true);
    const [errorConfirmNewPassword, setErrorConfirmNewPassword] = useState(true);

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    }

    const validateCurrentPassword = async () => {
        if(currentPassword !== ''){
            setIsLoading(true);
            setLoadingTitle('Validando senha atual');
            await axios.post('/api/users/validateCurrentPassword', {
                user_id: sessao.id, 
                password: currentPassword
            }, {
                headers
            }).then(res => {
                if(res.data.status === 200){
                    setAlertIsOpen(true);
                    setAlertTitle('Sucesso');
                    setAlertMessage(res.data.message);
                    setAlertType('success');

                    setIsLoading(false);
                    setErrorCurrentPassword(false);
                } else {
                    setAlertIsOpen(true);
                    setAlertTitle('Erro');
                    setAlertMessage(res.data.message);
                    setAlertType('error');

                    setIsLoading(false);
                    setErrorCurrentPassword(true);
                }
            })
        }
    }

    const handleNewPassword = (e) => {
        setNewPassword(e);

        if(!validatePassword(e)){
            setErrorNewPassword(true);
        } else {
            setErrorNewPassword(false);
        }
    }

    const handleConfirmPassword = (e) => {
        setConfirmNewPassword(e);

        if(e === newPassword){
            setErrorConfirmNewPassword(false);
        } else {
            setErrorConfirmNewPassword(true);
        }
    }

    const handleSubmit = async () => {
        if(!errorCurrentPassword && !errorNewPassword && !errorConfirmNewPassword){
            setIsLoading(true);
            setLoadingTitle('Alterando senha');
            await axios.post('/api/users/changePassword', {
                user_id: sessao.id,
                new_password: newPassword
            }, {
                headers
            }).then(res => {
                if(res.data.status === 200){
                    setAlertIsOpen(true);
                    setAlertTitle('Sucesso');
                    setAlertMessage(res.data.message);
                    setAlertType('success');

                    setIsLoading(false);
                    handleClose();
                }
            }).catch(() => {
                setAlertIsOpen(true);
                setAlertTitle('Erro');
                setAlertMessage('Erro ao alterar a senha');
                setAlertType('error');

                setIsLoading(false);
            })
        }
    }

    return (
        <>
            <ModalTemplate 
                funcSubmit={handleSubmit}
                onRequestClose={handleClose} 
                title="Alterar Senha" 
                modalFooter submitTitle="Alterar"
            >
                <ModalSenhaContainer>
                    <FormGroup>
                        <FormLabel>Confirme sua senha:</FormLabel>
                        <InputData 
                            type="password" 
                            value={currentPassword} 
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            onBlur={validateCurrentPassword}
                        />
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Nova senha:</FormLabel>
                        <InputPassword
                            erro={errorNewPassword}
                            type="password" 
                            value={newPassword} 
                            onChange={(e) => handleNewPassword(e.target.value)}  
                        />
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Confirme a nova senha:</FormLabel>
                        <InputPassword
                            erro={errorConfirmNewPassword}
                            type="password" 
                            value={confirmNewPassword} 
                            onChange={(e) => handleConfirmPassword(e.target.value)}  
                        />
                    </FormGroup>
                </ModalSenhaContainer>
            </ModalTemplate>

            {isLoading ? (
                <Carregando title={loadingTitle} />
            ) : (alertIsOpen && (
                <AlertTemplate title={alertTitle}>
                    {alertType === 'success' ? (
                        <SuccessAlert
                            message={alertMessage} 
                            close={() => {setAlertIsOpen(false);}} 
                        />
                    ) : (
                        <ErrorAlert message={alertMessage} close={() => setAlertIsOpen(false)} />
                    )}
                </AlertTemplate>
            ))}
        </>
        
    )
}

ModalSenha.propTypes = {
    handleClose: PropTypes.func.isRequired
}

export default ModalSenha;