import styled from 'styled-components';
import { ContainerDataRel, ContainerTextGrau, InfoTabelaRelatorio, SimbolGrau, TDChamado, TextGrau } from '../../Relatorios/TabelaRelatorios/TabelaRelatorios.styles';
import { IconWhats } from '../../Relatorios/ModalDetAchado/ModalDetAchado.styles';

export const InfoTabelaContatos = styled(InfoTabelaRelatorio)`

`;

export const ContainerTextTipo = styled(ContainerTextGrau)`

`;

export const SimbolTipo = styled(SimbolGrau)`
    background: ${props => props.$tipo == 1 ? '#04293D' : (props.$tipo == 2 ? '#164863' : '#336B8A')};
`;

export const TextTipo = styled(TextGrau)`
    color: ${props => props.$tipo == 1 ? '#04293D' : (props.$tipo == 2 ? '#164863' : '#336B8A')};
`;

export const ContainerDataCont = styled(ContainerDataRel)`

`;

export const TDContato = styled(TDChamado)`
    text-align: center;
`;

export const IconWhatsapp = styled(IconWhats)`
    
`;