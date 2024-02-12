import { PropTypes } from 'prop-types';
import ModalTemplate from '../../Modal/Modal';
import { ModalForm } from '../ModalCriarAchado/ModalCriarAchado.styles';
import { FormGroup, FormLabel, InputData, OptionSelect, SelectInput } from '../../../global.styles';
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import Carregando from '../../Carregando/Carregando';
import AlertTemplate from '../../AlertComponents/AlertTemplate';
import SuccessAlert from '../../AlertComponents/SuccessAlert/SuccessAlert';
import ErrorAlert from '../../AlertComponents/ErrorAlert/ErrorAlert';

const ModalExpRelatorios = ({ titulo, onClose }) => {
    const { headers } = useAuth();

    const [prioridade, setPrioridade] = useState('1');
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');
    const [status, setStatus] = useState(0);

    const [isLoading, setIsLoading] = useState(false);
    const [loadingTitle, setLoadingTitle] = useState('');

    const [alertIsOpen, setAlertIsOpen] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    const exportarRelatorios = async () => {

        setIsLoading(true);
        setLoadingTitle('Exportando relatórios');

        await axios.get('/api/relatorios/exportar', {
            params: {
                prioridade,
                dataInicio,
                dataFim,
                status
            },
                headers,
                responseType: 'blob'
            })
        .then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'relatorios.pdf');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setIsLoading(false);

            setAlertIsOpen(true);
            setAlertTitle('Sucesso');
            setAlertMessage('Relatórios exportados com sucesso');
            setAlertType('success');
        })
        .catch(() => {
            setIsLoading(false);

            setAlertIsOpen(true);
            setAlertTitle('Erro');
            setAlertMessage('Erro ao exportar relatórios');
            setAlertType('error');
        });
    }

    return (
        <>
            <ModalTemplate title={titulo} onRequestClose={onClose} modalFooter={true} submitTitle={'Exportar'} funcSubmit={exportarRelatorios}>
                <ModalForm>
                    <FormGroup>
                        <FormLabel>Prioridade do Relatório</FormLabel>
                        <SelectInput onChange={e => setPrioridade(e.target.value)}>
                            <OptionSelect value="1">Prioridade</OptionSelect>
                            <OptionSelect value="2">Não Urgente</OptionSelect>
                            <OptionSelect value="3">Rotina</OptionSelect>
                        </SelectInput>
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Data início:</FormLabel>
                        <InputData type="date" onChange={e => setDataInicio(e.target.value)} />
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Data fim:</FormLabel>
                        <InputData type="date" onChange={e => setDataFim(e.target.value)} />
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Status:</FormLabel>
                        <SelectInput onChange={e => setStatus(e.target.value)}>
                            <OptionSelect value="0">Todos</OptionSelect>
                            <OptionSelect value="1">Pendentes</OptionSelect>
                            <OptionSelect value="2">Visualizados</OptionSelect>
                        </SelectInput>
                    </FormGroup>
                </ModalForm>
            </ModalTemplate>

            {isLoading && (
                <Carregando title={loadingTitle} />
            )}

            {alertIsOpen && (
                <AlertTemplate title={alertTitle}>
                    {alertType === 'success'
                        ? (
                            <SuccessAlert message={alertMessage} close={() => setAlertIsOpen(false)} />
                        ) : (
                            <ErrorAlert message={alertMessage} close={() => setAlertIsOpen(false)} />
                        )
                    }
                </AlertTemplate>
            )}
        </>
    );
};

ModalExpRelatorios.propTypes = {
    titulo: PropTypes.string,
    onClose: PropTypes.func
}

export default ModalExpRelatorios;
