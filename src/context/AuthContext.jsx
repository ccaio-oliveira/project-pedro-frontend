import { createContext, useContext, useState } from "react"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext({
    sessao: {
        loggedin: false,
        bloqueado: false,
        id_login: 0,
        nome_usuario: '',
        sobrenome_usuario: '',
        tipo_usuario: 0,
        usuario_id: 0
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
        id_login: 0,
        nome_usuario: '',
        sobrenome_usuario: '',
        tipo_usuario: 0,
        usuario_id: 0
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
        const instance = axios.create({
            baseURL: import.meta.env.VITE_API_URL,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'X-Hash': hash,
            }
        });

        if(hash !== '' && !sessao.loggedin && tentativa > 0){
            const res = instance.get(`auth/verificar/${hash}`)
            .then(res => {
                setSessao({
                    ...res.data,
                    usuario_id: parseInt(res.data.usuario_id),
                    id_login: parseInt(res.data.id_login),
                    tipo_usuario: parseInt(res.data.tipo_usuario)
                });

                Object.keys(res.data).forEach((key) => {
                    sessionStorage.setItem(key, res.data[key]);
                });
            })
            .catch(() => {
                setTentativa(tentativa - 1);
                if(tentativa === 0){
                    navigate('/');
                }
            });
            return res;
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