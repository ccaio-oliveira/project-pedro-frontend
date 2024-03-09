import { PropTypes } from 'prop-types';
import ModalTemplate from '../../../Modal/Modal';
import { useState } from 'react';
import { BtnPhoto } from './PhotoModal.styles';
import { useAuth } from '../../../../context/AuthContext';
import axios from 'axios';
import { InputData } from '../../../../global.styles';
import Carregando from '../../../Carregando/Carregando';
import AlertTemplate from '../../../AlertComponents/AlertTemplate';
import SuccessAlert from '../../../AlertComponents/SuccessAlert/SuccessAlert';
import ErrorAlert from '../../../AlertComponents/ErrorAlert/ErrorAlert';
import { ModalFormConfig } from '../../Configuracao.styles';

const PhotoModal = ({ handleClose }) => {
    const { sessao, headers } = useAuth();
    const [btnSelected, setBtnSelected] = useState('');
    const [modalFooter, setModalFooter] = useState(false);

    const [selectedFile, setSelectedFile] = useState();
    const [isFileUploaded, setIsFileUploaded] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const [alertIsOpen, setAlertIsOpen] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    const onFileChange = event => {
        setSelectedFile(event.target.files[0]);
        setIsFileUploaded(true);
    }

    const handleBtnSelected = (btn) => {
        if(btn === 'upload'){
            setBtnSelected('upload');
            setModalFooter(true);
            console.log('upload');
        }
    }

    const handleSave = async () => {
        if(selectedFile){
            const data = new FormData();
            data.append('file', selectedFile);

            setIsLoading(true);

            await axios.post('/api/users/uploadProfile', {
                file: selectedFile,
                user_id: sessao.id,
                profile_id: sessao.foto_id
            }, {
                headers: {
                    ...headers,
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
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
                setAlertMessage('Erro ao alterar foto de perfil');
                setAlertType('error');
    
                setIsLoading(false);
            })
        }
    }

    return (
        <>
            <ModalTemplate
                funcSubmit={handleSave}
                onRequestClose={handleClose}
                title="Alterar foto de perfil"
                modalFooter={modalFooter}
                submitTitle="Salvar"
            >
                <ModalFormConfig>
                    {btnSelected === '' && (
                        <>
                            <BtnPhoto onClick={() => handleBtnSelected('upload')}>Carregar foto</BtnPhoto>
                        </>
                    )}

                    {btnSelected === 'upload' && (
                        <>
                            {!isFileUploaded ? (
                                <InputData type="file" onChange={onFileChange} accept='image/*' />
                            ) : (
                                <img src={URL.createObjectURL(selectedFile)} alt="Preview" width="100" />
                            )}
                        </>
                    )}
                </ModalFormConfig>
            </ModalTemplate>

            {isLoading ? (
                <Carregando title="Alterando foto de perfil" />
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
    );
}

PhotoModal.propTypes = {
    handleClose: PropTypes.func.isRequired
}

export default PhotoModal;