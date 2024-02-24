import { ConfigElements, ConfigElementsGroup, ConfigElementsIcon, ConfigElementsP, ConfigElementsSpan, ConfigElementsText } from "../Configuracao.styles";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../../context/AuthContext";
import { useState } from "react";
import DoctorModal from "./DoctorModal/DoctorModal";
import AdminModal from "./AdminModal/AdminModal";

library.add(faArrowRightLong);

const RegisterUser = () => {
    const { sessao } = useAuth();
    const [content, setContent] = useState('');

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = (content) => {
        if(content === 'doctor'){
            setContent(<DoctorModal handleClose={handleClose} />);
        }

        if(content === 'admin'){
            setContent(<AdminModal handleClose={handleClose} />);
        }

        // if(content === 'secretary'){
        //     setContent(<SecretaryModal handleClose={handleClose} />);
        // }

        // if(content === 'delete'){
        //     setContent(<DeleteModal handleClose={handleClose} />);
        // }

        setModalIsOpen(true);
    }

    const handleClose = () => {
        setModalIsOpen(false);
    }

    return (
        <>
            <ConfigElements>
                {sessao.perfil_usuario == 1 && (
                    <>
                        <ConfigElementsGroup onClick={() => openModal('doctor')}>
                            <ConfigElementsText>
                                <ConfigElementsP>Médico</ConfigElementsP>
                                <ConfigElementsSpan>Cadastrar no banco de dados</ConfigElementsSpan>
                            </ConfigElementsText>

                            <ConfigElementsIcon icon={['fas', 'arrow-right-long']} />
                        </ConfigElementsGroup>

                        <ConfigElementsGroup onClick={() => openModal('admin')}>
                            <ConfigElementsText>
                                <ConfigElementsP>Administrador</ConfigElementsP>
                                <ConfigElementsSpan>Cadastrar no banco de dados</ConfigElementsSpan>
                            </ConfigElementsText>

                            <ConfigElementsIcon icon={['fas', 'arrow-right-long']} />
                        </ConfigElementsGroup>
                    </>
                )}

                {sessao.perfil_usuario !== 1 && (
                    <>
                        <ConfigElementsGroup>
                            <ConfigElementsText>
                                <ConfigElementsP>Secretária</ConfigElementsP>
                                <ConfigElementsSpan>Cadastrar no banco de dados</ConfigElementsSpan>
                            </ConfigElementsText>

                            <ConfigElementsIcon icon={['fas', 'arrow-right-long']} />
                        </ConfigElementsGroup>
                    </>
                )}

                {sessao.perfil_usuario == 1 && (
                    <ConfigElementsGroup>
                        <ConfigElementsText>
                            <ConfigElementsP>Excluir usuário</ConfigElementsP>
                            <ConfigElementsSpan>Excluir no banco de dados</ConfigElementsSpan>
                        </ConfigElementsText>

                        <ConfigElementsIcon icon={['fas', 'arrow-right-long']} />
                    </ConfigElementsGroup>
                )}
                
            </ConfigElements>

            {modalIsOpen && (
                <>
                    {content}
                </>
            )}
        </>
    )
}

export default RegisterUser;