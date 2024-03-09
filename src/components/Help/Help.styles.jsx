import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

export const HelpContainer = styled.div`
    padding: 30px;
`;

export const HelpHeader = styled.div`
    margin-top: 30px;
    border-bottom: 1px solid #D9D5D5;
`;

export const HelpTitle = styled.h2`
    font-size: 1.5rem; 
`;

export const HelpSubTitle = styled.p`
    margin: 15px 0px; 
`;

export const HelpBody = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 30px;

    @media (max-width: 1016px){
        justify-content: space-between;
    }
`;

export const QuestionContainer = styled.div`
    width: 25%;
    margin-right: 4%;
    margin-bottom: 30px;

    padding: 20px;
    background: #FFF;
    box-shadow: 0px 0px 5px #D9D5D5;
    border-radius: 8px;

    @media (max-width: 1319px){
        width: 20%;
        margin-right: 1%;
    }

    @media (max-width: 1016px){
        margin-right: 2%;
    }

    @media (min-width: 661px){
        min-width: 250px;
    }

    @media (max-width: 660px){
        width: 100%;
        padding: 20px;
        background: #FFF;
        box-shadow: 0px 0px 5px #D9D5D5;
        border-radius: 8px;
    }
`;

export const QuestionTop = styled.div`
    
`;

export const QuestionIcon = styled(FontAwesomeIcon)`
    margin-right: 10px;
    font-size: 1.5rem;

    color: #70A7C4;
`;

export const QuestionTitle = styled.h3`
    
`;

export const QuestionBody = styled.div`
    margin-top: 10px;
`;

export const BoldItem = styled.span`
    font-weight: bolder;
`;

export const SupportContainer = styled.div`
    position: fixed;
    bottom: 20px;

    width: 60%;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    background: #336B8A;
    border-radius: 17px;

    @media (max-width: 1201px){
        width: 80%;
        left: 5%;
    }

    @media (max-width: 510px){
        flex-wrap: wrap;
    }
`;

export const SupportText = styled.div`
    margin-bottom: 10px;
`;

export const SupportTitle = styled.h2`
    font-size: 1.2rem;
    margin: 0;
    color: #FFF;

    @media (max-width: 510px){
        font-size: 1.0rem;
    }
`;

export const SupportSubTitle = styled.p`
    margin: 0px;
    color: #D9D5D5;

    @media (max-width: 510px){
        font-size: 0.8rem;
    }
`;

export const SupportButton = styled.a`
    text-decoration: none;
    color: #FFF;
    padding: 10px 20px;
    background: #04293D;
    border-radius: 8px;
`;