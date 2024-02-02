import { styled } from 'styled-components';
import { TD } from '../../../global.styles';

export const InfoTabelaRelatorio = styled.div`
    width: 100%;
    
    display: flex;
    justify-content: space-between;
`;

export const ContainerTextGrau = styled.div`
    display: flex;
    align-items: center;

    font-size: 1.2rem;
`;

export const TextGrau = styled.p`
    color: ${(props) => (props.grauTabela === 'prioridade' ? '#DD0E0E' : (props.grauTabela === 'nao_urgente' ? '#336B8A' : '#35393B'))};
    font-weight: 600;
    margin-left: 5px;
`;

export const SimbolGrau = styled.div`
    width: 11px;
    height: 11px;

    background: ${(props) => (props.grautabela === 'prioridade' ? '#DD0E0E' : (props.grautabela === 'nao_urgente' ? '#336B8A' : '#35393B'))};
    border-radius: 50%;
`;

export const ContainerDataRel = styled.div`
    display: flex;
    align-items: center;
`;

export const TextData = styled.p`
    margin: 0px 10px;
`;

export const StatusRelatorio = styled.p`
    color: ${(props) => (props.status === 'Pendente' ? '#04293D' : (props.status === 'Novo' ? '#B80000' : '#289C00'))};
    font-weight: 600;

    & > svg {
        margin-right: 8px;
    }
`;

export const TDChamado = styled(TD)`
    width: 50rem;
`;

export const TDData = styled(TD)`
    width: 25rem;

    text-align: center;
`;

export const TDStatus = styled(TD)`
    width: 30rem;

    text-align: center;
`;