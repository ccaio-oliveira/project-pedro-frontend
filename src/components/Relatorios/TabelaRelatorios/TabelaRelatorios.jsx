import React, { useEffect, useState } from "react";
import { ContainerDataRel, ContainerTextGrau, InfoTabelaRelatorio, SimbolGrau, StatusRelatorio, TextData, TextGrau } from "./TabelaRelatorios.styles";
import { InputData, TBody, TD, TH, THead, Tabela, TR } from "../../../global.styles";
import Carregando from "../../Carregando/Carregando";
import axios from 'axios';
import { useAuth } from "../../../context/AuthContext";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add([faCircleCheck]);

const TabelaRelatorios = ({ grau, dadosRelatorios }) => {
    const { sessao } = useAuth();
    const [dataInicial, setDataInicial] = useState('');
    const [dataFinal, setDataFinal] = useState('');

    const [dataRelatorios, setDataRelatorios] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Add isLoading state

    const headers = { 
        Authorization: `Bearer ${sessao.token}`,
    };

    const handleDataRelatorios = async () => {
        await axios.get(`/api/relatorios/`, { 
            params: { 
                grau, 
                dataInicial, 
                dataFinal,
                id_usuario: sessao.id
            }, 
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

    useEffect(() => {
        handleDataRelatorios();
        setIsLoading(true);
    }, [dadosRelatorios, grau, dataInicial, dataFinal]);

    return (
        <>
            {isLoading ? (
                <Carregando title={'relatórios'} /> // Render the Carregando component while loading
            ) : (
                <>
                    <InfoTabelaRelatorio>
                        <ContainerTextGrau>
                            <SimbolGrau grautabela={grau} />
                            <TextGrau grautabela={grau}>{grau === 'prioridade' ? 'Prioridade' : (grau === 'nao_urgente' ? 'Não Urgente' : 'Rotina')}</TextGrau>
                        </ContainerTextGrau>

                        <ContainerDataRel>
                            <TextData>Data inicial</TextData>
                            <InputData type="date" name="data_inicio" value={dataInicial} onChange={e => setDataInicial(e.target.value)} />

                            <TextData>Data final</TextData>
                            <InputData type="date" name="data_fim" value={dataFinal} onChange={e => setDataFinal(e.target.value)}/>
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
                                        <TD>{relatorio.arquivo}</TD>
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

export default React.memo(TabelaRelatorios);