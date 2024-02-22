import { useState } from "react";
import { BtnConfigTop, ConfigComponent, ConfigContainer, ConfigContainerTitle, ConfigIconChevron, ConfigMain, ConfigSubTitle, ConfigTitle, ConfigTop, ConfigTopLeft, ConfigTopRight } from "./Configuracao.styles";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import AcessoESeguranca from "./AcessoESeguranca/AcessoESeguranca";
import PerfilUsuario from "./UserProfile/UserProfile";

library.add(faChevronRight, faChevronDown);

const Configuracao = () => {
    const [component, setComponent] = useState();
    const [subTitle, setSubTitle] = useState('Selecione a configuração que deseja realizar');

    // adiciona um estado para controlar qual botão está selecionado
    const [btnAcessoSelected, setBtnAcessoSelected] = useState(0);
    const [btnAdminSelected, setBtnAdminSelected] = useState(0);
    const [btnPerfilSelected, setBtnPerfilSelected] = useState(0);
    const [btnCadastrarSelected, setBtnCadastrarSelected] = useState(0);

    // altera o icone do botão selecionado
    const [iconBtnAcesso, setIconBtnAcesso] = useState(['fas', 'chevron-right']);
    const [iconBtnAdmin, setIconBtnAdmin] = useState(['fas', 'chevron-right']);
    const [iconBtnPerfil, setIconBtnPerfil] = useState(['fas', 'chevron-right']);
    const [iconBtnCadastrar, setIconBtnCadastrar] = useState(['fas', 'chevron-right']);

    const handleComponent = (component) => {
        // Se o botão selecionado for o de número 1 (Acesso e segurança)
        if (component === 1) {
            // Se o botão de acesso e segurança estiver selecionado, deseleciona
            if (btnAcessoSelected === 1) {
                setBtnAcessoSelected(0);
                setIconBtnAcesso(['fas', 'chevron-right']);
                setSubTitle('Selecione a configuração que deseja realizar');
                setComponent('');
            } else {
                // Se não, seleciona
                setBtnAcessoSelected(1);
                setIconBtnAcesso(['fas', 'chevron-down']);
                setSubTitle('Acesso e segurança');
                setComponent(<AcessoESeguranca />)

                // Remove a seleção dos outros botões e muda os ícones
                setBtnAdminSelected(0);
                setBtnPerfilSelected(0);
                setBtnCadastrarSelected(0);

                setIconBtnAdmin(['fas', 'chevron-right']);
                setIconBtnPerfil(['fas', 'chevron-right']);
                setIconBtnCadastrar(['fas', 'chevron-right']);
            }
        }

        // Se o botão selecionado for o de número 2 (Principais Administradores)
        if (component === 2) {
            // Se o botão de principais administradores estiver selecionado, deseleciona
            if (btnAdminSelected === 1) {
                setBtnAdminSelected(0);
                setIconBtnAdmin(['fas', 'chevron-right']);
                setSubTitle('Selecione a configuração que deseja realizar');
            } else {
                // Se não, seleciona
                setBtnAdminSelected(1);
                setIconBtnAdmin(['fas', 'chevron-down']);
                setSubTitle('Principais Administradores');

                // Remove a seleção dos outros botões e muda os ícones
                setBtnAcessoSelected(0);
                setBtnPerfilSelected(0);
                setBtnCadastrarSelected(0);

                setIconBtnAcesso(['fas', 'chevron-right']);
                setIconBtnPerfil(['fas', 'chevron-right']);
                setIconBtnCadastrar(['fas', 'chevron-right']);
            }
        }

        // Se o botão selecionado for o de número 3 (Perfil de usuário)
        if (component === 3) {
            // Se o botão de perfil de usuário estiver selecionado, deseleciona
            if (btnPerfilSelected === 1) {
                setBtnPerfilSelected(0);
                setIconBtnPerfil(['fas', 'chevron-right']);
                setSubTitle('Selecione a configuração que deseja realizar');
                setComponent('');
            } else {
                // Se não, seleciona
                setBtnPerfilSelected(1);
                setIconBtnPerfil(['fas', 'chevron-down']);
                setSubTitle('Perfil de usuário');
                setComponent(<PerfilUsuario />)

                // Remove a seleção dos outros botões e muda os ícones
                setBtnAcessoSelected(0);
                setBtnAdminSelected(0);
                setBtnCadastrarSelected(0);

                setIconBtnAcesso(['fas', 'chevron-right']);
                setIconBtnAdmin(['fas', 'chevron-right']);
                setIconBtnCadastrar(['fas', 'chevron-right']);
            }
        }

        // Se o botão selecionado for o de número 4 (Cadastrar usuário)
        if (component === 4) {
            // Se o botão de cadastrar usuário estiver selecionado, deseleciona
            if (btnCadastrarSelected === 1) {
                setBtnCadastrarSelected(0);
                setIconBtnCadastrar(['fas', 'chevron-right']);
                setSubTitle('Selecione a configuração que deseja realizar');
            } else {
                // Se não, seleciona
                setBtnCadastrarSelected(1);
                setIconBtnCadastrar(['fas', 'chevron-down']);
                setSubTitle('Cadastrar usuário');

                // Remove a seleção dos outros botões e muda os ícones
                setBtnAcessoSelected(0);
                setBtnAdminSelected(0);
                setBtnPerfilSelected(0);
                
                setIconBtnAcesso(['fas', 'chevron-right']);
                setIconBtnAdmin(['fas', 'chevron-right']);
                setIconBtnPerfil(['fas', 'chevron-right']);
            }
        }

    }

    return (
        <ConfigContainer>
            <ConfigTop>
                <ConfigTopLeft>
                    <BtnConfigTop onClick={() => handleComponent(1)} selected={btnAcessoSelected}>
                        Acesso e segurança <ConfigIconChevron icon={iconBtnAcesso} />
                    </BtnConfigTop>
                    <BtnConfigTop onClick={() => handleComponent(2)} selected={btnAdminSelected}>
                        Principais Administradores <ConfigIconChevron icon={iconBtnAdmin} />
                    </BtnConfigTop>
                </ConfigTopLeft>

                <ConfigTopRight>
                    <BtnConfigTop onClick={() => handleComponent(3)} selected={btnPerfilSelected}>
                        Perfil de usuário <ConfigIconChevron icon={iconBtnPerfil} />
                    </BtnConfigTop>
                    <BtnConfigTop onClick={() => handleComponent(4)} selected={btnCadastrarSelected}>
                        Cadastrar usuário <ConfigIconChevron icon={iconBtnCadastrar} />
                    </BtnConfigTop>
                </ConfigTopRight>
            </ConfigTop>

            <ConfigMain>
                <ConfigContainerTitle>
                    <ConfigTitle>Configuração</ConfigTitle>
                    <ConfigSubTitle>{subTitle}</ConfigSubTitle>
                </ConfigContainerTitle>

                <ConfigComponent>
                    {component}
                </ConfigComponent>
            </ConfigMain>
        </ConfigContainer>
    )
}

export default Configuracao;