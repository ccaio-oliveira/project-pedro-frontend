import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

export const AlertBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const AlertContainer = styled.div`
    background: #f2f2f2;

    border-radius: 17px;
`;

export const AlertHeader = styled.div`
    color: #000;

    padding: 10px;

    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

export const AlertBody = styled.div`
    padding: 10px;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const IconAlert = styled(FontAwesomeIcon)`
    color: ${(props) => (props.success ? '#00FF00' : '#FF0000')};

    padding: 3px;
    border: 3px solid ${(props) => (props.success ? '#00FF00' : '#FF0000')};;
    border-radius: 50%;
`;

export const Message = styled.p`
    color: #000;
    margin-top: 20px;
`;

export const BtnCloseAlert = styled.button`
    background: ${(props) => (props.success ? '#00FF00' : '#FF0000')};

    color: #FFF;
    font-weight: bold;

    padding: 10px;
    margin-top: 20px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
`;
