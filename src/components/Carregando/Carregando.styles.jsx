import styled from 'styled-components';

export const CarregarContainer = styled.div`
    width: 100%;
    height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    position: absolute;
    top: 0;
    left: 0;
    padding: 2rem;

    background: rgba(0,0,0,0.5);
    color: #FFF;
`;

export const Spinner = styled.div`
    display: inline-block;

    width: 60px;
    height: 60px;
    margin-bottom: 10px;

    border: 8px solid rgba(0,0,0,0.2);
    border-top-color: #70A7C4;
    border-right-color: #70A7C4;
    border-radius: 50%;
    animation: spin 1s linear infinite;

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }
`;

export const TextLoading = styled.p`
    animation: pisca 1s alternate-reverse infinite;

    @keyframes pisca {
        0% {
            opacity: 0;
        }

        100% {
            opacity: 1;
        }
    }
`;