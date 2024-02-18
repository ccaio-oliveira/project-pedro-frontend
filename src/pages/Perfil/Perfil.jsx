import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Carregando from "../../components/Carregando/Carregando";
import PerfilUsuario from '../../components/Perfil/Perfil';
import { Container, ContainerComponent } from "../../global.styles";
import Navbar from "../../components/Navbar/Navbar";

const Perfil = () => {
    const { handleValidaSessao, sessao, handleSetHeaders } = useAuth();

    const [componente, setComponente] = useState(<Carregando title={'Carregando perfil'} />);

    useEffect(() => {
        handleValidaSessao();

        if(sessao && sessao.loggedin !== false){
            handleSetHeaders();
            setTimeout(() => {
                setComponente(<PerfilUsuario />);
            }, 500);
        }
        
    }, [sessao])

    return(
        <Container>
            <Navbar item={'perfil'} />
            <ContainerComponent>
                {componente}
            </ContainerComponent>
        </Container>
    )
}

export default Perfil;