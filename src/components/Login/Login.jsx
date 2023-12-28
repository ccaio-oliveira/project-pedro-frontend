// resources/js/Pages/Login.jsx
import { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [usuario_login, setUsuarioLogin] = useState('');
    const [senha_login, setSenhaLogin] = useState('');

    const [dadosUsuario, setDadosUsuario] = useState([]);

    const handleLogin = async () => {
        try {
            const response = await axios.post('/api/login', {
                usuario_login,
                senha_login,
            });

            setDadosUsuario(response.data[0]);

            console.log(dadosUsuario);

            // Lógica adicional após a autenticação bem-sucedida (redirecionamento, etc.)
        } catch (error) {
            console.error('Erro durante a autenticação:', error.response.data.message);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form>
                <div>
                    <label>Email:</label>
                    <input
                        type="text"
                        value={usuario_login}
                        onChange={(e) => setUsuarioLogin(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="text"
                        value={senha_login}
                        onChange={(e) => setSenhaLogin(e.target.value)}
                    />
                </div>
                <button type="button" onClick={handleLogin}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
