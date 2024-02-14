import { ContainerConfig } from "./Configuracoes.styles"
import Navbar from './../../components/Navbar/Navbar';
import Configuracao from "../../components/Configuracao/Configuracao";

const Configuracoes = () => {
    return(
        <ContainerConfig>
            <Navbar item={'configuracao'} />
            <Configuracao />
        </ContainerConfig>
    )
}

export default Configuracoes;