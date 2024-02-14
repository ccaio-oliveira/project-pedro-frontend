import { useEffect, useState } from 'react';
import Carregando from '../../Carregando/Carregando';
import { useAuth } from '../../../context/AuthContext';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const TabelaContatos = () => {
    const { sessao, headers, handleSetHeaders } = useAuth(); // Get the sessao object from useAuth context
    const [dataContatos, setDataContatos] = useState([]); // Add dataContatos state

    const [isLoading, setIsLoading] = useState(true);

    const location = useLocation();
    const parametros = new URLSearchParams(location.search);
    const tipoUsuario = parametros.get('tipoUsuario');

    const handleDataContatos = async () => {
        const params = { id_usuario: sessao.id, perfil_usuario: sessao.perfil_usuario };

        if(tipoUsuario) params.tipoUsuario = tipoUsuario;

        await axios.get('/api/contatos/', {
            params,
            headers
        }).then(response => {
            console.log(response.data);
            setDataContatos(response.data);
            setIsLoading(false);
        })
    }

    useEffect(() => {
        handleSetHeaders(); // Call the handleSetHeaders function
        handleDataContatos(); // Call the handleDataContatos function
    }, [tipoUsuario]);

    return (
        <>
            {isLoading ? (
                <Carregando title="Carregando usuários" /> // Render the Carregando component while loading
            ) : (
                <>

                </>
            )}
        </>
    )
}

export default TabelaContatos;