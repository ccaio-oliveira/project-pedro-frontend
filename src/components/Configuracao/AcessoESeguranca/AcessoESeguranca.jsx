import { ConfigElements, ConfigElementsGroup, ConfigElementsIcon, ConfigElementsP, ConfigElementsSpan, ConfigElementsText } from "../Configuracao.styles";
import Carregando from "../../Carregando/Carregando";
import { useAuth } from "../../../context/AuthContext";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import ModalEmail from "./ModalEmail/ModalEmail";
import ModalTelefone from "./ModalTelefone/ModalTelefone";
import ModalUsuario from "./ModalUsuario/ModalUsuario";
import ModalSenha from "./ModalSenha/ModalSenha";

library.add(faArrowRightLong);

const AcessoESeguranca = () => {
    const { sessao, headers } = useAuth();
    const [dataUser, setDataUser] = useState({});

    const [isLoading, setIsLoading] = useState(false);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const handleInfoUser = async () => {
        setIsLoading(true);
        await axios.get('/api/usuarioPerfil', {
            params: {
                usuario_id: sessao.id
            },
            headers
        }).then((res) => {
            setDataUser(res.data);
            setIsLoading(false);
        })
    }

    const formatNumberPhone = (number) => {
        return number.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, "+$1 ($2) $3-$4");
    }

    const openModal = (content) => {
        if(content === 'email'){
            setModalContent(<ModalEmail handleClose={closeModal} email={dataUser.email} />);
        }

        if(content === 'whatsapp'){
            setModalContent(<ModalTelefone handleClose={closeModal} telefone={dataUser.telefone_whats} tipo="whatsapp" />);
        }

        if(content === 'celular'){
            setModalContent(<ModalTelefone handleClose={closeModal} telefone={dataUser.telefone_cel} tipo="celular" />);
        }

        if(content === 'usuario'){
            setModalContent(<ModalUsuario handleClose={closeModal} usuario={dataUser.nome_completo} />);
        }

        if(content == 'senha'){
            setModalContent(<ModalSenha handleClose={closeModal} />);
        }

        setModalIsOpen(true);
    }

    const closeModal = () => {
        setModalIsOpen(false);
    }

    useEffect(() => {
        handleInfoUser();
    }, [modalIsOpen]);

    return (
        <>
            {isLoading ? (
                <Carregando title="Carregando informações do usuário" />
            ) : (
                <ConfigElements>
                    <ConfigElementsGroup onClick={() => openModal('email')}>
                        <ConfigElementsText>
                            <ConfigElementsP>Endereço de e-mail registrado</ConfigElementsP>
                            <ConfigElementsSpan>{dataUser.email}</ConfigElementsSpan>
                        </ConfigElementsText>

                        <ConfigElementsIcon icon={['fas', 'arrow-right-long']} />
                    </ConfigElementsGroup>

                    <ConfigElementsGroup onClick={() => openModal('whatsapp')}>
                        <ConfigElementsText>
                            <ConfigElementsP>WhatsApp</ConfigElementsP>
                            <ConfigElementsSpan>{formatNumberPhone(dataUser.telefone_whats ? dataUser.telefone_whats : '')}</ConfigElementsSpan>
                        </ConfigElementsText>

                        <ConfigElementsIcon icon={['fas', 'arrow-right-long']} />
                    </ConfigElementsGroup>

                    <ConfigElementsGroup onClick={() => openModal('celular')}>
                        <ConfigElementsText>
                            <ConfigElementsP>Número de telefone</ConfigElementsP>
                            <ConfigElementsSpan>{formatNumberPhone(dataUser.telefone_cel ? dataUser.telefone_cel : '')}</ConfigElementsSpan>
                        </ConfigElementsText>

                        <ConfigElementsIcon icon={['fas', 'arrow-right-long']} />
                    </ConfigElementsGroup>

                    <ConfigElementsGroup onClick={() => openModal('usuario')}>
                        <ConfigElementsText>
                            <ConfigElementsP>Nome disponibilizado</ConfigElementsP>
                            <ConfigElementsSpan>{dataUser.nome_completo}</ConfigElementsSpan>
                        </ConfigElementsText>

                        <ConfigElementsIcon icon={['fas', 'arrow-right-long']} />
                    </ConfigElementsGroup>

                    <ConfigElementsGroup onClick={() => openModal('senha')}>
                        <ConfigElementsText>
                            <ConfigElementsP>Alterar senha</ConfigElementsP>
                            <ConfigElementsSpan>********</ConfigElementsSpan>
                        </ConfigElementsText>

                        <ConfigElementsIcon icon={['fas', 'arrow-right-long']} />
                    </ConfigElementsGroup>
                </ConfigElements>
            )}

            {modalIsOpen && (
                <>
                    {modalContent}
                </>
            )}
        </>
    );
}

export default AcessoESeguranca;