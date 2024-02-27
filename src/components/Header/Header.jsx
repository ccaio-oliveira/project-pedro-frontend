import { ContainerBars, ContainerHeader, ContainerIconBell, ContainerInfos } from "./Header.styles";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { library } from "@fortawesome/fontawesome-svg-core";
import { PropTypes } from 'prop-types';

library.add([faBars, faBell]);

const Header = ({ openMenu }) => {
    return(
        <ContainerHeader>
            <ContainerBars onClick={openMenu}>
                <FontAwesomeIcon icon={['fas', 'bars']} size="1x" />
            </ContainerBars>

            <ContainerInfos>
                <ContainerIconBell>
                    <FontAwesomeIcon icon={['far', 'bell']} size="1x" />
                </ContainerIconBell>
            </ContainerInfos>
        </ContainerHeader>
    )
}

Header.propTypes = {
    openMenu: PropTypes.func.isRequired
}

export default Header;