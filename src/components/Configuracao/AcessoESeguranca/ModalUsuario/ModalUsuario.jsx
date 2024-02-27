import { PropTypes } from 'prop-types';
import ModalTemplate from '../../../Modal/Modal';
import { InputData } from '../../../../global.styles';
import { useState } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import axios from 'axios';
import Carregando from '../../../Carregando/Carregando';
import AlertTemplate from '../../../AlertComponents/AlertTemplate';
import SuccessAlert from '../../../AlertComponents/SuccessAlert/SuccessAlert';
import ErrorAlert from '../../../AlertComponents/ErrorAlert/ErrorAlert';
import { ModalFormConfig } from '../../Configuracao.styles';

const ModalUsuario = ({ handleClose, usuario }) => {
    const { sessao, headers, handleSetSessao } = useAuth();
    const [user, setUser] = useState(usuario);

    const [isLoading, setIsLoading] = useState(false);

    const [alertIsOpen, setAlertIsOpen] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    const handleSubmit = async () => {
        setIsLoading(true);

        await axios.put('/api/usuarios/changeUsername', {
            usuario_id: sessao.id,
            nome_completo: user
        }, {
            headers
        }).then(res => {
            handleSetSessao({
                ...sessao,
                nome_completo: user
            });
            setIsLoading(false);

            setAlertIsOpen(true);
            setAlertTitle('Sucesso');
            setAlertMessage(res.data.message);
            setAlertType('success');
        }).catch(() => {
            setIsLoading(false);

            setAlertIsOpen(true);
            setAlertTitle('Erro');
            setAlertMessage('Erro ao alterar nome de usuário');
            setAlertType('error');
        
        })
    }

    return (
        <>
            <ModalTemplate 
                funcSubmit={handleSubmit} 
                onRequestClose={handleClose} 
                title='Editar nome de usuário' 
                submitTitle="Alterar" modalFooter
            >
                <ModalFormConfig>
                    <InputData 
                        type="text" 
                        placeholder="Nome de usuário" 
                        value={user} 
                        onChange={(e) => setUser(e.target.value)} 
                    />
                </ModalFormConfig>
            </ModalTemplate>

            {isLoading ? (
                <Carregando title="Alterando nome de usuário" />
            ) : (alertIsOpen && (
                <AlertTemplate title={alertTitle}>
                    {alertType === 'success' ? (
                        <SuccessAlert 
                            message={alertMessage} 
                            close={() => {setAlertIsOpen(false); handleClose();}}
                        />
                    ) : (
                        <ErrorAlert message={alertMessage} close={() => setAlertIsOpen(false)} />
                    )}
                </AlertTemplate>
            ))}
        </>
    );
}

ModalUsuario.propTypes = {
    handleClose: PropTypes.func.isRequired,
    usuario: PropTypes.string.isRequired
}

export default ModalUsuario;