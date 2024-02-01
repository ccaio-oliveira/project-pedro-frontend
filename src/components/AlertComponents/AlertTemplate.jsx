import { AlertBackground, AlertBody, AlertContainer, AlertHeader } from "./AlertTemplate.styles"
import { PropTypes } from 'prop-types';

const AlertTemplate = ({ children, title }) => {
    return (
        <AlertBackground>
            <AlertContainer>
                <AlertHeader>
                    <h3>{title}</h3>
                </AlertHeader>
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
