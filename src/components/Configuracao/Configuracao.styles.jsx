import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ConfigContainer = styled.div`
    width: 100%;
`;

export const ConfigTop = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
`;

export const ConfigTopLeft = styled.div`
    display: flex;
    flex-direction: column;

    width: 50%;
`;

export const ConfigTopRight = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    width: 50%;
`;

export const BtnConfigTop = styled.button`
    width: 50%;

    margin-bottom: 20px;
    padding: 6px 10px 10px 20px;

    border: 1px solid ${(props) => props.selected == 1 ? '#FFF' : '#0F1314'};
    border-radius: 30px;
    
    background: ${(props) => props.selected == 1 ? "#205978" : 'none'};
    cursor: pointer;

    color: ${(props) => props.selected == 1 ? "#fff" : '#000'};
    font-size: 1.0rem;
    text-align: left;

    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const ConfigIconChevron = styled(FontAwesomeIcon)`
    margin-right: 10px;
    font-size: 20px;
`;

export const ConfigMain = styled.div`

`;

export const ConfigContainerTitle = styled.div`
    border-bottom: 1px solid #D9D5D5;
`;

export const ConfigTitle = styled.h2`   
    font-size: 1.5rem;
`;

export const ConfigSubTitle = styled.p`
    margin: 15px 0px;
`;

export const ConfigComponent = styled.div`

`;

export const ConfigElements = styled.div`

`;

export const ConfigElementsGroup = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-top: 20px;

    cursor: pointer;
`;

export const ConfigElementsText = styled.div`

`;

export const ConfigElementsP = styled.p`
    font-size: 1.2rem;
    font-weight: 500;
`;

export const ConfigElementsSpan = styled.span`
    color: #35393B;
`;

export const ConfigElementsIcon = styled(FontAwesomeIcon)`
    font-size: 1.5rem;
    color: #000;
`;