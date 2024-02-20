import { useState } from 'react';
import ModalTemplate from './../../../Modal/Modal';
import { InputData } from '../../../../global.styles';
import axios from 'axios';
import { useAuth } from '../../../../context/AuthContext';
import Carregando from '../../../Carregando/Carregando';
import AlertTemplate from '../../../AlertComponents/AlertTemplate';
import SuccessAlert from '../../../AlertComponents/SuccessAlert/SuccessAlert';
import ErrorAlert from '../../../AlertComponents/ErrorAlert/ErrorAlert';
import { PropTypes } from 'prop-types';

const ModalEmail = ({ handleClose, email }) => {
    const { headers } = useAuth();
    const [valueEmail, setValueEmail] = useState(email);

    const [isLoading, setIsLoading] = useState(false);

    const [alertIsOpen, setAlertIsOpen] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    const handleEmail = async () => {
        setIsLoading(true);

        await axios.post('/api/usuarios/changeEmail', {
            email: email,
            newEmail: valueEmail
        }, {
            headers
        }).then((res) => {

            if(res.data.status === 200){
                setAlertIsOpen(true);
                setAlertTitle('Sucesso');
                setAlertMessage(res.data.message);
                setAlertType('success');

                setIsLoading(false);
            } else {
                setAlertIsOpen(true);
                setAlertTitle('Erro');
                setAlertMessage(res.data.message);
                setAlertType('error');

                setIsLoading(false);
            }
        }).catch(() => {
            setAlertIsOpen(true);
            setAlertTitle('Erro');
            setAlertMessage('Erro ao alterar e-mail');
            setAlertType('error');

            setIsLoading(false);
        })
    }

    return (
        <>
            <ModalTemplate funcSubmit={handleEmail} onRequestClose={handleClose} title='E-mail registrado' modalFooter submitTitle="Alterar">
                <InputData type="email" value={valueEmail} onChange={e => setValueEmail(e.target.value)} />
            </ModalTemplate>

            {isLoading ? (
                <Carregando title="Alterando e-mail" />
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

ModalEmail.propTypes = {
    handleClose: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired
}

export default ModalEmail;