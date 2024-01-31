import React, { useEffect, useState } from "react";
import { ContainerDataRel, ContainerTextGrau, InfoTabelaRelatorio, SimbolGrau, StatusRelatorio, TextData, TextGrau } from "./TabelaRelatorios.styles";
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

library.add([faCircleCheck]);

const TabelaRelatorios = () => {
    const { sessao, handleSetHeaders, headers } = useAuth();
    const [dataRelatorios, setDataRelatorios] = useState([]);

    const [isLoading, setIsLoading] = useState(true); // Add isLoading state

    const location = useLocation();
    const parametros = new URLSearchParams(location.search);
    const grau = parametros.get('grau');

    const [dataInicial, setDataInicial] = useState(parametros.get('dataInicial'));	
    const [dataFinal, setDataFinal] = useState(parametros.get('dataFinal'));

    const navigate = useNavigate();

    const filterDataInicial = (data) => {
        setDataInicial(data);
        navigate(`/relatorio?grau=${grau}&dataInicial=${data}&dataFinal=${dataFinal}`);
    }
    
    const filterDataFinal = (data) => {
        setDataFinal(data);
        navigate(`/relatorio?grau=${grau}&dataInicial=${dataInicial}&dataFinal=${data}`);
    }

    const handleDataRelatorios = async () => {
        // variáveis para filtros
        const dataInicial = parametros.get('dataInicial');
        const dataFinal = parametros.get('dataFinal');

        const params = { id_usuario: sessao.id };''

        if (grau) params.grau = grau;
        if (dataInicial) params.dataInicial = dataInicial;
        if (dataFinal) params.dataFinal = dataFinal;

        await axios.get(`/api/relatorios/`, { 
            params, 
            headers 
        })
        .then((response) => {
            console.log(response.data)
            setDataRelatorios(response.data);
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setIsLoading(false);
        })
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
                                <TH>Paciente</TH>
                                <TH>Status</TH>
                                <TH>Arquivo</TH>
                                <TH>Link</TH>
                            </TR>
                        </THead>
                        <TBody>
                            {dataRelatorios.length !== 0 ? (
                                dataRelatorios.map((relatorio) => (
                                    <TR key={relatorio.id}>
                                        <TD>
                                            <p><b>{relatorio.aberto_por}</b> para <b>{relatorio.atrelado_a}</b></p>
                                            {relatorio.assunto}
                                        </TD>
                                        <TD>{relatorio.nome_paciente}</TD>
                                        <TD>
                                            <p>{relatorio.data_criacao}</p>
                                            <StatusRelatorio status={relatorio.status}><FontAwesomeIcon icon={['fas', 'circle-check']} />{relatorio.status}</StatusRelatorio>
                                        </TD>
                                        <TD onClick={() => handleDownloadArquivo(relatorio.arquivo_id, relatorio.arquivo)}>
                                            {relatorio.arquivo}
                                        </TD>
                                        <TD>{relatorio.link}</TD>
                                    </TR>
                                ))
                            ) : (
                                <TR>
                                    <TD colSpan="5">Nenhum relatório encontrado</TD>
                                </TR>
                            )}
                        </TBody>
                    </Tabela>
                </>
            )}
        </>
    )
}

TabelaRelatorios.propTypes = {
    grau: PropTypes.string.isRequired
};

export default React.memo(TabelaRelatorios);