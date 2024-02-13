import Contatos from "../../components/Contatos/Contatos";
import Navbar from "../../components/Navbar/Navbar";
import { ContainerContato } from "./Contato.styles";

const Contato = () => {
    return(
        <ContainerContato>
            <Navbar item={'contato'} />
            <Contatos />
        </ContainerContato>
    )
}

export default Contato;