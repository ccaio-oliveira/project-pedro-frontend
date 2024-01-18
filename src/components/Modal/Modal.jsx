import { ModalContainer } from "./Modal.styles";

const ModalTemplate = ({ isOpen, onRequestClose, child }) => {
    return (
        <ModalContainer>
            {child}
        </ModalContainer>
    )
}

export default ModalTemplate;