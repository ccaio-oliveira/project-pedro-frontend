import { useState } from "react";
import { ContainerDataRel, ContainerTextGrau, InfoTabelaRelatorio, SimbolGrau, TextData, TextGrau } from "./TabelaRelatorios.styles";
import { InputSelect, TBody, TH, THead, TR, Tabela } from "../../../global.styles";

const TabelaRelatorios = ({ grau, dadosRelatorios }) => {
    const [dataInicial, setDataInicial] = useState('');
    const [dataFinal, setDataFinal] = useState('');

    const [dataRelatorios, setDataRelatorios] = useState(dadosRelatorios);

    return (
        <>
            <InfoTabelaRelatorio>
                <ContainerTextGrau>
                    <SimbolGrau grauTabela={grau} />
                    <TextGrau grauTabela={grau}>{grau === 'prioridade' ? 'Prioridade' : (grau === 'nao_urgente' ? 'Não Urgente' : 'Rotina')}</TextGrau>
                </ContainerTextGrau>

                <ContainerDataRel>
                    <TextData>Data inicial</TextData>
                    <InputSelect type="date" name="data_inicio" value={dataInicial} onChange={e => setDataInicial(e.target.value)} />

                    <TextData>Data final</TextData>
                    <InputSelect type="date" name="data_fim" value={dataFinal} onChange={e => setDataFinal(e.target.value)}/>
                </ContainerDataRel>
            </InfoTabelaRelatorio>
            <Tabela>
                <THead>
                    <TH>Chamado</TH>
                    <TH>Paciente</TH>
                    <TH>Status</TH>
                    <TH>Arquivo</TH>
                    <TH>Link</TH>
                </THead>
                <TBody>
                    <TR></TR>
                </TBody>
            </Tabela>
        </>
    )
}

export default TabelaRelatorios;