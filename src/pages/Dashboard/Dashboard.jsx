import React, { useEffect, useState } from 'react';
import { useAuth } from './../../context/AuthContext';
import { useSearchParams } from 'react-router-dom';
import Carregando from '../../components/Carregando/Carregando';
import Relatorios from '../../components/Relatorios/Relatorios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

    const { handleValidaSessao, handleSetHash, sessao, hash: authHash } = useAuth();
    const { hash } = useSearchParams();

    const [componente, setComponente] = useState(<Carregando />);

    const navigate = useNavigate();

    useEffect(() => {
        handleValidaSessao();

        if(sessao && sessao.loggedin !== false){

            setTimeout(() => {
                setComponente(<Relatorios />);
            }, 500);
        } else {
            navigate('/');
        }
    }, [
        sessao,
        sessao.loggedin,
    ])

    return(
        <>
            {componente}
        </>
    )
} 

export default React.memo(Dashboard);