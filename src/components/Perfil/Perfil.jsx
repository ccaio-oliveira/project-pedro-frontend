import { useEffect, useState } from "react";
import { BotaoAcao } from "../../global.styles";
import { ContainerNovoChamado } from "../Relatorios/Relatorios.styles";
import TabelaRelatorios from "../Relatorios/TabelaRelatorios/TabelaRelatorios";
import { ContainerAgenda, ContainerInfoPerfil, ContainerPerfil, ContainerPerfilBody, ContainerPerfilHeader, ContainerTable, InfoUsuario, NomeUsuario, PerfilImg } from "./Perfil.styles"
import { useNavigate } from 'react-router-dom';
import Carregando from "../Carregando/Carregando";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import Agenda from "../Agenda/Agenda";

const Perfil = () => {
    const navigate = useNavigate();
    const { headers, sessao } = useAuth();

    const [dataUsuario, setDataUsuario] = useState([]);
    const [dataRelatorios, setDataRelatorios] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const handleUsuario = async () => {
        setIsLoading(true);

        const params = {
            usuario_id: sessao.id
        }

        await axios.get(`/api/usuarioPerfil`, {
            params,
            headers
        }).then(res => {
            setDataUsuario(res.data);
            setIsLoading(false);
        })
    }

    const handleSetPage = () => {
        navigate('/relatorio?grau=prioridade');
    }

    const handleRelatorios = (relatorios) => {
        setDataRelatorios(relatorios)
    }

    console.log(dataUsuario);

    useEffect(() => {
        handleUsuario();
    }, [])
    
    return(
        <>
            {isLoading ? (
                <Carregando title="Carregando perfil" />
            ) : (
                <ContainerPerfil>
                    <ContainerPerfilHeader>
                        <ContainerInfoPerfil>
                            <PerfilImg src={dataUsuario.foto_id != 0 ? `data:image/png;base64,${dataUsuario.foto_id}` : 'https://www.w3schools.com/howto/img_avatar.png'} alt="Perfil" />
                            <NomeUsuario>{dataUsuario.apelido == null ? '' : dataUsuario.apelido} {dataUsuario.nome_completo}</NomeUsuario>
                            <InfoUsuario>
                                {
                                    sessao.perfil_usuario == 1 ? 'Administrador' : (
                                        sessao.perfil_usuario == 2 ? `${dataUsuario.especialidade} - ${dataUsuario.medico_crm}` : 'Secretário(a)'
                                    )
                                }
                            </InfoUsuario>
                        </ContainerInfoPerfil>
                    </ContainerPerfilHeader>

                    <ContainerPerfilBody>
                        <ContainerTable>
                            <TabelaRelatorios page="perfil" relatorios={handleRelatorios} />
                            <ContainerNovoChamado>
                                <BotaoAcao onClick={handleSetPage}>Abrir chamados</BotaoAcao>
                            </ContainerNovoChamado>
                        </ContainerTable>

                        <ContainerAgenda>
                            <Agenda relatorios={dataRelatorios} />
                        </ContainerAgenda>
                    </ContainerPerfilBody>
                </ContainerPerfil>
            )}
        </>
    )
}

export default Perfil;