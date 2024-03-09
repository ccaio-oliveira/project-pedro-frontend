import { useEffect, useState } from "react";
import { ButtonCloseMenu, ButtonLogout, ContainerNav, ContainerNavBackground, ContainerNavHeader, ContentOptions, IconElement, IconElementInfo, NavLinkContainer, SpecImg, TextContainer, TextIcon } from "./Navbar.styles"
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser, faRectangleList, faFolderOpen, faCommentDots } from '@fortawesome/free-regular-svg-icons';
import { faGear, faArrowLeft, faInfo, faTimes, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { PropTypes } from 'prop-types';
import { useAuth } from "../../context/AuthContext";

library.add([faUser, faRectangleList, faFolderOpen, faInfo, faGear, faArrowLeft, faCommentDots, faTimes, faUsers]);

const Navbar = ({ item, onCloseMenu, isOpen }) => {
    const { sessao, handleValidaSessao } = useAuth();
    const [perfilSelected, setPerfilSelected] = useState('');
    const [contatoSelected, setContatoSelected] = useState('');
    const [usuariosSelected, setUsuariosSelected] = useState('');
    const [relatorioSelected, setRelatorioSelected] = useState('');
    const [configSelected, setConfigSelected] = useState('');
    const [feedBackSelected, setFeedBackSelected] = useState('');
    const [ajudaSelected, setAjudaSelected] = useState('');

    const navigate = useNavigate();

    const handleSelectedLink = () => {
        if(item === 'perfil') setPerfilSelected('selected');

        if(item === 'relatorio') setRelatorioSelected('selected');

        if(item === 'contato') setContatoSelected('selected');

        if(item === 'usuarios') setUsuariosSelected('selected');

        if(item === 'configuracao') setConfigSelected('selected');

        if(item === 'feedBack') setFeedBackSelected('selected');

        if(item === 'help') setAjudaSelected('selected');
    }

    const loggout = async () => {
        await axios.post('/api/loggout')
        .then(() => {
            Cookies.remove('sessaoSalva');
            navigate('/');
        })
    }

    useEffect(() => {
        handleValidaSessao();
        handleSelectedLink();
    }, [sessao])

    return(
        <ContainerNavBackground $isOpen={isOpen} onClick={onCloseMenu}>
            <ContainerNav $isOpen={isOpen}>
                <ContainerNavHeader>
                    <SpecImg src="./images/spec24.png" alt="Spec24" />
                    {isOpen && (
                        <ButtonCloseMenu onClick={onCloseMenu}>
                            <FontAwesomeIcon icon={["fas", "times"]} />
                        </ButtonCloseMenu>
                    )}
                    
                </ContainerNavHeader>

                <TextContainer>
                    <NavLinkContainer>
                        <TextIcon to={'/perfil'} itemselected={perfilSelected}>
                            <IconElement><FontAwesomeIcon icon={["far", "user"]} /></IconElement>
                            Perfil
                        </TextIcon>
                    </NavLinkContainer>

                    <NavLinkContainer>
                        <TextIcon to={'/contato?tipoUsuario=2'} itemselected={contatoSelected}>
                            <IconElement><FontAwesomeIcon icon={["far", "rectangle-list"]} /></IconElement>
                            Contato
                        </TextIcon>
                    </NavLinkContainer>

                    {sessao.perfil_usuario == 1 && (
                        <NavLinkContainer>
                            <TextIcon to={'/usuarios'} itemselected={usuariosSelected}>
                                <IconElement><FontAwesomeIcon icon={["fas", "users"]} /></IconElement>
                                Usuários
                            </TextIcon>
                        </NavLinkContainer>
                    )}

                    <NavLinkContainer>
                        <TextIcon to={'/relatorio?grau=prioridade'} itemselected={relatorioSelected}>
                            <IconElement><FontAwesomeIcon icon={["far", "folder-open"]} /></IconElement>
                            {sessao.perfil_usuario == 1 || sessao.perfil_usuario == 3 ? 'Histórico' : 'Relatório'}
                        </TextIcon>
                    </NavLinkContainer>

                    <ContentOptions>
                        <NavLinkContainer>
                            <TextIcon to={'/configuracao'} itemselected={configSelected}>
                                <IconElement><FontAwesomeIcon icon={["fas", "gear"]} /></IconElement>
                                Configuração
                            </TextIcon>
                        </NavLinkContainer>

                        {/* <NavLinkContainer>
                            <TextIcon to={'/configuracao'} itemselected={feedBackSelected}>
                                <IconElementInfo $itemselected={feedBackSelected}><FontAwesomeIcon icon={["fas", "info"]} /></IconElementInfo>
                                Feedback
                            </TextIcon>
                        </NavLinkContainer> */}

                        <NavLinkContainer>
                            <TextIcon to={'/ajuda'} itemselected={ajudaSelected}>
                                <IconElement><FontAwesomeIcon icon={["far", "comment-dots"]} /></IconElement>
                                Ajuda
                            </TextIcon>
                        </NavLinkContainer>

                        <NavLinkContainer>
                            <ButtonLogout onClick={loggout}>
                                <IconElement><FontAwesomeIcon icon={["fas", "arrow-left"]} /></IconElement>
                                Sair
                            </ButtonLogout>
                        </NavLinkContainer>
                    </ContentOptions>

                </TextContainer>
            </ContainerNav>
        </ContainerNavBackground>
    )
}

Navbar.propTypes = {
    item: PropTypes.string.isRequired,
    onCloseMenu: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired
};

export default Navbar;