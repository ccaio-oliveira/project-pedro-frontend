import { styled } from 'styled-components';
import { BotaoAcao } from '../../global.styles';
import { ErrorP } from '../../pages/Login/Login.styles';

export const ContainerRelatorios = styled.div`
    padding: 20px;
`;

export const ContainerBotaoP = styled.div`
    width: 100%;
    margin-bottom: 30px;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

export const BotaoPrioridade = styled.div`
    background: ${(props) => (props.type == "prioridade" ? '#DD0E0E' : (props.type == "nao_urgente" ? '#336B8A' : '#35393B'))};
    width: 30%;

    padding: 12px;

    border-radius: 17px;
    cursor: pointer;

    @media (max-width: 936px){
        width: 25%;
    }

    @media (max-width: 776px){
        width: 100%;
        margin-bottom: 10px;
    }
`;

export const TextBotaoPrioridade = styled.p`
    color: #FFF;
    font-weight: 600;
    font-size: 0.9rem;

    margin: 0;
`;

export const SecondTextBotaoPrioridade = styled.p`
    color: #FFF;
    font-weight: 600;
    font-size: 0.9rem;
    opacity: 0.5;

    margin: 0;
`;

export const ContainerTabelaRelatorios = styled.div`
    width: 100%;
`;

export const ContainerNovoChamado = styled.div`
    width: 99%;

    display: flex;
    justify-content: end;
    padding-bottom: 50px;
`;

export const BotaoExpRelatorios = styled(BotaoAcao)`
    margin-right: 10px;
`;

export const ErrorRelatorio = styled(ErrorP)`
    margin: 0;

    margin-top: 5px;
`;