import { createContext, useContext, useState } from 'react';
import { PropTypes } from 'prop-types';

const UserContext = createContext({
    usuario: {
        id: 0,
        nome: '',
        sobrenome: '',
        nomeCompleto: '',
        crm: '',
        cpf: '',
        email: '', 
        telefones: [],
        perfilUsuario: 0
    },

    handleSetUsuario: () => {}
});

const UserProvider = ({ children }) => {
    const [usuario, setUsuario] = useState({
        id: 0,
        nome: '',
        sobrenome: '',
        nomeCompleto: '',
        crm: '',
        cpf: '',
        email: '', 
        telefones: [],
        perfilUsuario: 0
    });

    const handleSetUsuario = (usuario) => {
        setUsuario(usuario);
    }

    const context = {
        usuario,
        handleSetUsuario
    };

    return (
        <UserContext.Provider value={ context }>
            {children}
        </UserContext.Provider>
    );
}

const useUser = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }

    return context;
}

UserProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export { UserProvider, useUser };
