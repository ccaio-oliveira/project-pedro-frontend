import styled from 'styled-components';
import { SimbolGrau } from '../../Relatorios/TabelaRelatorios/TabelaRelatorios.styles';

export const TableContent = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
`;

export const CalendarDay = styled.div`
    width: 57.56px;
    height: 57.56px;
    position: relative;
    background: #F2F3F7;
    border: 0.9px solid #D5D4DF;
    cursor: pointer;

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
    
`;