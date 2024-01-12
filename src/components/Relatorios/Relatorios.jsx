import React from "react"
import { useAuth } from "../../context/AuthContext"

const Relatorios = () => {
    const { session } = useAuth();

    console.log(session)
    return(
        <h1>Relatorios</h1>
    )
}

export default React.memo(Relatorios);