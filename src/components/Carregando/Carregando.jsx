import React from "react";

import { CarregarContainer, Spinner, TextLoading } from "./Carregando.styles.jsx";
import PropTypes from 'prop-types';

const Carregando = ({ title }) => {

    return(
        <CarregarContainer>
            <Spinner />
            <TextLoading>{title}...</TextLoading>
        </CarregarContainer>
    )
}

Carregando.propTypes = {
    title: PropTypes.string.isRequired
};

export default React.memo(Carregando);