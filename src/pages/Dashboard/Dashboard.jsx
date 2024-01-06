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
        handleSetHash(hash ?? '');

        if(authHash && authHash != ''){
            handleValidaSessao();

            if(sessao && sessao.loggedin){
                setTimeout(() => {
                    setComponente(<Relatorios />);
                }, 500);
            }
        } else {
            navigate('/');
        }
    }, [
        hash,
        sessao,
        handleValidaSessao,
        handleSetHash,
        sessao.loggedin,
        authHash
    ])

    return(
        <>
            {componente}
        </>
    )
} 

export default React.memo(Dashboard);