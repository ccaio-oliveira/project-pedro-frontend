import styled from 'styled-components';

export const PaginationContainer = styled.ul`
    display: flex;
    list-style: none;
`;

export const PaginationItem = styled.li`
    padding: 0 12px;
    height: 32px;
    text-align: center;
    margin: auto 4px;
    color: rgba(0, 0, 0, 0.87);
    display: flex;
    box-sizing: border-box;
    align-items: center;
    letter-spacing: 0.01071em;
    border-radius: 16px;
    line-height: 1.43;
    font-size: 13px;
    min-width: 32px;

    &:hover {
        background-color: rgba(0, 0, 0, 0.04);
        cursor: pointer;
    }

    &.dots {
        cursor: default;
    }
`;