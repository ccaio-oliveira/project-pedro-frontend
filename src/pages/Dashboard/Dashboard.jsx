import { useEffect, useState } from 'react';
import { useAuth } from './../../context/AuthContext';
import Carregando from '../../components/Carregando/Carregando';
import Relatorios from '../../components/Relatorios/Relatorios';
import Navbar from '../../components/Navbar/Navbar';
import { ContainerDash } from './Dashboard.styles';
import { ContainerComponent } from '../../global.styles';

const Dashboard = () => {

    const { handleValidaSessao, sessao, handleSetHeaders } = useAuth();

    const [componente, setComponente] = useState(<Carregando title={'Carregando relatórios'} />);

    useEffect(() => {
        handleValidaSessao();

        if(sessao && sessao.loggedin !== false){
            handleSetHeaders();

            if(sessao.perfil_usuario == 1 || sessao.perfil_usuario == 3){
                document.title = "Histórico";
            } else {
                document.title = "Relatórios";
            }
            
            setTimeout(() => {
                setComponente(<Relatorios />);
            }, 500);
        }
        
    }, [sessao])

    return(
        <ContainerDash>
            <Navbar item={'relatorio'}/>
            <ContainerComponent>
                {componente}
            </ContainerComponent>
        </ContainerDash>
    )
} 

export default Dashboard;