import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Carregando from "../../components/Carregando/Carregando";
import PerfilUsuario from '../../components/Perfil/Perfil';
import { Container } from "../../global.styles";
import Navbar from "../../components/Navbar/Navbar";

const Perfil = () => {
    const { handleValidaSessao, sessao } = useAuth();

    const [componente, setComponente] = useState(<Carregando title={'Carregando perfil'} />);

    useEffect(() => {
        handleValidaSessao();

        if(sessao && sessao.loggedin !== false){

            setTimeout(() => {
                setComponente(<PerfilUsuario />);
            }, 500);
        }
        
    }, [sessao])

    return(
        <Container>
            <Navbar item={'perfil'} />
            {componente}
        </Container>
    )
}

export default Perfil;