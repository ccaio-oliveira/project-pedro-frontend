import { PropTypes } from 'prop-types';
import ModalTemplate from '../../../Modal/Modal';
import { OptionSelect, SelectInput } from '../../../../global.styles';
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../../context/AuthContext';
import Carregando from '../../../Carregando/Carregando';
import AlertTemplate from '../../../AlertComponents/AlertTemplate';
import SuccessAlert from '../../../AlertComponents/SuccessAlert/SuccessAlert';
import ErrorAlert from '../../../AlertComponents/ErrorAlert/ErrorAlert';
import { ModalFormConfig } from '../../Configuracao.styles';

const NicknameModal = ({ handleClose }) => {
    const { headers, sessao, handleSetSessao } = useAuth();
    const [nickname, setNickname] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const [alertIsOpen, setAlertIsOpen] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    const handleSubmit = async () => {
        await axios.put('/api/users/nickname', { 
            nickname,
            user_id: sessao.id
        }, {
            headers
        }).then(res => {
            if(res.data.status === 200){
                handleSetSessao({
                    ...sessao,
                    apelido: nickname
                });
                setAlertIsOpen(true);
                setAlertTitle('Sucesso');
                setAlertMessage(res.data.message);
                setAlertType('success');

                setIsLoading(false);
            }
        })
    }

    return (
        <>
            <ModalTemplate
                onRequestClose={handleClose}
                title='Nome de tratamento'
                modalFooter
                submitTitle="Alterar"
                funcSubmit={handleSubmit}
            >
                <ModalFormConfig>
                    <SelectInput name="nickname" id="nickname" required onChange={(e) => setNickname(e.target.value)}>
                        <OptionSelect value="nenhum">Nenhum</OptionSelect>
                        <OptionSelect value="Sr.">Sr.</OptionSelect>
                        <OptionSelect value="Sra.">Sra.</OptionSelect>
                        <OptionSelect value="Dr.">Dr.</OptionSelect>
                        <OptionSelect value="Dra.">Dra.</OptionSelect>
                    </SelectInput>
                </ModalFormConfig>
            </ModalTemplate>

            {isLoading ? (
                <Carregando title="Alterando nome de tratamento" />
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

NicknameModal.propTypes = {
    handleClose: PropTypes.func.isRequired
}

export default NicknameModal;