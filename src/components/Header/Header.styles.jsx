import styled from 'styled-components';

export const ContainerHeader = styled.header`
    display: none;

    @media (max-width: 914px){
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 2rem;
        background-color: #f5f5f5;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
`;

export const ContainerBars = styled.div`
    cursor: pointer;
`;

export const ContainerInfos = styled.div`

`;

export const ContainerIconBell = styled.div`
    
`;