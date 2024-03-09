import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

export const ContainerNavBackground = styled.div`

    width: 18%;
    margin-right: 40px;
    transition: all 0.1s ease-in-out;

    @media (max-width: 914px){
        display: ${(props) => props.$isOpen ? 'block' : 'none'};
        justify-content: space-between;
        align-items: center;

        width: 100%;
        height: 100%;

        background: rgba(0, 0, 0, 0.5);

        position: fixed;
        top: 0;
        left: 0;

        z-index: 1000;
    }
`;

export const ContainerNav = styled.div`
    width: 100%;
    height: 100%; 
    padding: 50px 20px;

    background: #164863;
    color: #fff;

    transition: all 0.1s ease-in-out;

    @media (max-width: 914px){
        display: ${(props) => props.$isOpen ? 'block' : 'none'};
        position: fixed;
        width: 30%;
    }

    @media (max-width: 536px){
        width: 50%;
    }
`;

export const ContainerNavHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 50px;
`;

export const SpecImg = styled.img`
    width: 8rem;

    @media (max-width: 914px){
        margin: 0;
    }
`;

export const ButtonCloseMenu = styled.button`
    border: none;
    background: none;

    font-size: 1.5rem;
    color: #FFF;

    cursor: pointer;

    &:hover {
        color: #70A7C4;
    }
`;

export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;

    width: 80%;

    @media (max-width: 1245px){
        width: 100%;
    }
`;

export const NavLinkContainer = styled.div`
    display: flex;
    align-items: center;

    font-size: 1.1rem;

    margin-top: 30px;

    @media (max-width: 996px){
        font-size: 1.1rem;
    }

    @media (max-width: 932px){
        font-size: 1rem;
    }
`;

export const IconElement = styled.i`
    width: 30px;
    margin-right: 10px;
`;

export const IconElementInfo = styled(IconElement)`
    font-size: 0.7rem;

    padding: 2px 7px;

    border: 2px solid ${(props) => (props.$itemselected ? '#70A7C4' : '#FFF')};
    border-radius: 50%;
`;

export const TextIcon = styled(Link)`
    color: ${(props) => (props.itemselected ? '#70A7C4' : '#FFF')};
    text-decoration: none;

    &:hover {
        color: #70A7C4;
    }
`;

export const ContentOptions = styled.div`
    margin-top: 30px;
    
    border-top: 4px solid #FFF;
    border-radius: 1px;
`;

export const ButtonLogout = styled.button`
    border: none;
    background: none;

    font-size: 1.1rem;
    color: #fff;

    cursor: pointer;

    &:hover {
        color: #70A7C4;
    }
`;
