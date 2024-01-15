import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Carregando from "../../components/Carregando/Carregando";
import PerfilUsuario from '../../components/Perfil/Perfil';

const Perfil = () => {
    const { handleValidaSessao, sessao } = useAuth();

    const [componente, setComponente] = useState(<Carregando />);

    useEffect(() => {
        handleValidaSessao();

        if(sessao && sessao.loggedin !== false){

            setTimeout(() => {
                setComponente(<PerfilUsuario />);
            }, 500);
        }
        
    }, [sessao])
    return(
        <>
            {componente}
        </>
    )
}

export default Perfil;