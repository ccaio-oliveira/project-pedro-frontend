import { createContext, useContext, useState } from "react"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const AuthContext = createContext({
    sessao: {
        loggedin: false,
        bloqueado: false,
        id: 0,
        nome_usuario: '',
        sobrenome_usuario: '',
        email: '',
        cpf: '',
        perfil_usuario: 0,
        token: ''
    },
    hash: '',

    handleSetSessao: () => {},
    handleSetHash: () => {},
    handleValidaSessao: () => {}
});

const AuthProvider = ({ children }) => {

    const navigate = useNavigate();

    const [sessao, setSessao] = useState({
        loggedin: false,
        bloqueado: false,
        id: 0,
        nome: '',
        sobrenome: '',
        email: '',
        cpf: '',
        perfil_usuario: 0,
        token: ''
    });

    const [hash, setHash] = useState('');

    const [tentativa, setTentativa] = useState(3);

    const handleSetSessao = (sessao) => {
        setSessao(sessao);
    }

    const handleSetHash = (hash) => {
        setHash(hash);
    }

    const handleValidaSessao = () => {
        let sessaoSalva = Cookies.get('sessaoSalva') || '';
        sessaoSalva = sessaoSalva ? JSON.parse(sessaoSalva) : null;

        if(sessaoSalva !== null && !sessao.loggedin){
            handleSetSessao(sessaoSalva)
        }

    }

    const context = {
        sessao,
        hash,
        handleSetSessao,
        handleSetHash,
        handleValidaSessao
    };

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => {
    const context = useContext(AuthContext);

    if(!context){
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }

    return context;
}

export { AuthProvider, useAuth };