import React, { useState } from "react";

import { CarregarContainer, Spinner } from "./Carregando.styles.jsx";

const Carregando = ({ title }) => {

    return(
        <CarregarContainer>
            <Spinner />
            <p>Carregando {title}</p>
        </CarregarContainer>
    )
}

export default React.memo(Carregando);