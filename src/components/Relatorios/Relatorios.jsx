import { useState } from "react";
import { BotaoPrioridade, ContainerBotaoP, ContainerNovoChamado, ContainerRelatorios, ContainerTabelaRelatorios, SecondTextBotaoPrioridade, TextBotaoPrioridade } from "./Relatorios.styles";
import TabelaRelatorios from "./TabelaRelatorios/TabelaRelatorios";
import { BotaoAcao } from "../../global.styles";
import ModalTemplate from "../Modal/Modal";

const Relatorios = () => {
    const [listaRelatorio, setListaRelatorio] = useState('prioridade');
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleGrauPrioridade = (grau) => {
        setListaRelatorio(grau);
    }

    const openModal = () => {
        setModalIsOpen(true);
    }

    return(
        <ContainerRelatorios>
            <ContainerBotaoP>
                <BotaoPrioridade prioridade="true" onClick={() => handleGrauPrioridade('prioridade')}>
                    <TextBotaoPrioridade>Prioridade</TextBotaoPrioridade>
                    <SecondTextBotaoPrioridade>Exibir relatórios prioritários</SecondTextBotaoPrioridade>
                </BotaoPrioridade>

                <BotaoPrioridade nao_urgente="true" onClick={() => handleGrauPrioridade('nao_urgente')}>
                    <TextBotaoPrioridade>Não urgentes</TextBotaoPrioridade>
                    <SecondTextBotaoPrioridade>Exibir relatórios não urgentes</SecondTextBotaoPrioridade>
                </BotaoPrioridade>

                <BotaoPrioridade onClick={() => handleGrauPrioridade('rotina')}>
                    <TextBotaoPrioridade>Rotina</TextBotaoPrioridade>
                    <SecondTextBotaoPrioridade>Exibir relatórios de rotina</SecondTextBotaoPrioridade>
                </BotaoPrioridade>
            </ContainerBotaoP>

            <ContainerTabelaRelatorios>
                <h1>Painel Relatório</h1>
                <TabelaRelatorios grau={listaRelatorio} />
            </ContainerTabelaRelatorios>

            <ContainerNovoChamado>
                <BotaoAcao onClick={openModal}>Criar achado</BotaoAcao>
            </ContainerNovoChamado>

            {modalIsOpen && (
                <ModalTemplate>
                    oi
                </ModalTemplate>
            )}
        </ContainerRelatorios>
    )
}

export default Relatorios;