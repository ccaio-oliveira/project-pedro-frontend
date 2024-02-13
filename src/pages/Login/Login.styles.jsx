import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

export const LoginElement = styled.div`
    display: flex;
    flex-wrap: wrap;

    @media (max-width: 686px){
        width: 100%;
        flex-direction: column;

        margin-top: 30px;
    }
`;

export const LeftElement = styled.div`
    width: 50%;
    background: #FFF;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media (max-width: 686px){
        width: 100%;
    }
`;

export const ImgElement = styled.img`
    width: 450px;
    background: #FFF;

    @media (max-width: 910px){
        width: 350px;
    }

    @media (max-width: 686px){
        width: 250px;
    }
`;

export const TextElement = styled.div`
    width: 23rem;
    margin-top: 20px;

    @media (max-width: 910px){
        width: 20rem;
    }

    @media (max-width: 686px){
        width: 50%;
        text-align: center;
    }

    @media (max-width: 440px){
        width: 90%;
    }
`;

export const TextH1 = styled.h1`
    font-weight: 400;
    font-size: 34px;

    @media (max-width: 910px){
        font-size: 28px;
    }

    @media (max-width: 686px){
        font-size: 24px;
    }

    @media (max-width: 440px){
        font-size: 20px;
    }
`;

export const TextP = styled.p`
    margin-top: 10px;
    font-weight: 500;

    @media (max-width: 910px){
        font-size: 0.9rem;
    }
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

    @media (max-width: 686px){
        width: 100%;
        height: 100%;
        margin-top: 10px;

        border-radius: 17px 17px 0px 0px;
    }
`;

export const Direitos = styled.div`
    position: relative;
    top: 80px;

    text-align: center;
    color: #D9D5D5;

    @media (max-width: 686px){
        top: 0px;
        margin: 30px 0px;
    }
`;

export const FormElement = styled.form`
    display: flex;
    flex-direction: column;

    margin-top: 20px;

    @media (max-width: 686px){
        margin-top: 16px;
    }

    @media (max-width: 440px){
        width: 90%;
    }
`;

export const FormGroupLogin = styled.div`
    display: flex;
    flex-direction: column;

    margin-top: 20px;

    @media (max-width: 686px){
        margin-top: 10px;
    }
`;

export const FormLabelLogin = styled.label`
    font-size: 1.2rem;

    @media (max-width: 910px){
        font-size: 1.0rem;
    }

    @media (max-width: 440px){
        font-size: 0.9rem;
    }
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

    @media (max-width: 910px){
        width: 18rem;
    }

    @media (max-width: 440px){
        width: 90%;
    }
`;

export const ErrorP = styled.p`
    color: red;
    margin-top: 20px;

    @media (max-width: 910px){
        font-size: 0.9rem;
    }
`;

export const ForgotPasswordP = styled.p`
    color: #9BBEC8;
    text-decoration: none;

    display: block;

    margin: 14px 0px;

    cursor: pointer;

    @media (max-width: 910px){
        font-size: 0.9rem;
    }

    @media (max-width: 686px){
        margin: 0px 0px 10px;
    }
`;

export const BtnLogin = styled.button`
    width: 100%;
    font-size: 1.0rem;

    padding: 15px;

    background: #FFF;

    border: none;
    border-radius: 17px;

    cursor: pointer;

    @media (max-width: 910px){
        font-size: 0.9rem;
    }
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

    @media (max-width: 910px){
        left: 290px;
    }

    @media (max-width: 440px){
        left: 350px;
    }
`;

export const InfoForgotContainer = styled(ForgotPasswordP)`
    width: 23rem;

    font-size: 0.8rem;
`;
