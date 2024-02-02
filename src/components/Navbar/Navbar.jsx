import { useEffect, useState } from "react";
import { ButtonLogout, ContainerNav, ContentOptions, IconElement, IconElementInfo, NavLinkContainer, SpecImg, TextContainer, TextIcon } from "./Navbar.styles"
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser, faRectangleList, faFolderOpen, faCommentDots } from '@fortawesome/free-regular-svg-icons';
import { faGear, faArrowLeft, faInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { PropTypes } from 'prop-types';
import { useAuth } from "../../context/AuthContext";

library.add([faUser, faRectangleList, faFolderOpen, faInfo, faGear, faArrowLeft, faCommentDots]);

const Navbar = ({ item }) => {
    const { sessao, handleValidaSessao } = useAuth();
    const [perfilSelected, setPerfilSelected] = useState('');
    const [contatoSelected, setContatoSelected] = useState('');
    const [relatorioSelected, setRelatorioSelected] = useState('');
    const [configSelected, setConfigSelected] = useState('');
    const [feedBackSelected, setFeedBackSelected] = useState('');
    const [ajudaSelected, setAjudaSelected] = useState('');

    const navigate = useNavigate();

    const handleSelectedLink = () => {
        if(item === 'perfil') setPerfilSelected('selected');

        if(item === 'relatorio') setRelatorioSelected('selected');

        if(item === 'contato') setContatoSelected('selected');

        if(item === 'configuracao') setConfigSelected('selected');

        if(item === 'feedBack') setFeedBackSelected('selected');

        if(item === 'ajuda') setAjudaSelected('selected');
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
        <ContainerNav>
            <SpecImg src="./images/spec24.png" alt="Spec24" />

            <TextContainer>
                <NavLinkContainer>
                    <TextIcon to={'/perfil'} itemselected={perfilSelected}>
                        <IconElement><FontAwesomeIcon icon={["far", "user"]} /></IconElement>
                        Perfil
                    </TextIcon>
                </NavLinkContainer>

                <NavLinkContainer>
                    <TextIcon to={'/contato'} itemselected={contatoSelected}>
                        <IconElement><FontAwesomeIcon icon={["far", "rectangle-list"]} /></IconElement>
                        Contato
                    </TextIcon>
                </NavLinkContainer>

                <NavLinkContainer>
                    <TextIcon to={'/relatorio'} itemselected={relatorioSelected}>
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

                    <NavLinkContainer>
                        <TextIcon to={'/feedback'} itemselected={feedBackSelected}>
                            <IconElementInfo><FontAwesomeIcon icon={["fas", "info"]} /></IconElementInfo>
                            Feedback
                        </TextIcon>
                    </NavLinkContainer>

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
    )
}

Navbar.propTypes = {
    item: PropTypes.string.isRequired
};

export default Navbar;