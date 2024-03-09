import { useEffect, useMemo, useState } from 'react';
import Carregando from '../../Carregando/Carregando';
import { useAuth } from '../../../context/AuthContext';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { ContainerDataCont, ContainerTextTipo, IconWhatsapp, InfoTabelaContatos, SimbolTipo, TDContato, TextTipo } from './TabelaContatos.styles';
import { ContainerSearch, IconSearch, InputSearch } from '../../Relatorios/TabelaRelatorios/TabelaRelatorios.styles';
import { ContainerTable, TBody, TH, TR, Tabela } from '../../../global.styles';
import { THead } from './../../../global.styles';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import Pagination from './../../Pagination/Pagination';

library.add(faWhatsapp);

const TabelaContatos = () => {
    const { sessao, headers, handleSetHeaders } = useAuth(); // Get the sessao object from useAuth context

    const [currentPage, setCurrentPage] = useState(1); // Add currentPage state
    
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

        await axios.get('/api/contatos', {
            params,
            headers
        }).then(response => {
            setDataContatos(response.data);
            setIsLoading(false);
        }).catch(error => {
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

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * 5;
        const lastPageIndex = firstPageIndex + 5;
        return dataContatos.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, dataContatos]);

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
                            <SimbolTipo $tipo={tipoUsuario} />
                            <TextTipo $tipo={tipoUsuario}>{tipoUsuario == 1 ? 'Administrador' : (tipoUsuario == 2 ? 'Médico' : 'Secretária')}</TextTipo>
                        </ContainerTextTipo>

                        <ContainerDataCont>
                            <ContainerSearch>
                                <InputSearch type="text" name="searchContato" value={searchContato} onChange={e => handleSearchContato(e.target.value)} placeholder="Pesquisar contato" />
                                <IconSearch icon={['fas', 'search']} />
                            </ContainerSearch>
                        </ContainerDataCont>
                    </InfoTabelaContatos>
                    <ContainerTable>
                        <Tabela>
                            <THead>
                                <TR>
                                    <TH>Nome</TH>
                                    {tipoUsuario == 2 && <TH>CRM</TH>}
                                    <TH>Função</TH>
                                    <TH>Conectar</TH>
                                </TR>
                            </THead>
                            <TBody>
                                {currentTableData.length !== 0 ? (
                                    searchContato === '' ? (
                                        currentTableData.map((contato) => (
                                            <TR key={contato.id}>
                                                <TDContato>{contato.nome_completo}</TDContato>
                                                {tipoUsuario == 2 && <TDContato>{tipoUsuario == 2 ? contato.medico_crm : 'Outra coisa'}</TDContato>}
                                                <TDContato>{tipoUsuario == 1 ? 'Administrador' : (tipoUsuario == 2 ? contato.funcao : 'Secretária')}</TDContato>
                                                <TDContato>
                                                    <IconWhatsapp target='_blank' href={`https://wa.me/${contato.telefone_whats}`}>
                                                        <FontAwesomeIcon icon={['fab', 'whatsapp']} />
                                                    </IconWhatsapp>
                                                </TDContato>
                                            </TR>
                                        ))
                                    ) : (
                                        filteredContatos.length !== 0 ? (
                                            filteredContatos.map(contato => (
                                                <TR key={contato.id}>
                                                    <TDContato>{contato.nome_completo}</TDContato>
                                                    {tipoUsuario == 2 && <TDContato>{tipoUsuario == 2 ? contato.medico_crm : 'Outra coisa'}</TDContato>}
                                                    <TDContato>{tipoUsuario == 1 ? 'Administrador' : (tipoUsuario == 2 ? contato.funcao : 'Secretária')}</TDContato>
                                                    <TDContato>
                                                        <IconWhatsapp target='_blank' href={`https://wa.me/${contato.telefone_whats}`}>
                                                            <FontAwesomeIcon icon={['fab', 'whatsapp']} />
                                                        </IconWhatsapp>
                                                    </TDContato>
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
                    </ContainerTable>
                    <Pagination
                        currentPage={currentPage}
                        totalCount={dataContatos.length}
                        pageSize={5}
                        onPageChange={page => setCurrentPage(page)}
                    />
                </>
            )}
        </>
    )
}

export default TabelaContatos;