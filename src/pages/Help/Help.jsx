import { useEffect, useState } from 'react';
import { useAuth } from "../../context/AuthContext";
import Carregando from "../../components/Carregando/Carregando";
import Header from './../../components/Header/Header';
import Navbar from './../../components/Navbar/Navbar';
import HelpComponent from '../../components/Help/Help';
import { Container, ContainerComponent } from '../../global.styles';


const Help = () => {
    // Session variable
    const { sessao, handleValidaSessao } = useAuth();
    // Variable to store de current component 
    const [component, setComponent] = useState(<Carregando title="Carregando" />);

    // Variable to inform the status of the menu 
    const [isOpenMenu, setIsOpenMenu] = useState(false);

    // Function to open menu
    const openMenu = () => {
        setIsOpenMenu(true);
    }

    // Function to close menu
    const closeMenu = () => {
        setIsOpenMenu(false);
    }

    useEffect(() => {
        handleValidaSessao();

        if(sessao && sessao.loggedin !== false){
            document.title = "Ajuda";
            setTimeout(() => {
                setComponent(<HelpComponent />);
            })
        }
    }, [sessao]);

    return (
        <>
            <Header openMenu={openMenu} />
            <Container>
                <Navbar isOpen={isOpenMenu} onCloseMenu={closeMenu} item="help" />
                <ContainerComponent>
                    {component}
                </ContainerComponent>
            </Container>
        </>
    )
}

export default Help;