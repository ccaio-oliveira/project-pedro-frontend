import { PropTypes } from 'prop-types';
import ModalTemplate from '../../Modal/Modal';
import { TBody, TD, TH, THead, TR } from '../../../global.styles';
import { TDRelatoriosAgenda, TableRelatoriosAgenda } from './ModalRelatoriosData.styles';
import { StatusRelatorio } from '../../Relatorios/TabelaRelatorios/TabelaRelatorios.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { useState } from 'react';
import ModalDetAchado from '../../Relatorios/ModalDetAchado/ModalDetAchado';

library.add(faCircleCheck);

const ModalRelatoriosData = ({ achado, onClose }) => {
    const [openModal, setOpenModal] = useState(false);
    const [conteudo, setConteudo] = useState({});

    const openModalDetAchado = (relatorio) => {
        setConteudo({...relatorio});
        setOpenModal(true);
    }

    const closeModalDetAchado = () => {
        setConteudo({});
        setOpenModal(false);
    }

    return (
        <>
            <ModalTemplate onRequestClose={onClose} title='Chamados nesta data'>
                <TableRelatoriosAgenda>
                    <THead>
                        <TR>
                            <TH>Chamado</TH>
                            <TH>Status</TH>
                        </TR>
                    </THead>
                    <TBody>
                        {achado.map((relatorio) => {
                            return (
                                <TR key={relatorio.id} onClick={() => openModalDetAchado(relatorio)}>
                                    <TDRelatoriosAgenda>
                                        Veja o achado do(a) paciente {relatorio.nome_paciente} comunicado por 
                                        <strong> {relatorio.aberto_por}</strong>
                                    </TDRelatoriosAgenda>
                                    <TDRelatoriosAgenda>
                                        <StatusRelatorio $status={relatorio.status}><FontAwesomeIcon icon={['fas', 'circle-check']} />{relatorio.status}</StatusRelatorio>
                                    </TDRelatoriosAgenda>
                                </TR>
                            )
                        })}
                    </TBody>
                </TableRelatoriosAgenda>
            </ModalTemplate>

            {openModal && (
                <ModalDetAchado achado={conteudo} onClose={closeModalDetAchado} />
            )}
        </>
    )
}

ModalRelatoriosData.propTypes = {
    achado: PropTypes.array.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ModalRelatoriosData;