// resources/js/Pages/Login.jsx
import { useState } from 'react';
import IsLogin from '../../components/Login/Login';
import { Direitos, ImgElement, LeftElement, LoginElement, RightElement, TextElement, TextH1, TextP } from './Login.styles';

const Login = () => {
    const handleComponent = (component) => {
        setComponent(component);
    }

    const [component, setComponent] = useState(<IsLogin changeComponent={handleComponent} />);
    document.title = "Login";

    return (
        <>
            <LoginElement>
                <LeftElement>
                    <ImgElement src="images/medicine2.png" alt="Medicine 2" />
                    <TextElement>
                        <TextH1>Se conecte com sua equipe e salve vidas!</TextH1>
                        <TextP>Mande solicitações de relatórios, agende consultas e gerencie o seu tempo.</TextP>
                    </TextElement>
                </LeftElement>

                <RightElement>
                    {component}

                    <Direitos>
                        <small>NOME © Todos os direitos reservados.</small>
                    </Direitos>
                </RightElement>
            </LoginElement>
        </>
    );
};

export default Login;
