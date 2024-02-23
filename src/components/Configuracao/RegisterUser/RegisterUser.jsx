import { ConfigElements, ConfigElementsGroup, ConfigElementsIcon, ConfigElementsP, ConfigElementsSpan, ConfigElementsText } from "../Configuracao.styles";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../../context/AuthContext";

library.add(faArrowRightLong);

const RegisterUser = () => {
    const { sessao } = useAuth();

    return (
        <>
            <ConfigElements>
                {sessao.perfil_usuario == 1 && (
                    <>
                        <ConfigElementsGroup>
                            <ConfigElementsText>
                                <ConfigElementsP>Médico</ConfigElementsP>
                                <ConfigElementsSpan>Cadastrar no banco de dados</ConfigElementsSpan>
                            </ConfigElementsText>

                            <ConfigElementsIcon icon={['fas', 'arrow-right-long']} />
                        </ConfigElementsGroup>

                        <ConfigElementsGroup>
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
        </>
    )
}

export default RegisterUser;