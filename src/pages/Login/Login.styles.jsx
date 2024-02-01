import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

export const LoginElement = styled.div`
    display: flex;
`;

export const LeftElement = styled.div`
    width: 50%;
    background: #FFF;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const ImgElement = styled.img`
    width: 450px;
    background: #FFF;
`;

export const TextElement = styled.div`
    width: 23rem;
    margin-top: 20px;
`;

export const TextH1 = styled.h1`
    font-weight: 400;
    font-size: 34px;
`;

export const TextP = styled.p`
    margin-top: 10px;
    font-weight: 500;
`;

export const RightElement = styled.div`
    background: #164863;
    color: #FFF;

    width: 50%;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const Direitos = styled.div`
    position: relative;
    top: 80px;

    text-align: center;
    color: #D9D5D5;
`;

export const FormElement = styled.form`
    display: flex;
    flex-direction: column;

    margin-top: 20px;
`;

export const FormGroupLogin = styled.div`
    display: flex;
    flex-direction: column;

    margin-top: 20px;
`;

export const FormLabelLogin = styled.label`
    font-size: 1.2rem;
`;

export const InputFormLogin = styled.input`
    width: 20rem;
    margin-top: 5px;

    padding: 15px 30px 15px 10px;
    background: none;

    border: 1px solid #70A7C4;
    border-radius: 8px;

    color: #FFF;

    & ::placeholder {
        color: #FFF;
        font-size: 0.9rem;
    }
`;

export const ErrorP = styled.p`
    color: red;
    margin-top: 20px;
`;

export const ForgotPasswordP = styled.p`
    color: #9BBEC8;
    text-decoration: none;

    display: block;

    margin: 14px 0px;

    cursor: pointer;
`;

export const BtnLogin = styled.button`
    width: 100%;
    font-size: 1.0rem;

    padding: 15px;

    background: #FFF;

    border: none;
    border-radius: 17px;

    cursor: pointer;
`;

export const BtnNext = styled(BtnLogin)`
    background: #70A7C4;

    margin: 15px 0px;
`;

export const IconEye = styled(FontAwesomeIcon)`
    width: 22px;

    position: relative;
    left: 325px;
    bottom: 32px;
    cursor: pointer;
`;

export const InfoForgotContainer = styled(ForgotPasswordP)`
    width: 23rem;

    font-size: 0.8rem;
`;
