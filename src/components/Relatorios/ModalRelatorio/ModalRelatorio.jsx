import React, { useEffect, useState } from 'react';
import { ModalForm } from './ModalRelatorio.styles';

const ModalRelatorio = () => {
    const handleUsuarios = async () => {
        await axios.get('/usuarios')
        .then((response) => {
            setUsuarios(response.data);
        })
    }

    useEffect(() => {
        handleUsuarios();
    }, [usuarios]);

    return(
        <ModalForm>
            Modal Relatório
        </ModalForm>
    )
}

export default ModalRelatorio;
