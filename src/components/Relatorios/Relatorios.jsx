import React, { useEffect } from "react"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import { Link } from 'react-router-dom';

const Relatorios = () => {
    const { sessao, handleValidaSessao } = useAuth();
    const navigate = useNavigate();

    console.log(sessao)

    useEffect(() => {
        handleValidaSessao();
        Cookies.set('sessaoSalva', JSON.stringify(sessao), {expires: 7});

        if(sessao && sessao.loggedin === false){
            navigate('/')
        }
    }, [sessao, handleValidaSessao])
    return(
        <h1>
            Relatórios
            <Link to={'/perfil'}>Ir para perfil</Link>
        </h1>
    )
}

export default React.memo(Relatorios);