import { styled } from 'styled-components';
import { InputData, TD } from '../../../global.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const InfoTabelaRelatorio = styled.div`
    width: 100%;
    
    display: flex;
    justify-content: space-between;

    @media (max-width: 776px){
        flex-wrap: wrap;
    }
`;

export const ContainerTextGrau = styled.div`
    display: flex;
    align-items: center;

    font-size: 1.2rem;

    @media (max-width: 810px){
        margin-right: 20px;
    }

    @media (max-width: 776px){
        margin-bottom: 20px;
    }
`;

export const TextGrau = styled.p`
    color: ${(props) => (props.type === 'prioridade' ? '#DD0E0E' : (props.type === 'nao_urgente' ? '#336B8A' : '#35393B'))};
    font-weight: 600;
    margin-left: 5px;
`;

export const SimbolGrau = styled.div`
    width: 11px;
    height: 11px;

    background: ${(props) => (props.type === 'prioridade' ? '#DD0E0E' : (props.type === 'nao_urgente' ? '#336B8A' : '#35393B'))};
    border-radius: 50%;
`;

export const ContainerSearch = styled.div`
    display: flex;
    align-items: center;

    @media (max-width: 641px){
        width: 40%;
    }

    @media (max-width: 654px){
        width: 100%;
        margin-top: 20px;
    }
`;

export const InputSearch = styled(InputData)`
    width: 100%;
    padding: 10px 10px;

    border-radius: 20px;
`;

export const IconSearch = styled(FontAwesomeIcon)`
    position: relative;

    @media (min-width: 655px){
        left: -2rem;
    }

    @media (max-width: 654px){
        right: 2.5rem;
    }
`;

export const ContainerDataRel = styled.div`
    display: flex;
    align-items: center;

    @media (max-width: 776px){
        width: 100%;
    }

    @media (max-width: 654px){
        flex-wrap: wrap;
        flex-direction: column-reverse;
        align-items: flex-start;
    }
`;

export const ContainerData = styled.div`
    display: flex;
    align-items: center;

    @media (max-width: 654px){
        width: 100%;
        margin-top: 10px;
        flex-direction: column;
        align-items: flex-start;
    }
`;

export const TextData = styled.p`
    margin: 0px 10px;
`;

export const StatusRelatorio = styled.p`
    color: ${(props) => (props.$status === 'Pendente' ? '#04293D' : (props.$status === 'Novo' ? '#B80000' : '#289C00'))};
    font-weight: 600;

    & > svg {
        margin-right: 8px;
    }
`;

export const TDChamado = styled(TD)`
    width: 30%;
`;

export const TDData = styled(TD)`
    width: 30%;

    text-align: center;
`;

export const TDStatus = styled(TD)`
    width: 30%;

    text-align: center;
`;