import styled from 'styled-components';

export const BtnPhoto = styled.button`
    padding: 10px 20px;
    background: none;
    border-radius: 4px;

    cursor: pointer;
`;

export const DropContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-width: 2px;
    border-radius: 2px;
    border-color: #eeeeee;
    border-style: dashed;
    background-color: #fafafa;
    color: #bdbdbd;
    outline: none;
    transition: border .24s ease-in-out;
`;