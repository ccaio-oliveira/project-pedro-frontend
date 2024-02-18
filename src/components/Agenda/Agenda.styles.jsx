import styled from 'styled-components';

export const Calendar = styled.div`
    width: 71%;
    display: flex;
    flex-direction: column;
`;

export const CalendarHeader = styled.div`
    width: 93%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const MonthTitle = styled.h2`

`;

export const PassMonth = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 15%;
`;

export const BtnPassMonth = styled.button`
    padding: 0.4rem;
    background: transparent;
    border: none;
    font-size: 1.0rem;
    color: #04293D;
    cursor: pointer;

    &:hover{
        background: #04293D;
        color: #FFF;
        padding: 5px 8px;
        border-radius: 50%;
    }
`;

export const CalendarBody = styled.div`
    width: 100%;
`;

export const TableHeader = styled.div`
    height: 50px;
    width: 93%;
    display: flex;
    align-items: center;

    font-weight: bold;
`;

export const WeekDay = styled.div`
    width: 100px;
    text-align: center;
`;