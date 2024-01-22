import { ModalBackground, ModalBody, ModalCloseButton, ModalContainer, ModalFooter, ModalHeader, ModalTitle } from "./Modal.styles";
import PropTypes from 'prop-types';

const ModalTemplate = ({ title, onRequestClose, children }) => {
    return (
        <ModalBackground>
            <ModalContainer>
                <ModalHeader>
                    <ModalTitle>
                        {title}
                    </ModalTitle>
                    <ModalCloseButton onClick={onRequestClose}>X</ModalCloseButton>
                </ModalHeader>

                <ModalBody>
                    {children}
                </ModalBody>

                <ModalFooter>

                </ModalFooter>
            </ModalContainer>
        </ModalBackground>
    )
}

ModalTemplate.propTypes = {
    title: PropTypes.string.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
};

export default ModalTemplate;