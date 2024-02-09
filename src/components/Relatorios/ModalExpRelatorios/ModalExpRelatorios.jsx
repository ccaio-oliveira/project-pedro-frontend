import { PropTypes } from 'prop-types';
import ModalTemplate from '../../Modal/Modal';
import { ModalForm } from '../ModalCriarAchado/ModalCriarAchado.styles';
import { FormGroup, FormLabel, OptionSelect, SelectInput } from '../../../global.styles';

const ModalExpRelatorios = ({ titulo, onClose }) => {
    return (
        <ModalTemplate title={titulo} onRequestClose={onClose}>
            <ModalForm>
                <FormGroup>
                    <FormLabel>Prioridade do Relatório</FormLabel>
                    <SelectInput>
                        <OptionSelect value="1">Prioridade</OptionSelect>
                        <OptionSelect value="2">Não Urgente</OptionSelect>
                        <OptionSelect value="3">Rotina</OptionSelect>
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
