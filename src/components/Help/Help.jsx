import { 
    BoldItem,
    HelpBody, 
    HelpContainer, 
    HelpHeader, 
    HelpSubTitle, 
    HelpTitle, 
    QuestionBody, 
    QuestionContainer, 
    QuestionIcon, 
    QuestionTitle, 
    QuestionTop,
    SupportButton,
    SupportContainer,
    SupportSubTitle,
    SupportText,
    SupportTitle
} from './Help.styles';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { useAuth } from '../../context/AuthContext';

library.add(faQuestionCircle);

const HelpComponent = () => {
    const { sessao } = useAuth();

    return (
        <HelpContainer>
            <HelpHeader>
                <HelpTitle>Ajuda</HelpTitle>
                <HelpSubTitle>Principais dúvidas</HelpSubTitle>
            </HelpHeader>

            <HelpBody>
                <QuestionContainer>
                    <QuestionTop>
                        <QuestionTitle>
                            <QuestionIcon icon={['fas', 'question-circle']} />
                            Como criar chamados?
                        </QuestionTitle>

                        <QuestionBody>
                            No menu lateral, selecione a opção <BoldItem>Relatório/Histórico</BoldItem> e, em seguida,
                            clique no botão <BoldItem>Criar achado</BoldItem>. Complete as informações necessárias para a 
                            criação do chamado e clique em <BoldItem>Salvar</BoldItem>.
                        </QuestionBody>
                    </QuestionTop>
                </QuestionContainer>

                {sessao.perfil_usuario == 1 && (
                    <QuestionContainer>
                        <QuestionTop>
                            <QuestionTitle>
                                <QuestionIcon icon={['fas', 'question-circle']} />
                                Como exportar dados de um achado?
                            </QuestionTitle>

                            <QuestionBody>
                                No menu lateral, selecione a opção <BoldItem>Histórico</BoldItem> e, em seguida, clique no botão 
                                <BoldItem>Exportar dados</BoldItem> no interior da página.
                            </QuestionBody>
                        </QuestionTop>
                    </QuestionContainer>
                )}

                <QuestionContainer>
                    <QuestionTop>
                        <QuestionTitle>
                            <QuestionIcon icon={['fas', 'question-circle']} />
                            Onde achar chamados específicos?
                        </QuestionTitle>

                        <QuestionBody>
                            No menu lateral, selecione a opção <BoldItem>Perfil</BoldItem> ou <BoldItem>Relatório/Histórico</BoldItem> e insira o filtro
                            de dados desejados, alinhado com o seu objetivo final.
                        </QuestionBody>
                    </QuestionTop>
                </QuestionContainer>

                {sessao.perfil_usuario == 1 && (
                    <QuestionContainer>
                        <QuestionTop>
                            <QuestionTitle>
                                <QuestionIcon icon={['fas', 'question-circle']} />
                                Como cadastrar um Administrador?
                            </QuestionTitle>

                            <QuestionBody>
                                No menu lateral, selecione a opção <BoldItem>Configurações</BoldItem> e, em 
                                seguida, vá para <BoldItem>Cadastrar Usuário</BoldItem>, escolha a opção 
                                <BoldItem>Administrador</BoldItem> e preencha todos os dados relativos à função
                                do usuário. Para finalizar, pressione o botão <BoldItem>Salvar</BoldItem>.
                            </QuestionBody>
                        </QuestionTop>
                    </QuestionContainer>
                )}

                <QuestionContainer>
                    <QuestionTop>
                        <QuestionTitle>
                            <QuestionIcon icon={['fas', 'question-circle']} />
                            Como cadastrar um Médico?
                        </QuestionTitle>

                        <QuestionBody>
                            No menu lateral, selecione a opção <BoldItem>Configuração</BoldItem> e, em seguida,
                            vá para <BoldItem>Cadastrar Usuário</BoldItem>, escolha a opção 
                            <BoldItem> Médico</BoldItem> e preencha todos os dados relativos à função
                            do usuário. Para finalizar, pressione o botão <BoldItem>Salvar</BoldItem>.
                        </QuestionBody>
                    </QuestionTop>
                </QuestionContainer>

                {sessao.perfil_usuario != 1 && (
                    <QuestionContainer>
                        <QuestionTop>
                            <QuestionTitle>
                                <QuestionIcon icon={['fas', 'question-circle']} />
                                Como cadastrar uma Secretária?
                            </QuestionTitle>

                            <QuestionBody>
                                No menu lateral, selecione a opção <BoldItem>Configuração</BoldItem> e, em seguida,
                                vá para <BoldItem>Cadastrar Usuário</BoldItem>, escolha a opção 
                                <BoldItem> Secretária</BoldItem> e preencha todos os dados relativos à função
                                do usuário. Para finalizar, pressione o botão <BoldItem>Salvar</BoldItem>.
                            </QuestionBody>
                        </QuestionTop>
                    </QuestionContainer>
                )}

                <QuestionContainer>
                    <QuestionTop>
                        <QuestionTitle>
                            <QuestionIcon icon={['fas', 'question-circle']} />
                            Dúvidas sobre o aplicativo
                        </QuestionTitle>

                        <QuestionBody>
                            Clique no botão <BoldItem>Entrar em contato</BoldItem> e fale com o nosso suporte.
                        </QuestionBody>
                    </QuestionTop>
                </QuestionContainer>

                {/* <QuestionContainer>
                    <QuestionTop>
                        <QuestionTitle>
                            <QuestionIcon icon={['fas', 'question-circle']} />
                            Dúvidas sobre política de privacidade
                        </QuestionTitle>

                        <QuestionBody>
                            Para saber mais sobre a política de privacidade, clique aqui.
                        </QuestionBody>
                    </QuestionTop>
                </QuestionContainer> */}

            </HelpBody>

            <SupportContainer>
                <SupportText>
                    <SupportTitle>Precisa de ajuda?</SupportTitle>
                    <SupportSubTitle>
                        Tenha acesso ao suporte exclusivo pelo WhatsApp clicando no botão ao lado.
                    </SupportSubTitle>
                </SupportText>
                <SupportButton target='_blank' href='https://wa.me/553197645900'>Entrar em contato</SupportButton>
            </SupportContainer>
        </HelpContainer>
    )
}

export default HelpComponent;