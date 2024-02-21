import styled from 'styled-components';
import { InputData } from '../../../../global.styles';

export const ModalSenhaContainer = styled.div`

`;

export const InputPassword = styled(InputData)`
    &:focus {
        &:focus-visible {
            outline: none;
        }

        border-color: ${(props) => props.erro ? '#FF0000' : '#00FF00'};
    }
`;