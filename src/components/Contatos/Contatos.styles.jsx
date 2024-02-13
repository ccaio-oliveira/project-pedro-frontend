import styled from 'styled-components';
import { BotaoPrioridade, ContainerBotaoP, TextBotaoPrioridade } from '../Relatorios/Relatorios.styles';
import { SecondTextBotaoPrioridade } from './../Relatorios/Relatorios.styles';

export const ContainerContatos = styled.div`
    /* display: flex; */
    width: 100%;
`;

export const ContainerBotaoC = styled(ContainerBotaoP)`
    
`;

export const BotaoUsuario = styled(BotaoPrioridade)`
    background: ${props => props.medicos ? '#04293D' : '#164863'};
`;

export const TextBotaoContato = styled(TextBotaoPrioridade)`
`;

export const SecondTextBotaoContato = styled(SecondTextBotaoPrioridade)`
`;