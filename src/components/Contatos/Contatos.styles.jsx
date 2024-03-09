import styled from 'styled-components';
import { BotaoPrioridade, ContainerBotaoP, ContainerTabelaRelatorios, TextBotaoPrioridade } from '../Relatorios/Relatorios.styles';
import { SecondTextBotaoPrioridade } from './../Relatorios/Relatorios.styles';

export const ContainerContatos = styled.div`
    width: 95%;
    padding: 20px 20px 0;

    @media (max-width: 776px){
        padding-left: 5px;
    }
`;

export const ContainerBotaoC = styled(ContainerBotaoP)`
    
`;

export const BotaoUsuario = styled(BotaoPrioridade)`
    background: ${props => props.$admin ? '#04293D' : (props.$medicos ? '#164863' : '#336B8A')};
`;

export const TextBotaoContato = styled(TextBotaoPrioridade)`
`;

export const SecondTextBotaoContato = styled(SecondTextBotaoPrioridade)`
`;

export const ContainerTabelaContato = styled(ContainerTabelaRelatorios)`
`;