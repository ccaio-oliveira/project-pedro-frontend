import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';

const Perfil = () => {
    const { sessao, handleValidaSessao } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        handleValidaSessao();

        if(sessao && !sessao.loggedin){
            navigate('/');
        } else {
            navigate('/perfil');
        }
    }, [sessao, handleValidaSessao])
    return(
        <h1>Perfil</h1>
    )
}

export default Perfil;