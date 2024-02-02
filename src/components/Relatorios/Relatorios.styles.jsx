import { styled } from 'styled-components';

export const ContainerRelatorios = styled.div`
    width: 100%;
    height: 90vh;
    padding: 20px;

    max-width: 1200px;
`;

export const ContainerBotaoP = styled.div`
    width: 100%;
    margin-bottom: 30px;

    display: flex;
    justify-content: space-between;
`;

export const BotaoPrioridade = styled.div`
    background: ${(props) => (props.prioridade ? '#DD0E0E' : (props.nao_urgente ? '#336B8A' : '#35393B'))};
    width: 30%;

    padding: 12px;

    border-radius: 17px;
    cursor: pointer;
`;

export const TextBotaoPrioridade = styled.p`
    color: #FFF;
    font-weight: 600;

    margin: 0;
`;

export const SecondTextBotaoPrioridade = styled.p`
    color: #FFF;
    font-weight: 600;
    opacity: 0.5;

    margin: 0;
`;

export const ContainerTabelaRelatorios = styled.div`
    width: 100%;
`;

export const ContainerNovoChamado = styled.div`
    width: 100%;

    display: flex;
    justify-content: end;
`;