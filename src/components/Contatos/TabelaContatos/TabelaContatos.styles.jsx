import styled from 'styled-components';
import { ContainerDataRel, ContainerTextGrau, InfoTabelaRelatorio, SimbolGrau, TDChamado, TextGrau } from '../../Relatorios/TabelaRelatorios/TabelaRelatorios.styles';

export const InfoTabelaContatos = styled(InfoTabelaRelatorio)`

`;

export const ContainerTextTipo = styled(ContainerTextGrau)`

`;

export const SimbolTipo = styled(SimbolGrau)`
    background: ${props => props.tipo == 2 ? '#04293D' : '#164863'};
`;

export const TextTipo = styled(TextGrau)`
    color: ${props => props.tipo == 2 ? '#04293D' : '#164863'};
`;

export const ContainerDataCont = styled(ContainerDataRel)`

`;

export const TDContato = styled(TDChamado)`

`;