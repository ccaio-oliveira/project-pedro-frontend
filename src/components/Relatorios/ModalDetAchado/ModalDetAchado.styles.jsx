import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

export const ModalDetAchadoContainer = styled.div`
    width: 100%;

    padding: 20px;
`;

export const ItemContainer = styled.div`
    display: flex;
    justify-content: space-between;

    margin-bottom: 10px;
`;

export const ItemTitle = styled.p`
    font-weight: 600;
`;

export const ItemDescription = styled.p`
    cursor: pointer;
`;

export const ItemContainerAssunto = styled(ItemContainer)`
    flex-direction: column;
`;

export const ItemTitleAssunto = styled(ItemTitle)`
    margin-bottom: 5px;

    font-size: 1.2rem;
`;

export const ItemDescriptionAssunto = styled(ItemDescription)`
    width: 100%;
    text-align: center;

    padding: 15px;
`;

export const TextDescription = styled.p`
    margin-top: 10px;
    margin-bottom: 10px;
`;

export const ItemDescriptionCopy = styled(ItemContainer)`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const IconCopy = styled(FontAwesomeIcon)`
    margin-left: 10px;
    cursor: pointer;
`;

export const MensagemCopiada = styled(ItemDescription)`
    color: green;
`;

export const IconWhats = styled.a`
    color: green;
    font-size: 1.5rem;
    cursor: pointer;
`;