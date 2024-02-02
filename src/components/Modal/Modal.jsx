import { BotaoAcao } from "../../global.styles";
import { ModalBackground, ModalBody, ModalCloseButton, ModalContainer, ModalFooter, ModalHeader, ModalTitle } from "./Modal.styles";
import PropTypes from 'prop-types';

const ModalTemplate = ({ title, onRequestClose, children, funcSubmit, modalFooter }) => {
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

                {modalFooter && (
                    <ModalFooter>
                        <BotaoAcao onClick={e => funcSubmit(e)}>Salvar</BotaoAcao>
                        <BotaoAcao onClick={onRequestClose}>Cancelar</BotaoAcao>
                    </ModalFooter>
                )}
            </ModalContainer>
        </ModalBackground>
    )
}

ModalTemplate.propTypes = {
    title: PropTypes.string.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    funcSubmit: PropTypes.func,
    modalFooter: PropTypes.bool
};

export default ModalTemplate;