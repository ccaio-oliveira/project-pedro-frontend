import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

export const AlertBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999999999;

    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const AlertContainer = styled.div`
    background: #FFF;

    width: 30%;

    border-radius: 17px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
`;

export const AlertBody = styled.div`
    padding: 10px;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const IconAlert = styled(FontAwesomeIcon)`
    color: #FFF;
    background: ${(props) => (props.$success ? '#00FF00' : '#FF0000')};

    padding: 10px;
    /* border: 3px solid #FFF; */
    border-radius: 50%;

    position: relative;
    top: -30px;
`;

export const Message = styled.p`
    color: #000;
    margin-top: 20px;

    text-align: center;
`;

export const BtnCloseAlert = styled.button`
    background: ${(props) => (props.$success ? '#00FF00' : '#FF0000')};

    color: #FFF;
    font-weight: bold;

    padding: 10px;
    margin-top: 20px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
`;

export const MainText = styled.h3`
    color: ${(props) => (props.$success ? '#00FF00' : '#FF0000')};
    margin-top: 20px;
`;
