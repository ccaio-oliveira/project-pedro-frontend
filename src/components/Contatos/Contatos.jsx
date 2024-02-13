import { BotaoUsuario, ContainerBotaoC, ContainerContatos, SecondTextBotaoContato, TextBotaoContato } from "./Contatos.styles";

const Contatos = () => {
    return (
        <ContainerContatos>
            <ContainerBotaoC>
                <BotaoUsuario medicos="true">
                    <TextBotaoContato>Médicos</TextBotaoContato>
                    <SecondTextBotaoContato>Exibir contatos de médicos</SecondTextBotaoContato>
                </BotaoUsuario>

                <BotaoUsuario secretarias="true">
                    <TextBotaoContato>Secretárias</TextBotaoContato>
                    <SecondTextBotaoContato>Exibir contatos das secretárias</SecondTextBotaoContato>
                </BotaoUsuario>
            </ContainerBotaoC>
            <h1>contato</h1>
        </ContainerContatos>
    )
}

export default Contatos;