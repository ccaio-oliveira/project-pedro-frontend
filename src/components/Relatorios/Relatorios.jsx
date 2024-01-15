import { Link } from 'react-router-dom';

const Relatorios = () => {

    return(
        <h1>
            Relatórios
            <Link to={'/perfil'}>Ir para perfil</Link>
        </h1>
    )
}

export default Relatorios;