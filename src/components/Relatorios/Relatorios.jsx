import { useEffect, useState } from "react";
import { BotaoExpRelatorios, BotaoPrioridade, ContainerBotaoP, ContainerNovoChamado, ContainerRelatorios, ContainerTabelaRelatorios, SecondTextBotaoPrioridade, TextBotaoPrioridade } from "./Relatorios.styles";
import TabelaRelatorios from "./TabelaRelatorios/TabelaRelatorios";
import { BotaoAcao } from "../../global.styles";
import ModalRelatorio from "./ModalCriarAchado/ModalCriarAchado";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ModalExpRelatorios from "./ModalExpRelatorios/ModalExpRelatorios";

const Relatorios = () => {
    const { handleSetHeaders, sessao } = useAuth();

    // variáveis de abertura de modal 
    const [modalCriarIsOpen, setModalCriarIsOpen] = useState(false);
    const [modalExportarIsOpen, setModalExportarIsOpen] = useState(false);

    // variável de navegação
    const navigate = useNavigate();

    const handleGrauPrioridade = (grau) => {
        navigate(`/relatorio?grau=${grau}`);
    }

    // funções para abrir e fechar o modal de criação de achado
    const openModalCriar = () => {
        setModalCriarIsOpen(true);
    }

    const closeModalCriar = () => {
        setModalCriarIsOpen(false);
    }

    // funções para abrir e fechar modal de exportação de relatórios
    const openModalExportar = () => {
        setModalExportarIsOpen(true);
    }

    const closeModalExportar = () => {
        setModalExportarIsOpen(false);
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
                <TabelaRelatorios page="relatorios" />
            </ContainerTabelaRelatorios>

            <ContainerNovoChamado chamado>
                {sessao.perfil_usuario === 1 && <BotaoExpRelatorios onClick={openModalExportar}>Exportar dados</BotaoExpRelatorios>}
                <BotaoAcao onClick={openModalCriar}>Criar achado</BotaoAcao>
            </ContainerNovoChamado>

            {modalCriarIsOpen && (
                <ModalRelatorio titulo={'Criar achado:'} closeModal={closeModalCriar}/>
            )}

            {modalExportarIsOpen && (
                <ModalExpRelatorios titulo={'Exportar relatórios:'} onClose={closeModalExportar}/>
            )}
        </ContainerRelatorios>
    )
}

export default Relatorios;