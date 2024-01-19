import { useEffect, useState } from "react";
import { BotaoPrioridade, ContainerBotaoP, ContainerNovoChamado, ContainerRelatorios, ContainerTabelaRelatorios, SecondTextBotaoPrioridade, TextBotaoPrioridade } from "./Relatorios.styles";
import TabelaRelatorios from "./TabelaRelatorios/TabelaRelatorios";
import { BotaoAcao } from "../../global.styles";
import ModalTemplate from "../Modal/Modal";
import ModalRelatorio from "./ModalRelatorio/ModalRelatorio";
import axios from 'axios';
import { useAuth } from "../../context/AuthContext";
import Carregando from "../Carregando/Carregando";

const Relatorios = () => {
    const { sessao } = useAuth();
    const [listaRelatorio, setListaRelatorio] = useState('prioridade');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [usuarios, setUsuarios] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const headers = { Authorization: `Bearer ${sessao.token}` };

    const handleGrauPrioridade = (grau) => {
        setListaRelatorio(grau);
    }

    const handleUsuarios = async () => {
        await axios.get('/api/usuarios', { headers })
        .then((response) => {
            setUsuarios(response.data);
            setIsLoading(false);
        })
    }

    const openModal = () => {
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setModalIsOpen(false);
    }

    // useEffect para disparar a requisição quando o modal for aberto
    useEffect(() => {
        if (modalIsOpen) {
            handleUsuarios();
        }
    }, [modalIsOpen]);

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
                <TabelaRelatorios grau={listaRelatorio} dadosRelatorios={usuarios} />
            </ContainerTabelaRelatorios>

            <ContainerNovoChamado>
                <BotaoAcao onClick={openModal}>Criar achado</BotaoAcao>
            </ContainerNovoChamado>

            {modalIsOpen && (
                <ModalTemplate title={'Criar achado:'} onRequestClose={closeModal}>
                    <ModalRelatorio />
                </ModalTemplate>
            )}
        </ContainerRelatorios>
    )
}

export default Relatorios;