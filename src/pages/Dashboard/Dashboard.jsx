import { useEffect, useState } from 'react';
import { useAuth } from './../../context/AuthContext';
import Carregando from '../../components/Carregando/Carregando';
import Relatorios from '../../components/Relatorios/Relatorios';

const Dashboard = () => {

    const { handleValidaSessao, sessao } = useAuth();

    const [componente, setComponente] = useState(<Carregando />);

    useEffect(() => {
        handleValidaSessao();

        if(sessao && sessao.loggedin !== false){

            setTimeout(() => {
                setComponente(<Relatorios />);
            }, 500);
        }
        
    }, [sessao])

    return(
        <>
            {componente}
        </>
    )
} 

export default Dashboard;