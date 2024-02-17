import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

export const ContainerNav = styled.div`
    width: 15%;
    height: 100vh;
    min-width: 15rem;
    padding: 50px 20px;

    background: #164863;
    color: #fff;

    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
`;

export const SpecImg = styled.img`
    width: 60%;

    margin-bottom: 50px;
`;

export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;

    height: 30%;
    width: 80%;
`;

export const NavLinkContainer = styled.div`
    display: flex;
    align-items: center;

    font-size: 1.3rem;

    margin-top: 30px;
`;

export const IconElement = styled.i`
    width: 30px;
    margin-right: 10px;
`;

export const IconElementInfo = styled(IconElement)`
    font-size: 0.7rem;

    padding: 2px 7px;

    border: 2px solid #FFF;
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

    font-size: 1.3rem;
    color: #fff;

    cursor: pointer;

    &:hover {
        color: #70A7C4;
    }
`;
