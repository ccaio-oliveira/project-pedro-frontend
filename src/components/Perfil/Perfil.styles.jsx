import styled from 'styled-components';

export const ContainerPerfil = styled.div`
    width: 100%;
`;

export const ContainerPerfilHeader = styled.div`
    width: 100%;
    height: 14rem;
    margin-bottom: 6rem;
    background: #04293D;

    display: flex;
    align-items: flex-end;
`;

export const ContainerInfoPerfil = styled.div`
    position: relative;
    top: 5rem;
    left: 2rem;
`;

export const PerfilImg = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;
`;

export const NomeUsuario = styled.h2`
    
`;

export const InfoUsuario = styled.p`

`;

export const ContainerPerfilBody = styled.div`
    width: 98%;
    padding-left: 20px;
    padding-bottom: 20px;

    display: flex;
    align-items: flex-start;

    @media (max-width: 915px){
        flex-direction: column-reverse;
        padding-left: 0;
    }
`;

export const ContainerTable = styled.div`
    width: 65%;
    max-height: 435px;
    overflow: auto;

    &::-webkit-scrollbar {
        width: 5px;
        height: 5px;
    }

    &::-webkit-scrollbar-thumb {
        background: #04293D;
        border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    @media (max-width: 915px){
        width: 100%;
        padding: 20px 10px 20px 0;
    }
`;

export const ContainerAgenda = styled.div`
    width: 35%;
    padding-left: 20px;

    @media (max-width: 600px){
        width: 100%;
        padding-left: 10px;
    }
`;