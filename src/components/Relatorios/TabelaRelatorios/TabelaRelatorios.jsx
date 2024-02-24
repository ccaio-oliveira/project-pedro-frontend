import React, { useEffect, useState } from "react";
import { ContainerData, ContainerDataRel, ContainerSearch, ContainerTextGrau, IconSearch, InfoTabelaRelatorio, InputSearch, SimbolGrau, StatusRelatorio, TDChamado, TDData, TDStatus, TextData, TextGrau } from "./TabelaRelatorios.styles";
import { InputData, TBody, TD, TH, THead, Tabela, TR } from "../../../global.styles";
import Carregando from "../../Carregando/Carregando";
import axios from 'axios';
import { useAuth } from "../../../context/AuthContext";
import { faCircleCheck, faSearch } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PropTypes } from 'prop-types';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ModalDetAchado from "../ModalDetAchado/ModalDetAchado";

library.add([faCircleCheck, faSearch]);

const TabelaRelatorios = ({ page, relatorios }) => {
    // variáveis de sessao e headers
    const { sessao, headers } = useAuth();

    const [searchRelatorio, setSearchRelatorio] = useState(''); // Add searchRelatorio state
    const [filteredRelatorios, setFilteredRelatorios] = useState([]); // Add filteredRelatorios state

    // variável para armazenar dados dos relatórios
    const [dataRelatorios, setDataRelatorios] = useState([]);

    // variáveis de loading 
    const [isLoading, setIsLoading] = useState(true); // Add isLoading state

    // variáveis do modal de detalhes do achado 
    const [modalDetIsOpen, setModalDetIsOpen] = useState(false);
    const [achado, setAchado] = useState({});

    // variável para pegar os parâmetros da url
    const location = useLocation();
    const parametros = new URLSearchParams(location.search);
    const grau = parametros.get('grau');

    // variáveis para filtrar por data 
    const [dataInicial, setDataInicial] = useState(parametros.get('dataInicial') ?? '');	
    const [dataFinal, setDataFinal] = useState(parametros.get('dataFinal') ?? '');

    const navigate = useNavigate();

    // faz o filtro por data inicial
    const filterDataInicial = (data) => {
        const newDataInicial = data ?? dataInicial;
        setDataInicial(newDataInicial);

        if(page == 'perfil'){
            navigate(`/perfil?dataInicial=${newDataInicial}${dataFinal != null ? `&dataFinal=${dataFinal}` : ''}`);
        } else {
            navigate(`/relatorio?grau=${grau}&dataInicial=${newDataInicial}${dataFinal != null ? `&dataFinal=${dataFinal}` : ''}`);
        }
    }

    // faz o filtro por data final
    const filterDataFinal = (data) => {
        const newDataFinal = data ?? dataFinal;
        setDataFinal(newDataFinal);

        if(page == 'perfil'){
            navigate(`/perfil?${dataInicial != null ? `dataInicial=${dataInicial}` : ''}dataFinal=${newDataFinal}`);
        } else {
            navigate(`/relatorio?grau=${grau}${dataInicial != null ? `&dataInicial=${dataInicial}` : ''}&dataFinal=${newDataFinal}`);
        }
    }

    // função para buscar os relatórios
    const handleDataRelatorios = async () => {
        // variáveis para filtros
        const dataInicial = parametros.get('dataInicial');
        const dataFinal = parametros.get('dataFinal');

        const params = { id_usuario: sessao.id, perfil_usuario: sessao.perfil_usuario };

        // verifica se os filtros estão preenchidos na url 
        if (grau) params.grau = grau;
        if (dataInicial) params.dataInicial = dataInicial;
        if (dataFinal) params.dataFinal = dataFinal;
        
        if(page == 'perfil') params.page = 'perfil';

        // faz a requisição para buscar os relatórios
        if(page == 'perfil'){
            await axios.get(`/api/relatorios/usuario`, {
                params,
                headers
            }).then(response => {
                setDataRelatorios(response.data);
                relatorios(response.data);
                setIsLoading(false);
            })
        } else {
            await axios.get(`/api/relatorios/`, { 
                params, 
                headers 
            })
            .then((response) => {
                setDataRelatorios(response.data);
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            })
        }
    }

    const openModalDetAchado = (achado) => {
        setAchado({...achado});
        setModalDetIsOpen(true);
    }

    const closeModalDetAchado = () => {
        setAchado({})
        setModalDetIsOpen(false);
    }

    const handleSearchRelatorio = (e) => {
        setSearchRelatorio(e);
        
        setFilteredRelatorios(dataRelatorios.filter((relatorio) => {
            if (relatorio.nome_paciente.toLowerCase().includes(e.toLowerCase())) {
                return relatorio;
            } else if (relatorio.aberto_por.toLowerCase().includes(e.toLowerCase())) {
                return relatorio;
            }
        }));
    }

    useEffect(() => {
        handleDataRelatorios();
        setIsLoading(true);
    }, [page, grau, dataInicial, dataFinal]);

    return (
        <>
            {isLoading ? (
                <Carregando title={'Carregando relatórios'} /> // Render the Carregando component while loading
            ) : (
                <>
                    <InfoTabelaRelatorio>
                        {page != 'perfil' && (
                            <ContainerTextGrau>
                                <SimbolGrau type={grau} />
                                <TextGrau type={grau}>{grau === 'prioridade' ? 'Prioridade' : (grau === 'nao_urgente' ? 'Não Urgente' : 'Rotina')}</TextGrau>
                            </ContainerTextGrau>
                        )}

                        <ContainerDataRel>
                            <ContainerSearch>
                                <InputSearch type="text" name="searchRelatorio" value={searchRelatorio} onChange={e => handleSearchRelatorio(e.target.value)} placeholder="Pesquisar relatório" />
                                <IconSearch icon={['fas', 'search']} />
                            </ContainerSearch>

                            <ContainerData>
                                <TextData>Data inicial</TextData>
                                <InputData type="date" name="data_inicio" value={dataInicial} onChange={e => filterDataInicial(e.target.value)} />
                            </ContainerData>

                            <ContainerData>
                                <TextData>Data final</TextData>
                                <InputData type="date" name="data_fim" value={dataFinal} onChange={e => filterDataFinal(e.target.value)}/>
                            </ContainerData>
                        </ContainerDataRel>
                    </InfoTabelaRelatorio>
                    <Tabela>
                        <THead>
                            <TR>
                                <TH>Chamado</TH>
                                {page != 'perfil' ? <TH>Data</TH> : ''}
                                <TH>Status</TH>
                            </TR>
                        </THead>
                        <TBody>
                            {dataRelatorios.length !== 0 ? (
                                searchRelatorio === '' ? (
                                    dataRelatorios.map((relatorio) => (
                                        <TR key={relatorio.id} onClick={() => openModalDetAchado(relatorio)}>
                                            <TDChamado>
                                                <p>Veja o achado do(a) paciente <b>{relatorio.nome_paciente}</b> comunicado por <b>{relatorio.aberto_por}</b></p>
                                            </TDChamado>
                                            {page != 'perfil' ? <TDData>{relatorio.data_criacao}</TDData> : ''}
                                            <TDStatus>
                                                <StatusRelatorio $status={relatorio.status}><FontAwesomeIcon icon={['fas', 'circle-check']} />{relatorio.status}</StatusRelatorio>
                                            </TDStatus>
                                        </TR>
                                    ))
                                ) : (
                                    filteredRelatorios.length !== 0 ? (
                                        filteredRelatorios.map((relatorio) => (
                                            <TR key={relatorio.id} onClick={() => openModalDetAchado(relatorio)}>
                                                <TDChamado>
                                                    <p>Veja o achado do(a) paciente <b>{relatorio.nome_paciente}</b> comunicado por <b>{relatorio.aberto_por}</b></p>
                                                </TDChamado>
                                                {page != 'perfil' ? <TDData>{relatorio.data_criacao}</TDData> : ''}
                                                <TDStatus>
                                                    <StatusRelatorio status={relatorio.status}><FontAwesomeIcon icon={['fas', 'circle-check']} />{relatorio.status}</StatusRelatorio>
                                                </TDStatus>
                                            </TR>
                                        ))
                                    ) : (
                                        <TR style={{ textAlign: "center" }}>
                                            <TD colSpan="5">Nenhum relatório encontrado</TD>
                                        </TR>
                                    )
                                )
                            ) : (
                                <TR style={{ textAlign: "center" }}>
                                    <TD colSpan="5">Nenhum relatório encontrado</TD>
                                </TR>
                            )}
                        </TBody>
                    </Tabela>
                </>
            )}

            {modalDetIsOpen && (
                <ModalDetAchado achado={achado} onClose={closeModalDetAchado} />
            )}
        </>
    )
}

TabelaRelatorios.propTypes = {
    page: PropTypes.string.isRequired,
    relatorios: PropTypes.func
};

export default React.memo(TabelaRelatorios);