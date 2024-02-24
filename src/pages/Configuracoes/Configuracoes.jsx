import { ContainerConfig } from "./Configuracoes.styles"
import Navbar from './../../components/Navbar/Navbar';
import Configuracao from "../../components/Configuracao/Configuracao";
import { ContainerComponent } from "../../global.styles";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import Carregando from "../../components/Carregando/Carregando";
import Header from "../../components/Header/Header";

const Configuracoes = () => {
    const { handleValidaSessao, sessao, handleSetHeaders } = useAuth();
    const [component, setComponent] = useState(<Carregando title="Carregando configurações" />)

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
            <Header />
            <ContainerConfig>
                <Navbar item={'configuracao'} />
                <ContainerComponent>
                    {component}
                </ContainerComponent>
            </ContainerConfig>
        </>
    )
}

export default Configuracoes;