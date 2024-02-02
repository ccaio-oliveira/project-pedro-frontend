import { PropTypes } from 'prop-types';
import ModalTemplate from '../../Modal/Modal';

const ModalDetAchado = ({ achado, onClose }) => {
    console.log(achado)
    return (
        <>
            <ModalTemplate title="Chamado detalhado" onRequestClose={onClose}>
                <h1>Apareci</h1>
            </ModalTemplate>
        </>
    )
}

ModalDetAchado.propTypes = {
    achado: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
}

export default ModalDetAchado;