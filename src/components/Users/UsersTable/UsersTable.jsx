import { useAuth } from "../../../context/AuthContext";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import Carregando from "../../Carregando/Carregando";
import { TDUsers, UsersContainerData, UsersInfoTable } from "./UsersTable.styles";
import { ContainerSearch, IconSearch, InputSearch } from "../../Relatorios/TabelaRelatorios/TabelaRelatorios.styles";
import { ContainerTable, TBody, TH, THead, TR, Tabela } from "../../../global.styles";
import { IconWhatsapp } from "../../Contatos/TabelaContatos/TabelaContatos.styles";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import Pagination from './../../Pagination/Pagination';

library.add(faWhatsapp);

const UsersTable = () => {
    // variaveis de autenticacao
    const { headers } = useAuth();

    // variável para a paginação 
    const [currentPage, setCurrentPage] = useState(1);

    // variáveis para o filtro de busca de usuários
    const [searchUser, setSearchUser] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    const [dataUsers, setDataUsers] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const handleUsers = async () => {
        await axios.get('/api/allUsers', {
            headers
        }).then(res => {
            setDataUsers(res.data);
            setIsLoading(false);
        }).catch(() => {
            setDataUsers([]);
            setIsLoading(false);
        });
    }

    const handleSearch = (value) => {
        setSearchUser(value);
        
        setFilteredUsers(dataUsers.filter(user => {
            if(user.nome_completo.toLowerCase().includes(value.toLowerCase())) {
                return user;
            }
        }));
    };

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * 10;
        const lastPageIndex = firstPageIndex + 10;
        return dataUsers.slice(firstPageIndex, lastPageIndex)
    }, [currentPage, dataUsers])

    useEffect(() => {
        handleUsers();
        setIsLoading(true);
    }, []);

    return (
        <>
            {isLoading ? (
                <Carregando title="Carregando usuários" />
            ) : (
                <>
                    <UsersInfoTable>
                        <UsersContainerData>
                            <ContainerSearch>
                                <InputSearch 
                                    type="text" 
                                    name="searchUsers" 
                                    value={searchUser} onChange={e => handleSearch(e.target.value)} placeholder="Pesquisar usuário" 
                                />
                                <IconSearch icon={['fas', 'search']} />
                            </ContainerSearch>
                        </UsersContainerData>
                    </UsersInfoTable>

                    <ContainerTable>
                        <Tabela>
                            <THead>
                                <TR>
                                    <TH>Nome</TH>
                                    <TH>Função</TH>
                                    <TH>Telefone</TH>
                                </TR>
                            </THead>
                            <TBody>
                                {currentTableData.length !== 0 ? (
                                    searchUser === '' ? (
                                        currentTableData.map((user) => (
                                            <TR key={user.id}>
                                                <TDUsers>{user.nome_completo}</TDUsers>
                                                <TDUsers>
                                                    {user.perfil_usuario == 1 ? 'Administrador' : (user.perfil_usuario == 2 ? 'Médico' : 'Secretário(a)')}
                                                </TDUsers>
                                                <TDUsers>
                                                    <IconWhatsapp target="_blank" href={`https://wa.me/${user.telefone_whats}`}>
                                                        <FontAwesomeIcon icon={['fab', 'whatsapp']} />
                                                    </IconWhatsapp>
                                                </TDUsers>
                                            </TR>
                                        ))
                                    ) : (
                                        filteredUsers.length !== 0 ? (
                                            filteredUsers.map((user) => (
                                                <TR key={user.id}>
                                                    <TDUsers>{user.nome_completo}</TDUsers>
                                                    <TDUsers>{user.perfil_usuario == 1 ? 'Administrador' : (user.perfil_usuario == 2 ? 'Médico' : 'Secretária')}</TDUsers>
                                                    <TDUsers>
                                                        <IconWhatsapp target='_blank' href={`https://wa.me/${user.telefone_whats}`}>
                                                            <FontAwesomeIcon icon={['fab', 'whatsapp']} />
                                                        </IconWhatsapp>
                                                    </TDUsers>
                                                </TR>
                                            ))
                                        ) : (
                                            <TR>
                                                <TDUsers colSpan="3">Nenhum usuário encontrado</TDUsers>
                                            </TR>
                                        )
                                    )
                                ) : (
                                    <TR>
                                        <TDUsers colSpan="3">Nenhum usuário cadastrado</TDUsers>
                                    </TR>
                                )}
                            </TBody>
                        </Tabela>
                    </ContainerTable>
                    <Pagination
                        currentPage={currentPage}
                        totalCount={dataUsers.length}
                        pageSize={10}
                        onPageChange={page => setCurrentPage(page)}
                    />
                </>
            )}
        </>
    );
}

export default UsersTable;