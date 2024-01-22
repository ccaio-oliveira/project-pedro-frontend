import { createContext, useContext, useState } from "react"
import { useNavigate } from 'react-router-dom';
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
    headers: {},

    handleSetSessao: () => {},
    handleSetHash: () => {},
    handleValidaSessao: () => {},
    handleSetHeaders: () => {}
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

    const [headers, setHeaders] = useState({});

    const [hash, setHash] = useState('');

    const handleSetSessao = (sessao) => {
        setSessao(sessao);
    }

    const handleSetHash = (hash) => {
        setHash(hash);
    }

    const handleSetHeaders = () => {
        setHeaders({
            Authorization: `Bearer ${sessao.token}`,
            'Access-Control-Allow-Origin': '*',
        });
    }

    const handleValidaSessao = () => {
        let sessaoSalva = Cookies.get('sessaoSalva') || '';
        sessaoSalva = sessaoSalva ? JSON.parse(sessaoSalva) : null;

        if(sessaoSalva !== null && sessao.loggedin === false){
            handleSetSessao(sessaoSalva)
        } else if(sessaoSalva === null){
            navigate('/')
        }

    }

    const context = {
        sessao,
        hash,
        headers,
        handleSetSessao,
        handleSetHash,
        handleValidaSessao,
        handleSetHeaders
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