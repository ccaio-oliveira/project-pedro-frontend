import React from "react";

import { CarregarContainer, Spinner, TextLoading } from "./Carregando.styles.jsx";

const Carregando = ({ title }) => {

    return(
        <CarregarContainer>
            <Spinner />
            <TextLoading>Carregando {title}...</TextLoading>
        </CarregarContainer>
    )
}

export default React.memo(Carregando);