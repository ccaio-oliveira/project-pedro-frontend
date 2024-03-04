import { PropTypes } from 'prop-types';
import { BtnCloseAlert, IconAlert, MainText, Message } from '../AlertTemplate.styles';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';

library.add(faCheckCircle);

const SuccessAlert = ({ message, close }) => {
    return (
        <>
            <IconAlert icon={['far', 'check-circle']} size='3x' $success="true" />
            <MainText $success="true">SUCESSO!</MainText>
            <Message>{message}</Message>
            <BtnCloseAlert $success="true" onClick={close}>Fechar</BtnCloseAlert>
        </>
    )
}

SuccessAlert.propTypes = {
    message: PropTypes.string.isRequired,
    close: PropTypes.func.isRequired
}

export default SuccessAlert;