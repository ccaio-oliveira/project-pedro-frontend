import styled from 'styled-components';

export const CarregarContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: auto;

    padding: 2rem;
`;

export const Spinner = styled.div`
    display: inline-block;

    width: 60px;
    height: 60px;

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