import React, { useEffect, useState } from "react";
import { ContainerDataRel, ContainerTextGrau, InfoTabelaRelatorio, SimbolGrau, StatusRelatorio, TDChamado, TDData, TDStatus, TextData, TextGrau } from "./TabelaRelatorios.styles";
import { InputData, TBody, TD, TH, THead, Tabela, TR } from "../../../global.styles";
import Carregando from "../../Carregando/Carregando";
import axios from 'axios';
import { useAuth } from "../../../context/AuthContext";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PropTypes } from 'prop-types';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ModalTemplate from './../../Modal/Modal';
import ModalDetAchado from "../ModalDetAchado/ModalDetAchado";

library.add([faCircleCheck]);const TabelaRelatorios = () => {
    // variáveis de sessao e headers
    const { sessao, handleSetHeaders, headers } = useAuth();

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
    const [dataInicial, setDataInicial] = useState(parametros.get('dataInicial'));	
    const [dataFinal, setDataFinal] = useState(parametros.get('dataFinal'));

    const navigate = useNavigate();

    // faz o filtro por data inicial
    const filterDataInicial = (data) => {
        setDataInicial(data);
        navigate(`/relatorio?grau=${grau}&dataInicial=${data}&dataFinal=${dataFinal}`);
    }
    
    // faz o filtro por data final
    const filterDataFinal = (data) => {
        setDataFinal(data);
        navigate(`/relatorio?grau=${grau}&dataInicial=${dataInicial}&dataFinal=${data}`);
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

        // faz a requisição para buscar os relatórios
        await axios.get(`/api/relatorios/`, { 
            params, 
            headers 
        })
        .then((response) => {
            setDataRelatorios(response.data);
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setIsLoading(false);
        })
    }

    const openModalDetAchado = (achado) => {
        setAchado({...achado});
        setModalDetIsOpen(true);
    }

    const closeModalDetAchado = () => {
        setModalDetIsOpen(false);
    }

    const handleDownloadArquivo = async (id_arquivo, nomeArquivo) => {
        await axios.get(`/api/relatorios/download/${id_arquivo}`, { headers, responseType: 'blob'})
        .then((res) => {
            const url = window.URL.createObjectURL(new Blob([res.data]));

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', nomeArquivo);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        handleSetHeaders();
        handleDataRelatorios();
        setIsLoading(true);
    }, [grau, dataInicial, dataFinal]);

    return (
        <>
            {isLoading ? (
                <Carregando title={'Carregando relatórios'} /> // Render the Carregando component while loading
            ) : (
                <>
                    <InfoTabelaRelatorio>
                        <ContainerTextGrau>
                            <SimbolGrau grautabela={grau} />
                            <TextGrau grautabela={grau}>{grau === 'prioridade' ? 'Prioridade' : (grau === 'nao_urgente' ? 'Não Urgente' : 'Rotina')}</TextGrau>
                        </ContainerTextGrau>

                        <ContainerDataRel>
                            <TextData>Data inicial</TextData>
                            <InputData type="date" name="data_inicio" value={dataInicial} onChange={e => filterDataInicial(e.target.value)} />

                            <TextData>Data final</TextData>
                            <InputData type="date" name="data_fim" value={dataFinal} onChange={e => filterDataFinal(e.target.value)}/>
                        </ContainerDataRel>
                    </InfoTabelaRelatorio>
                    <Tabela>
                        <THead>
                            <TR>
                                <TH>Chamado</TH>
                                <TH>Data</TH>
                                <TH>Status</TH>
                            </TR>
                        </THead>
                        <TBody>
                            {dataRelatorios.length !== 0 ? (
                                dataRelatorios.map((relatorio) => (
                                    <TR key={relatorio.id} onClick={() => openModalDetAchado(relatorio)}>
                                        <TDChamado>
                                            <p>Veja o achado do(a) paciente <b>{relatorio.nome_paciente}</b> comunicado por <b>{relatorio.aberto_por}</b></p>
                                        </TDChamado>
                                        <TDData>{relatorio.data_criacao}</TDData>
                                        <TDStatus>
                                            <StatusRelatorio status={relatorio.status}><FontAwesomeIcon icon={['fas', 'circle-check']} />{relatorio.status}</StatusRelatorio>
                                        </TDStatus>
                                    </TR>
                                ))
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
    grau: PropTypes.string.isRequired
};

export default React.memo(TabelaRelatorios);