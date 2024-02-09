import { PropTypes } from 'prop-types';
import ModalTemplate from '../../Modal/Modal';
import { ModalForm } from '../ModalCriarAchado/ModalCriarAchado.styles';
import { FormGroup, FormLabel, InputData, OptionSelect, SelectInput } from '../../../global.styles';

const ModalExpRelatorios = ({ titulo, onClose }) => {
    return (
        <ModalTemplate title={titulo} onRequestClose={onClose} modalFooter={true} submitTitle={'Exportar'}>
            <ModalForm>
                <FormGroup>
                    <FormLabel>Prioridade do Relatório</FormLabel>
                    <SelectInput>
                        <OptionSelect value="1">Prioridade</OptionSelect>
                        <OptionSelect value="2">Não Urgente</OptionSelect>
                        <OptionSelect value="3">Rotina</OptionSelect>
                    </SelectInput>
                </FormGroup>

                <FormGroup>
                    <FormLabel>Data início:</FormLabel>
                    <InputData type="date" />
                </FormGroup>

                <FormGroup>
                    <FormLabel>Data fim:</FormLabel>
                    <InputData type="date" />
                </FormGroup>

                <FormGroup>
                    <FormLabel>Status:</FormLabel>
                    <SelectInput>
                        <OptionSelect value="0">Todos</OptionSelect>
                        <OptionSelect value="1">Pendentes</OptionSelect>
                        <OptionSelect value="2">Visualizados</OptionSelect>
                    </SelectInput>
                </FormGroup>
            </ModalForm>
        </ModalTemplate>
    );
};

ModalExpRelatorios.propTypes = {
    titulo: PropTypes.string,
    onClose: PropTypes.func
}

export default ModalExpRelatorios;
