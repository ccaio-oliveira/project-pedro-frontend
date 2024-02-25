import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Carregando from "../../components/Carregando/Carregando";
import PerfilUsuario from '../../components/Perfil/Perfil';
import { Container, ContainerComponent } from "../../global.styles";
import Navbar from "../../components/Navbar/Navbar";
import Header from './../../components/Header/Header';

const Perfil = () => {
    const { handleValidaSessao, sessao, handleSetHeaders } = useAuth();

    const [componente, setComponente] = useState(<Carregando title={'Carregando perfil'} />);

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
            document.title = 'Perfil';
            setTimeout(() => {
                setComponente(<PerfilUsuario />);
            }, 500);
        }
        
    }, [sessao])

    return(
        <>
            <Header openMenu={openMenu} />
            <Container>
                <Navbar isOpen={isOpenMenu} onCloseMenu={closeMenu} item={'perfil'} />
                <ContainerComponent>
                    {componente}
                </ContainerComponent>
            </Container>
        </>
    )
}

export default Perfil;