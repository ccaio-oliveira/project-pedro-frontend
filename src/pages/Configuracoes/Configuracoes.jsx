import { ContainerConfig } from "./Configuracoes.styles"
import Navbar from './../../components/Navbar/Navbar';
import Configuracao from "../../components/Configuracao/Configuracao";
import { ContainerComponent } from "../../global.styles";

const Configuracoes = () => {
    return(
        <ContainerConfig>
            <Navbar item={'configuracao'} />
            <ContainerComponent>
                <Configuracao />
            </ContainerComponent>
        </ContainerConfig>
    )
}

export default Configuracoes;