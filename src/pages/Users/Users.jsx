import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Carregando from "../../components/Carregando/Carregando";
import UsersComponent from "../../components/Users/Users";
import Header from './../../components/Header/Header';
import Navbar from './../../components/Navbar/Navbar';
import { Container, ContainerComponent } from '../../global.styles';


const Users = () => {
    
    const { handleValidaSessao, sessao, handleSetHeaders } = useAuth();

    const [component, setComponent] = useState(<Carregando title="Carregando usuários" />);

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
            document.title = 'Usuários';
            setTimeout(() => {
                setComponent(<UsersComponent />)
            }, 500)
        }
    }, [sessao])

    return (
        <>
            <Header openMenu={openMenu} />
            <Container>
                <Navbar isOpen={isOpenMenu} onCloseMenu={closeMenu} item={'usuarios'} />	
                <ContainerComponent>
                    {component}
                </ContainerComponent>
            </Container>
        </>
    );
}

export default Users;