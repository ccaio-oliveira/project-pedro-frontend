import styled from 'styled-components';
import { SimbolGrau } from '../../Relatorios/TabelaRelatorios/TabelaRelatorios.styles';

export const TableContent = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
`;

export const CalendarDay = styled.div`
    width: 13%;
    height: 50px;
    position: relative;
    background: #F2F3F7;
    border: 0.9px solid #D5D4DF;
    cursor: pointer;
    font-size: 0.8rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &.current{
        background: #FFF;
        color: #000;
    }

    &.selected{
        background: #70A7C4;
        color: #FFF;
    }

    &:hover{
        background: #04293D;
        color: #FFF;
    }
`;

export const ContainerCalendarGrau = styled.div`
    display: flex;
    flex-direction: row;
`;

export const CalendarDayGrau = styled(SimbolGrau)`
    background: ${props => props.$grautabela === 'prioridade' ? '#DD0E0E' : props.$grautabela === 'nao_urgente' ? '#336B8A' : '#35393B'};
`;