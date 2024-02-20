import { PropTypes } from 'prop-types';
import ModalTemplate from '../../../Modal/Modal';
import { useState } from 'react';
import axios from 'axios';  
import { FormGroup, FormLabel, InputData } from '../../../../global.styles';
import { ContainerModalTelefone } from './ModalTelefone.styles';
import { useAuth } from '../../../../context/AuthContext';
import Carregando from '../../../Carregando/Carregando';
import AlertTemplate from '../../../AlertComponents/AlertTemplate';
import SuccessAlert from '../../../AlertComponents/SuccessAlert/SuccessAlert';
import ErrorAlert from '../../../AlertComponents/ErrorAlert/ErrorAlert';

const ModalTelefone = ({ handleClose, telefone, tipo }) => {
    const { sessao, headers } = useAuth();

    const [isLoading, setIsLoading] = useState(false);

    const [ddi, setDdi] = useState(telefone.slice(0, 2));
    const [ddd, setDdd] = useState(telefone.slice(2, 4));
    const [numero, setNumero] = useState(telefone.slice(4, 13));
    const title = tipo === 'whatsapp' ? 'Editar número de WhatsApp' : 'Editar número de telefone';

    const [alertIsOpen, setAlertIsOpen] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    const handlePhoneNumber = async () => {
        setIsLoading(true);

        const newPhoneNumber = `${ddi}${ddd}${numero}`;
        await axios.put('/api/usuarios/changeNumero', {
            usuario_id: sessao.id,
            telefone: newPhoneNumber,
            tipo: tipo
        }, {
            headers
        }).then((res) => {
            setAlertIsOpen(true);
            setAlertTitle('Sucesso');
            setAlertMessage(res.data.message);
            setAlertType('success');

            setIsLoading(false);
        }).catch(() => {
            setAlertIsOpen(true);
            setAlertTitle('Erro');
            setAlertMessage('Não foi possível alterar o número de telefone');
            setAlertType('error');

            setIsLoading(false);    
        })
    }

    return (
        <>
            <ModalTemplate funcSubmit={handlePhoneNumber} onRequestClose={handleClose} title={title} modalFooter submitTitle="Alterar">
                <ContainerModalTelefone>
                    <FormGroup>
                        <FormLabel>DDI</FormLabel>
                        <InputData type="text" value={ddi} onChange={(e) => setDdi(e.target.value)} placeholder="Digite o DDI" />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>DDD</FormLabel>
                        <InputData type="text" value={ddd} onChange={(e) => setDdd(e.target.value)} placeholder="Digite o DDD" />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Número</FormLabel>
                        <InputData type="text" value={numero} onChange={(e) => setNumero(e.target.value)} placeholder="Digite o número de telefone" />
                    </FormGroup>
                </ContainerModalTelefone>
            </ModalTemplate>

            {
                isLoading ? (
                    <Carregando title="Alterando número de telefone" />
                ) : (alertIsOpen && (
                    <AlertTemplate title={alertTitle}>
                        {alertType === 'success' ? (
                            <SuccessAlert message={alertMessage} close={() => {setAlertIsOpen(false); handleClose();}} />
                        ) : (
                            <ErrorAlert message={alertMessage} close={() => setAlertIsOpen(false)} />
                        )}
                    </AlertTemplate>
                ))
            }
        </>
    )
}

ModalTelefone.propTypes = {
    handleClose: PropTypes.func,
    telefone: PropTypes.string,
    tipo: PropTypes.string
}

export default ModalTelefone;