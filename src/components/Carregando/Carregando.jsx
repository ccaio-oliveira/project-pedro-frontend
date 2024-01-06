import React from "react";

import { CarregarContainer, Spinner } from "./Carregando.styles";

const Carregando = () => {
    return(
        <CarregarContainer>
            <Spinner />
        </CarregarContainer>
    )
}

export default React.memo(Carregando);