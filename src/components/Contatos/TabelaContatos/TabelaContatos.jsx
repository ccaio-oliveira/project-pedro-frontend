import { useEffect, useState } from 'react';
import Carregando from '../../Carregando/Carregando';
import { useAuth } from '../../../context/AuthContext';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { ContainerDataCont, ContainerTextTipo, InfoTabelaContatos, SimbolTipo, TDContato, TextTipo } from './TabelaContatos.styles';
import { ContainerSearch, IconSearch, InputSearch } from '../../Relatorios/TabelaRelatorios/TabelaRelatorios.styles';
import { TBody, TH, TR, Tabela } from '../../../global.styles';
import { THead } from './../../../global.styles';

const TabelaContatos = () => {
    const { sessao, headers, handleSetHeaders } = useAuth(); // Get the sessao object from useAuth context
    
    const [searchContato, setSearchContato] = useState(''); // Add searchContato state
    const [filteredContatos, setFilteredContatos] = useState([]); // Add filteredContatos state
    
    const [dataContatos, setDataContatos] = useState([]); // Add dataContatos state
    const [errorMessage, setErrorMessage] = useState(''); // Add errorMessage state
    
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
        }).catch(error => {
            console.log(error);
            setDataContatos([]);
            setErrorMessage(error.response.data.message);
            setIsLoading(false);
        });
    }

    const handleSearchContato = (value) => {
        setSearchContato(value);

        setFilteredContatos(dataContatos.filter(contato => {
            if(contato.nome_completo.toLowerCase().includes(value.toLowerCase())){
                return contato;
            }

            if(tipoUsuario == 2){
                if(contato.medico_crm.toLowerCase().includes(value.toLowerCase())){
                    return contato;
                }

                if(contato.funcao.toLowerCase().includes(value.toLowerCase())){
                    return contato;
                }
            }

        }));
    }

    console.log(dataContatos);

    useEffect(() => {
        handleSetHeaders(); // Call the handleSetHeaders function
        handleDataContatos(); // Call the handleDataContatos function
        setIsLoading(true);
    }, [tipoUsuario]);

    return (
        <>
            {isLoading ? (
                <Carregando title="Carregando contatos" /> // Render the Carregando component while loading
            ) : (
                <>
                    <InfoTabelaContatos>
                        <ContainerTextTipo>
                            <SimbolTipo tipo={tipoUsuario} />
                            <TextTipo tipo={tipoUsuario}>{tipoUsuario == 2 ? 'Médico' : 'Secretária'}</TextTipo>
                        </ContainerTextTipo>

                        <ContainerDataCont>
                            <ContainerSearch>
                                <InputSearch type="text" name="searchContato" value={searchContato} onChange={e => handleSearchContato(e.target.value)} placeholder="Pesquisar contato" />
                                <IconSearch icon={['fas', 'search']} />
                            </ContainerSearch>
                        </ContainerDataCont>
                    </InfoTabelaContatos>

                    <Tabela>
                        <THead>
                            <TR>
                                <TH>Nome</TH>
                                <TH>CRM</TH>
                                <TH>Função</TH>
                                <TH>Conectar</TH>
                            </TR>
                        </THead>
                        <TBody>
                            {dataContatos.length !== 0 ? (
                                searchContato === '' ? (
                                    dataContatos.map((contato) => (
                                        <TR key={contato.id}>
                                            <TDContato>{contato.nome_completo}</TDContato>
                                            <TDContato>{tipoUsuario == 2 ? contato.medico_crm : 'Outra coisa'}</TDContato>
                                            <TDContato>{tipoUsuario == 2 ? contato.funcao : 'Secretária'}</TDContato>
                                            <TDContato>{contato.telefone_whats}</TDContato>
                                        </TR>
                                    ))
                                ) : (
                                    filteredContatos.length !== 0 ? (
                                        filteredContatos.map(contato => (
                                            <TR key={contato.id}>
                                                <TDContato>{contato.nome_completo}</TDContato>
                                                <TDContato>{tipoUsuario == 2 ? contato.medico_crm : 'Outra coisa'}</TDContato>
                                                <TDContato>{tipoUsuario == 2 ? contato.funcao : 'Secretária'}</TDContato>
                                                <TDContato>{contato.telefone_whats}</TDContato>
                                            </TR>
                                        ))
                                    ) : (
                                        <TR>
                                            <TH colSpan="4">Nenhum registro encontrado</TH>
                                        </TR>
                                    )
                                )
                            ) : (
                                <TR>
                                    <TH colSpan="4">{errorMessage}</TH>
                                </TR>
                            )}
                        </TBody>
                    </Tabela>
                </>
            )}
        </>
    )
}

export default TabelaContatos;