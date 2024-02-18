import React, { useEffect, useState } from 'react';
import { ModalForm } from './ModalCriarAchado.styles';
import { FormGroup, FormLabel, InputData, OptionSelect, SelectInput } from '../../../global.styles';
import axios from 'axios';
import ModalTemplate from '../../Modal/Modal';
import { useAuth } from '../../../context/AuthContext';
import Carregando from '../../Carregando/Carregando';
import { PropTypes } from 'prop-types';
import AlertTemplate from '../../AlertComponents/AlertTemplate';
import SuccessAlert from '../../AlertComponents/SuccessAlert/SuccessAlert';
import ErrorAlert from '../../AlertComponents/ErrorAlert/ErrorAlert';
import { ErrorRelatorio } from '../Relatorios.styles';

const ModalRelatorio = ({titulo, closeModal }) => {
    // variávies de carregamento de informações
    const { sessao, headers, handleSetHeaders } = useAuth();
    const [usuarios, setUsuarios] = useState([]);

    // variáveis de carregamento
    const [isLoading, setIsLoading] = useState(true);
    const [loadingTitle, setLoadingTitle] = useState('');

    const [alertIsOpen, setAlertIsOpen] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    // variáveis do formulário de relatório
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(0);
    const [nomePaciente, setNomePaciente] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [grauRelatorio, setGrauRelatorio] = useState(0);
    const [assuntoRelatorio, setAssuntoRelatorio] = useState('');
    const [arquivo, setArquivo] = useState(null);

    // variáveis de erro no formulário
    const [erroGeral, setErroGeral] = useState(false);
    const [erroUsuario, setErroUsuario] = useState(false);
    const [erroNomePaciente, setErroNomePaciente] = useState(false);
    const [erroDataNascimento, setErroDataNascimento] = useState(false);
    const [erroGrauRelatorio, setErroGrauRelatorio] = useState(false);
    const [erroAssuntoRelatorio, setErroAssuntoRelatorio] = useState(false);

    const handleUsuarios = async () => {
        setIsLoading(true);
        setLoadingTitle('Carregando usuários');
        await axios.get('/api/usuarios', { headers })
        .then((response) => {
            setUsuarios(response.data);
            setIsLoading(false);
        });
    }

    const handleFileChange = (event) => {
        setArquivo(event.target.files[0]);
    }

    const handleUsuarioSelecionado = (e) => {
        setUsuarioSelecionado(e);
        setErroUsuario(false);
    }

    const handleNomePaciente = (e) => {
        setNomePaciente(e);
        setErroNomePaciente(false);
    }

    const handleDataNascimento = (e) => {
        setDataNascimento(e);
        setErroDataNascimento(false);
    }

    const handleGrauRelatorio = (e) => {
        setGrauRelatorio(e);
        setErroGrauRelatorio(false);
    }

    const handleAssuntoRelatorio = (e) => {
        setAssuntoRelatorio(e);
        setErroAssuntoRelatorio(false);
    }

    const enviarRelatorio = async (e) => {
        setErroGeral(false);

        if(usuarioSelecionado === 0) {
            setErroUsuario(true);
            setErroGeral(true);
        }

        if(nomePaciente === '') {
            setErroNomePaciente(true);
            setErroGeral(true);
        }

        if(dataNascimento === '') {
            setErroDataNascimento(true);
            setErroGeral(true);
        }

        if(grauRelatorio === 0) {
            setErroGrauRelatorio(true);
            setErroGeral(true);
        }

        if(assuntoRelatorio === '') {
            setErroAssuntoRelatorio(true);
            setErroGeral(true);
        }

        if(erroGeral){
            return;
        }

        e.preventDefault();

        setIsLoading(true);
        setLoadingTitle('Enviando relatório');
        await axios.post('/api/relatorios', {
            aberto_por: sessao.id,
            atrelado_a: usuarioSelecionado,
            nome_paciente: nomePaciente,
            data_nascimento: dataNascimento,
            grau: grauRelatorio,
            assunto: assuntoRelatorio,
            arquivo
        }, { 
            headers: {
                Authorization: headers.Authorization,
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(() => {
            setIsLoading(false);
            closeModal();

            setAlertIsOpen(true);
            setAlertTitle('Sucesso');
            setAlertMessage('Relatório enviado com sucesso');
            setAlertType('success');
        })
        .catch(() => {
            setIsLoading(false);

            setAlertIsOpen(true);
            setAlertTitle('Erro');
            setAlertMessage('Erro ao enviar relatório');
            setAlertType('error');
        })
    }

    useEffect(() => {
        handleSetHeaders();
        handleUsuarios();
    }, []);

    return(
        <>
            {isLoading ? (
                <Carregando title={loadingTitle} />
            ) : (
                <ModalTemplate title={titulo} onRequestClose={closeModal} funcSubmit={enviarRelatorio} modalFooter={true} submitTitle='Salvar'>
                    <ModalForm>
                        <FormGroup>
                            <FormLabel>Nome/CRM</FormLabel>
                            <SelectInput name='selUsuario' onChange={e => handleUsuarioSelecionado(e.target.value)}>
                                <OptionSelect value="0">Nome ou CRM</OptionSelect>
                                {usuarios.map((usuario) => (
                                    <OptionSelect key={usuario.id} value={usuario.id}>{usuario.nome} {usuario.sobrenome}</OptionSelect>
                                ))}
                            </SelectInput>
                            {erroUsuario && <ErrorRelatorio>Selecione um usuário</ErrorRelatorio>}
                        </FormGroup>

                        <FormGroup>
                            <FormLabel>Nome do paciente</FormLabel>
                            <InputData type='text' name='nomePaciente' placeholder='Nome do paciente' onChange={e => handleNomePaciente(e.target.value)} />
                            {erroNomePaciente && <ErrorRelatorio>Insira o nome do paciente</ErrorRelatorio>}
                        </FormGroup>

                        <FormGroup>
                            <FormLabel>Data de nascimento</FormLabel>
                            <InputData type='date' name='dataNascimento' onChange={e => handleDataNascimento(e.target.value)} />
                            {erroDataNascimento && <ErrorRelatorio>Insira a data de nascimento</ErrorRelatorio>}
                        </FormGroup>

                        <FormGroup>
                            <FormLabel>Grau do relatório</FormLabel>
                            <SelectInput name="grauRelatorio" onChange={e => handleGrauRelatorio(e.target.value)}>
                                <OptionSelect value="0">Grau do relatório</OptionSelect>
                                <OptionSelect value="1">Prioridade</OptionSelect>
                                <OptionSelect value="2">Não Urgente</OptionSelect>
                                <OptionSelect value="3">Rotina</OptionSelect>
                            </SelectInput>
                            {erroGrauRelatorio && <ErrorRelatorio>Selecione o grau do relatório</ErrorRelatorio>}
                        </FormGroup>

                        <FormGroup>
                            <FormLabel>Assunto</FormLabel>
                            <InputData type='text' name='assuntoRelatorio' placeholder='Assunto Relatório' onChange={e => handleAssuntoRelatorio(e.target.value)} />
                            {erroAssuntoRelatorio && <ErrorRelatorio>Insira o assunto do relatório</ErrorRelatorio>}
                        </FormGroup>

                        <FormGroup>
                            <FormLabel>Arquivo</FormLabel>
                            <InputData type='file' name='arquivo' onChange={handleFileChange} />
                        </FormGroup>
                    </ModalForm>
                </ModalTemplate>
            )}

            {alertIsOpen && (
                <AlertTemplate title={alertTitle}>
                    {alertType === 'success' 
                        ? (
                            <SuccessAlert message={alertMessage} close={() => setAlertIsOpen(false)} />
                        ) : (
                            <ErrorAlert message={alertMessage} close={() => setAlertIsOpen(false)} />
                        )}
                </AlertTemplate>
            )}
        </>
    )
}

ModalRelatorio.propTypes = {
    titulo: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired
};

export default React.memo(ModalRelatorio);
