import { useEffect, useState } from "react";
import { BotaoPrioridade, ContainerBotaoP, ContainerNovoChamado, ContainerRelatorios, ContainerTabelaRelatorios, SecondTextBotaoPrioridade, TextBotaoPrioridade } from "./Relatorios.styles";
import TabelaRelatorios from "./TabelaRelatorios/TabelaRelatorios";
import { BotaoAcao } from "../../global.styles";
import ModalRelatorio from "./ModalRelatorio/ModalRelatorio";
import { useAuth } from "../../context/AuthContext";

const Relatorios = () => {
    const { handleSetHeaders } = useAuth();
    const [listaRelatorio, setListaRelatorio] = useState('prioridade');
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleGrauPrioridade = (grau) => {
        setListaRelatorio(grau);
    }

    const openModal = () => {
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setModalIsOpen(false);
    }

    useEffect(() => {
        handleSetHeaders();
    }, [])

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
                <TabelaRelatorios grau={listaRelatorio} />
            </ContainerTabelaRelatorios>

            <ContainerNovoChamado>
                <BotaoAcao onClick={openModal}>Criar achado</BotaoAcao>
            </ContainerNovoChamado>

            {modalIsOpen && (
                <ModalRelatorio titulo={'Criar achado:'} closeModal={closeModal}/>
            )}
        </ContainerRelatorios>
    )
}

export default Relatorios;