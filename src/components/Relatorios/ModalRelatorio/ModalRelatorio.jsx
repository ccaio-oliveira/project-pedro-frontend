import React, { useEffect, useState } from 'react';
import { ModalForm } from './ModalRelatorio.styles';
import { OptionSelect, SelectInput } from '../../../global.styles';
import axios from 'axios';
import ModalTemplate from '../../Modal/Modal';
import { useAuth } from '../../../context/AuthContext';
import Carregando from '../../Carregando/Carregando';
import { PropTypes } from 'prop-types';

const ModalRelatorio = ({titulo, closeModal }) => {
    const { headers, handleSetHeaders } = useAuth();
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(0);
    const [usuarios, setUsuarios] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadingTitle, setLoadingTitle] = useState('');

    const handleUsuarios = async () => {
        setIsLoading(true);
        setLoadingTitle('usuários');
        await axios.get('/api/usuarios', { headers })
        .then((response) => {
            setUsuarios(response.data);
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(error.message);
        })
    }

    const enviarRelatorio = () => {
        axios.post('/api/relatorios', {
            usuario: usuarioSelecionado
        })
    }

    useEffect(() => {
        handleSetHeaders();
        handleUsuarios();
    }, []);

    return(
        <>
            {isLoading ? (
                <Carregando title={loadingTitle} />
            ) : (
                <ModalTemplate title={titulo} onRequestClose={closeModal}>
                    <ModalForm>
                        <SelectInput name='selUsuario' onChange={e => setUsuarioSelecionado(e.target.value)}>
                            <OptionSelect value="0">SELECIONE</OptionSelect>
                            {usuarios.map((usuario) => (
                                <OptionSelect key={usuario.id} value={usuario.id}>{usuario.nome} {usuario.sobrenome}</OptionSelect>
                            ))}
                        </SelectInput>
                    </ModalForm>
                </ModalTemplate>
            )}
        </>
    )
}

ModalRelatorio.propTypes = {
    titulo: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired
};

export default React.memo(ModalRelatorio);
