import { createContext, useContext, useState } from 'react';

const UserContext = createContext({
    usuario: {
        id: 0,
        nome: '',
        sobrenome: '',
        nomeCompleto: '',
        crm: '',
        cpf: '',
        email: '', 
    }
})
