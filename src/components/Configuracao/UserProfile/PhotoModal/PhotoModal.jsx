import { PropTypes } from 'prop-types';
import ModalTemplate from '../../../Modal/Modal';
import { useState } from 'react';
import { BtnPhoto } from './PhotoModal.styles';
import { useAuth } from '../../../../context/AuthContext';
import axios from 'axios';
import { InputData } from '../../../../global.styles';

const PhotoModal = ({ handleClose }) => {
    const { sessao, headers } = useAuth();
    const [btnSelected, setBtnSelected] = useState('');
    const [modalFooter, setModalFooter] = useState(false);

    const [selectedFile, setSelectedFile] = useState();

    const onFileChange = event => {
        setSelectedFile(event.target.files[0]);
    }

    const handleBtnSelected = (btn) => {
        if(btn === 'upload'){
            setBtnSelected('upload');
            setModalFooter(true);
            console.log('upload');
        } else {
            setBtnSelected('remove');
            console.log('remove');
        }
    }

    const handleSave = async () => {
        if(selectedFile){
            const data = new FormData();
            data.append('file', selectedFile);

            await axios.post('/api/users/uploadProfile', {
                file: selectedFile,
                user_id: sessao.id,
                profile_id: sessao.foto_id
            }, {
                headers: {
                    ...headers,
                    'Content-Type': 'multipart/form-data'
                }
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
                {btnSelected === '' && (
                    <>
                        <BtnPhoto onClick={() => handleBtnSelected('upload')}>Carregar</BtnPhoto>
                        <BtnPhoto onClick={() => handleBtnSelected('remove')}>Excluir</BtnPhoto>
                    </>
                )}

                {btnSelected === 'upload' && (
                    <>
                        <InputData type="file" onChange={onFileChange} accept='image/*' />
                        {selectedFile && (
                            <img src={URL.createObjectURL(selectedFile)} alt="Preview" width="100" />
                        )}
                    </>
                )}
            </ModalTemplate>
        </>
    );
}

PhotoModal.propTypes = {
    handleClose: PropTypes.func.isRequired
}

export default PhotoModal;