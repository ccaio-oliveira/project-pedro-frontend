import { styled } from 'styled-components';

export const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99999;

    width: 100%;
    height: 100%;

    background: rgba(0, 0, 0, 0.3);

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    background: #FFF;

    width: 60%;

    border-radius: 17px;

    padding-bottom: 20px;

    @media (max-width: 670px){
        width: 80%;
    }

    @media (max-width: 410px){
        width: 100%;
        height: 100%;
        border-radius: 0;
    }
`;

export const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 30px;

    width: 85%;

    border-bottom: 1px solid #E5E5E5;
`;

export const ModalTitle = styled.h2`
    margin: 0;
`;

export const ModalCloseButton = styled.button`
    width: 10px;
    height: 10px;

    background: none;
    border: none;

    font-size: 1.3rem;
    font-weight: bold;

    cursor: pointer;
`;

export const ModalBody = styled.div`
    width: 100%;
    max-height: 350px;
    
    display: flex;
    justify-content: center;

    overflow-y: auto;
    overflow-x: hidden;

    &::-webkit-scrollbar {
        width: 5px;
    }

    &::-webkit-scrollbar-thumb {
        background: #35393B;
        border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
        background: #E5E5E5;
        border-radius: 10px;
    }

    @media (max-width: 410px){
        padding: 20px;
    }
`;

export const ModalFooter = styled.div`
    width: 80%;

    padding: 20px;

    display: flex;
    justify-content: space-between;
`;