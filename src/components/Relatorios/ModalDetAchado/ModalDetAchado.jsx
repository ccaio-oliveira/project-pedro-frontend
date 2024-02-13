import { PropTypes } from 'prop-types';
import ModalTemplate from '../../Modal/Modal';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import { useEffect, useState } from 'react';
import { IconCopy, IconWhats, ItemContainer, ItemContainerAssunto, ItemDescription, ItemDescriptionAssunto, ItemDescriptionCopy, ItemTitle, ItemTitleAssunto, MensagemCopiada, ModalDetAchadoContainer, TextDescription } from './ModalDetAchado.styles';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

library.add([faCopy, faWhatsapp]);

const ModalDetAchado = ({ achado, onClose }) => {
    const { sessao, headers } = useAuth();

    const [textoCopy, setTextoCopy] = useState('');
    const [copied, setCopied] = useState(false);
    
    const handleVisualizacao = async () => {
        await axios.get(`/api/relatorios/${achado.id}/${sessao.id}`, { headers });
    }

    const handleDownloadArquivo = async (id_arquivo, nomeArquivo) => {
        await axios.get(`/api/relatorios/download/${id_arquivo}`, { headers, responseType: 'blob'})
        .then((res) => {
            const url = window.URL.createObjectURL(new Blob([res.data]));

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', nomeArquivo);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const montarTexto = () => {
        setTextoCopy(`Olá ${achado.atrelado_a}, o paciente ${achado.nome_paciente} 
        possui um achado de ${achado.grau === 1 ? 'prioridade ' : (achado.grau === 2 ? 'não urgente ' : 'rotina ')} 
        enviado pelo ${achado.aberto_por} com o assunto ${achado.assunto}.`);
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(textoCopy);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    }

    const formatarData = (date) => {
        const data = new Date(date);

        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();

        const horas = String(data.getHours()).padStart(2, '0');
        const minutos = String(data.getMinutes()).padStart(2, '0');
        const segundos = String(data.getSeconds()).padStart(2, '0');

        const dataFormatada = `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;

        return dataFormatada;
    }

    useEffect(() => {
        if(achado.atrelado_a == sessao.nome_completo){
            handleVisualizacao();
        }

        montarTexto();
    }, []);

    return (
        <>
            <ModalTemplate title="Chamado detalhado" onRequestClose={onClose}>
                <ModalDetAchadoContainer>
                    <ItemContainerAssunto>
                        <ItemTitleAssunto>Assunto:</ItemTitleAssunto>
                        <ItemDescriptionAssunto>{achado.assunto}</ItemDescriptionAssunto>
                    </ItemContainerAssunto>

                    <ItemContainer>
                        <ItemTitle>Para:</ItemTitle>
                        <ItemDescription>{achado.atrelado_a}</ItemDescription>
                    </ItemContainer>

                    <ItemContainer>
                        <ItemTitle>Enviado por:</ItemTitle>
                        <ItemDescription>{achado.aberto_por}</ItemDescription>
                    </ItemContainer>

                    <ItemContainer>
                        <ItemTitle>Paciente:</ItemTitle>
                        <ItemDescription>{achado.nome_paciente}</ItemDescription>
                    </ItemContainer>

                    <ItemContainer>
                        <ItemTitle>Data de nascimento:</ItemTitle>
                        <ItemDescription>{formatarData(achado.data_nascimento_paciente)}</ItemDescription>
                    </ItemContainer>

                    <ItemContainer>
                        <ItemTitle>Status:</ItemTitle>
                        <ItemDescription>{achado.grau === 1 ? 'Prioridade' : (achado.grau === 2 ? 'Não Urgente' : 'Rotina')}</ItemDescription>
                    </ItemContainer>

                    <ItemContainer>
                        <ItemTitle>Arquivo:</ItemTitle>
                        <ItemDescription onClick={() => handleDownloadArquivo(achado.arquivo_id, achado.arquivo)}>Abrir arquivo</ItemDescription>
                    </ItemContainer>

                    <ItemContainerAssunto>
                        <ItemTitleAssunto>Mensagem pronta:</ItemTitleAssunto>
                        <ItemDescriptionCopy>
                            <TextDescription>
                                {textoCopy}
                            </TextDescription>
                            <IconCopy icon={['far', 'copy']} onClick={copyToClipboard} />
                        </ItemDescriptionCopy>
                        {copied && <MensagemCopiada>Mensagem copiada!</MensagemCopiada>}
                    </ItemContainerAssunto>

                    <ItemContainer>
                        <ItemTitle>Contato do médico:</ItemTitle>
                        <ItemDescription>
                            <IconWhats href={`https://wa.me/5574998059407?text=${encodeURIComponent(textoCopy)}`} target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={['fab', 'whatsapp']} />
                            </IconWhats>
                        </ItemDescription>
                    </ItemContainer>
                </ModalDetAchadoContainer>
            </ModalTemplate>
        </>
    )
}

ModalDetAchado.propTypes = {
    achado: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
}

export default ModalDetAchado;