import { ContainerBars, ContainerHeader } from "./Header.styles";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { library } from "@fortawesome/fontawesome-svg-core";
import { PropTypes } from 'prop-types';

library.add(faBars);

const Header = ({ openMenu }) => {
    return(
        <ContainerHeader>
            <ContainerBars onClick={openMenu}>
                <FontAwesomeIcon icon={faBars} size="2x" />
            </ContainerBars>
        </ContainerHeader>
    )
}

Header.propTypes = {
    openMenu: PropTypes.func.isRequired
}

export default Header;