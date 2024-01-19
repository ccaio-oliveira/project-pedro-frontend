import { ModalBackground, ModalBody, ModalCloseButton, ModalContainer, ModalFooter, ModalHeader, ModalTitle } from "./Modal.styles";

const ModalTemplate = ({ title, isOpen, onRequestClose, child }) => {
    return (
        <ModalBackground onClick={onRequestClose}>
            <ModalContainer>
                <ModalHeader>
                    <ModalTitle>
                        {title}
                    </ModalTitle>
                    <ModalCloseButton onClick={onRequestClose}>X</ModalCloseButton>
                </ModalHeader>

                <ModalBody>
                    {child}
                </ModalBody>

                <ModalFooter>

                </ModalFooter>
            </ModalContainer>
        </ModalBackground>
    )
}

export default ModalTemplate;