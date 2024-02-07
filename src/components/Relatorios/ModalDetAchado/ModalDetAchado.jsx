import { PropTypes } from 'prop-types';
import ModalTemplate from '../../Modal/Modal';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import { useEffect } from 'react';

const ModalDetAchado = ({ achado, onClose }) => {
    const { sessao, headers } = useAuth();
    
    const handleVisualizacao = async () => {
        await axios.get(`/api/relatorios/${achado.id}/${sessao.id}`, { headers })
        .then(response => {
            console.log(response.data);
        })
    }

    useEffect(() => {
        handleVisualizacao();
    }, []);

    return (
        <>
            <ModalTemplate title="Chamado detalhado" onRequestClose={onClose}>
                <h1>Apareci</h1>
            </ModalTemplate>
        </>
    )
}

ModalDetAchado.propTypes = {
    achado: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
}

export default ModalDetAchado;