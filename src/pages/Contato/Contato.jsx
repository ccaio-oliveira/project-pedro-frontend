import { useEffect, useState } from "react";
import Contatos from "../../components/Contatos/Contatos";
import Navbar from "../../components/Navbar/Navbar";
import { useAuth } from "../../context/AuthContext";
import Carregando from "../../components/Carregando/Carregando";
import { Container, ContainerComponent } from "../../global.styles";
import Header from "../../components/Header/Header";

const Contato = () => {

    const { handleValidaSessao, sessao, handleSetHeaders } = useAuth();

    const [component, setComponent] = useState(<Carregando title={'Carregando contatos'} />);

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
            document.title = "Contato";
            setTimeout(() => {
                setComponent(<Contatos />);
            }, 500);
        }
    }, [sessao]);

    return(
        <>
            <Header openMenu={openMenu} />
            <Container>
                <Navbar isOpen={isOpenMenu} onCloseMenu={closeMenu} item={'contato'} />
                <ContainerComponent>
                    {component}
                </ContainerComponent>
            </Container>
        </>
    )
}

export default Contato;