import Navbar from './../../components/Navbar/Navbar';
import Configuracao from "../../components/Configuracao/Configuracao";
import { Container, ContainerComponent } from "../../global.styles";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import Carregando from "../../components/Carregando/Carregando";
import Header from "../../components/Header/Header";

const Configuracoes = () => {
    const { handleValidaSessao, sessao, handleSetHeaders } = useAuth();
    const [component, setComponent] = useState(<Carregando title="Carregando configurações" />)

    const [isOpenMenu, setIsOpenMenu] = useState(false);

    const openMenu = () => {
        setIsOpenMenu(true);
    }

    const closeMenu = () => {
        setIsOpenMenu(false);
    }

    useEffect(() => {
        handleValidaSessao();

        if(sessao && sessao.loggedin !== false){
            handleSetHeaders();
            document.title = 'Configurações';
            setTimeout(() => {
                setComponent(<Configuracao />);
            }, 500)
        }
    }, [sessao])

    return(
        <>  
            <Header openMenu={openMenu} />
            <Container>
                <Navbar isOpen={isOpenMenu} onCloseMenu={closeMenu} item={'configuracao'} />
                <ContainerComponent>
                    {component}
                </ContainerComponent>
            </Container>
        </>
    )
}

export default Configuracoes;