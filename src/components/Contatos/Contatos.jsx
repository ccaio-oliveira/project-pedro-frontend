import { useState } from "react";
import { BotaoUsuario, ContainerBotaoC, ContainerContatos, ContainerTabelaContato, SecondTextBotaoContato, TextBotaoContato } from "./Contatos.styles";
import TabelaContatos from "./TabelaContatos/TabelaContatos";
import { useNavigate } from 'react-router-dom';

const Contatos = () => {
    const [tipoUsuario, setTipoUsuario] = useState(1);

    const navigate = useNavigate();

    const handleTipoUsuario = (tipo) => {
        setTipoUsuario(tipo);
        navigate(`/contato?tipoUsuario=${tipo}`);
    }

    return (
        <ContainerContatos>
            <ContainerBotaoC>
                <BotaoUsuario medicos="true" onClick={() => handleTipoUsuario(2)}>
                    <TextBotaoContato>Médicos</TextBotaoContato>
                    <SecondTextBotaoContato>Exibir contatos de médicos</SecondTextBotaoContato>
                </BotaoUsuario>

                <BotaoUsuario secretarias="true" onClick={() => handleTipoUsuario(3)}>
                    <TextBotaoContato>Secretárias</TextBotaoContato>
                    <SecondTextBotaoContato>Exibir contatos das secretárias</SecondTextBotaoContato>
                </BotaoUsuario>
            </ContainerBotaoC>

            <ContainerTabelaContato>
                <TabelaContatos tipoUsuario={tipoUsuario} />
            </ContainerTabelaContato>
        </ContainerContatos>
    )
}

export default Contatos;