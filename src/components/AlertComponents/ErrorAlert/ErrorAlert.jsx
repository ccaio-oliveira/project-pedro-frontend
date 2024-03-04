import { PropTypes } from 'prop-types';
import { BtnCloseAlert, IconAlert, Message } from '../AlertTemplate.styles';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

library.add(faCircleXmark);

const ErrorAlert = ({ message, close }) => {
    return (
        <>
            <IconAlert icon={['far', 'circle-xmark']} size='3x' $error="true" />
            <Message>{message}</Message>
            <BtnCloseAlert $error="true" onClick={close}>Fechar</BtnCloseAlert>
        </>
    )
}

ErrorAlert.propTypes = {
    message: PropTypes.string.isRequired,
    close: PropTypes.func.isRequired
}

export default ErrorAlert;