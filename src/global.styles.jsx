import { styled } from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    
    width: 100%;
`;

export const BotaoAcao = styled.button`
    color: #FFF;

    padding: 10px 25px;
    background: #04293D;

    border: none;
    border-radius: 17px;

    cursor: pointer;
`;

export const FormGroup = styled.div`
    width: 100%;
`;

export const FormLabel = styled.label`
    font-size: 0.9rem;
    font-weight: 500;

    margin-bottom: 5px;
`;

export const InputData = styled.input`
    width: 96%;
    border: 2px solid #35393B;
    border-radius: 4px;

    padding: 4px;

    font-family: 'Roboto';
    font-weight: 500;
    color: #35393B;
`;

export const SelectInput = styled.select`
    width: 100%;
    border: 2px solid #35393B;
    border-radius: 4px;

    padding: 5px;

    font-family: 'Roboto';
    font-weight: 500;
    color: #35393B;
`;

export const OptionSelect = styled.option`
    font-family: 'Roboto';
    font-weight: 500;
    color: #35393B;
`;

export const Tabela = styled.table`
    width: 100%;

    border-top: 3px solid #D9D5D5;
    margin: 20px 0px;
    padding-top: 20px;
`;

export const THead = styled.thead`
    border-bottom: 3px solid #D9D5D5;
`;

export const TH = styled.th`
    
`;

export const TBody = styled.tbody`
    
`;

export const TR = styled.tr`
    border-bottom: 3px solid #D9D5D5;
    text-align: center;
`;

export const TD = styled.td`
    
`;