import { PropTypes } from 'prop-types';
import ModalTemplate from '../../../Modal/Modal';
import { useState } from 'react';
import { BtnPhoto, DropContainer } from './PhotoModal.styles';
import { useAuth } from '../../../../context/AuthContext';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const PhotoModal = ({ handleClose }) => {
    const { sessao, headers } = useAuth();
    const [btnSelected, setBtnSelected] = useState('');
    const [modalFooter, setModalFooter] = useState(false);

    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject
    } = useDropzone({ accept: 'image/*' });

    const files = acceptedFiles.map((file, index) => (
        <li key={index}>
            <img width="100" src={URL.createObjectURL(file)} alt={`Preview ${index}`} />
        </li>
    ));

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
        if(acceptedFiles.length > 0){
            const data = new FormData();
            data.append('file', acceptedFiles[0]);

            await axios.post('/api/users/uploadProfile', {
                file: acceptedFiles[0],
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

    console.log(headers);

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
                        <DropContainer {...getRootProps({ isFocused, isDragAccept, isDragReject})}>
                            <input {...getInputProps()} />
                            <p>Arraste e solte a foto aqui ou clique para selecionar</p>
                        </DropContainer>
                        <aside>
                            <h4>Arquivos</h4>
                            <ul>{files}</ul>
                        </aside>
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