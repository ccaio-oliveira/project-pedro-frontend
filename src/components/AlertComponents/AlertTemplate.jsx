import { AlertBackground, AlertBody, AlertContainer } from "./AlertTemplate.styles"
import { PropTypes } from 'prop-types';

const AlertTemplate = ({ children }) => {
    return (
        <AlertBackground>
            <AlertContainer>
                <AlertBody>
                    {children}
                </AlertBody>
            </AlertContainer>
        </AlertBackground>
    )
}

AlertTemplate.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired
}

export default AlertTemplate;
