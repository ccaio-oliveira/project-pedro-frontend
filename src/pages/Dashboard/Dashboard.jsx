import { useEffect, useState } from 'react';
import { useAuth } from './../../context/AuthContext';
import Carregando from '../../components/Carregando/Carregando';
import Relatorios from '../../components/Relatorios/Relatorios';
import Navbar from '../../components/Navbar/Navbar';
import { ContainerDash } from './Dashboard.styles';

const Dashboard = () => {

    const { handleValidaSessao, sessao } = useAuth();

    const [componente, setComponente] = useState(<Carregando title={'relatórios'} />);

    useEffect(() => {
        handleValidaSessao();

        if(sessao && sessao.loggedin !== false){

            setTimeout(() => {
                setComponente(<Relatorios />);
            }, 500);
        }
        
    }, [sessao])

    return(
        <ContainerDash>
            <Navbar item={'relatorio'}/>
            {componente}
        </ContainerDash>
    )
} 

export default Dashboard;