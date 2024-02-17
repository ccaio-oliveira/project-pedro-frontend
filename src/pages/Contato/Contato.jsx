import { useEffect, useState } from "react";
import Contatos from "../../components/Contatos/Contatos";
import Navbar from "../../components/Navbar/Navbar";
import { useAuth } from "../../context/AuthContext";
import { ContainerContato } from "./Contato.styles";
import Carregando from "../../components/Carregando/Carregando";

const Contato = () => {

    const { handleValidaSessao, sessao, handleSetHeaders } = useAuth();

    const [component, setComponent] = useState(<Carregando title={'Carregando contatos'} />);

    useEffect(() => {
        handleValidaSessao();

        if(sessao && sessao.loggedin !== false){
            handleSetHeaders();
            setTimeout(() => {
                setComponent(<Contatos />);
            }, 500);
        }
    }, [sessao]);

    return(
        <ContainerContato>
            <Navbar item={'contato'} />
            {component}
        </ContainerContato>
    )
}

export default Contato;