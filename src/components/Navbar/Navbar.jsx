import { useEffect, useState } from "react";
import { ButtonLogout, ContainerNav, ContentOptions, IconElement, NavLinkContainer, SpecImg, TextContainer, TextIcon } from "./Navbar.styles"
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser, faRectangleList, faFolderOpen, faClock } from '@fortawesome/free-regular-svg-icons';
import { faGear, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { PropTypes } from 'prop-types';

library.add([faUser, faRectangleList, faFolderOpen, faClock, faGear, faArrowLeft]);

const Navbar = ({ item }) => {
    const [perfilSelected, setPerfilSelected] = useState('');
    const [contatoSelected, setContatoSelected] = useState('');
    const [relatorioSelected, setRelatorioSelected] = useState('');
    const [agendaSelected, setAgendaSelected] = useState('');

    const navigate = useNavigate();

    const handleSelectedLink = () => {
        if(item === 'perfil') setPerfilSelected('selected');

        if(item === 'relatorio') setRelatorioSelected('selected');

        if(item === 'contato') setContatoSelected('selected');

        if(item === 'agenda') setAgendaSelected('selected');
    }

    const loggout = async () => {
        await axios.post('/api/loggout')
        .then(() => {
            Cookies.remove('sessaoSalva');
            navigate('/');
        })
    }

    useEffect(() => {
        handleSelectedLink();
    }, [])

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
                        Relatório
                    </TextIcon>
                </NavLinkContainer>

                <NavLinkContainer>
                    <TextIcon to={'/agenda'} itemselected={agendaSelected}>
                        <IconElement><FontAwesomeIcon icon={["far", "clock"]} /></IconElement>
                        Agenda
                    </TextIcon>
                </NavLinkContainer>

                <ContentOptions>
                    <NavLinkContainer>
                        <TextIcon to={'/configuracao'} itemselected={agendaSelected}>
                            <IconElement><FontAwesomeIcon icon={["fas", "gear"]} /></IconElement>
                            Configuração
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