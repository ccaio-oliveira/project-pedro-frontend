import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { ConfigElements, ConfigElementsGroup, ConfigElementsIcon, ConfigElementsP, ConfigElementsSpan, ConfigElementsText } from "../Configuracao.styles";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import PhotoModal from "./PhotoModal/PhotoModal";

library.add(faArrowRightLong);

const UserProfile = () => {
    const { sessao } = useAuth();

    const [content, setContent] = useState('');

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = (content) => {
        if(content === 'photo'){
            setContent(<PhotoModal handleClose={closeModal} />);
        }

        setModalIsOpen(true);
    }

    const closeModal = () => {
        setModalIsOpen(false);
    }

    return (
        <>
            <ConfigElements>
                <ConfigElementsGroup onClick={() => openModal('photo')}>
                    <ConfigElementsText>
                        <ConfigElementsP>Foto de perfil</ConfigElementsP>
                        <ConfigElementsSpan>Alterar foto de perfil</ConfigElementsSpan>
                    </ConfigElementsText>

                    <ConfigElementsIcon icon={['fas', 'arrow-right-long']} />
                </ConfigElementsGroup>

                <ConfigElementsGroup>
                    <ConfigElementsText>
                        <ConfigElementsP>Nomenclatura</ConfigElementsP>
                        <ConfigElementsSpan>Como gostaria de ser chamado: {sessao.apelido}</ConfigElementsSpan>
                    </ConfigElementsText>

                    <ConfigElementsIcon icon={['fas', 'arrow-right-long']} />
                </ConfigElementsGroup>
            </ConfigElements>

            {modalIsOpen && (
                <>
                    {content}
                </>
            )}
        </>
    );
}

export default UserProfile;