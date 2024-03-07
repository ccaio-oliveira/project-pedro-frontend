import { UsersContainer, UsersContainerTable } from "./Users.styles";
import UsersTable from "./UsersTable/UsersTable";

const UsersComponent = () => {    
    return(
        <UsersContainer>
            <UsersContainerTable>
                <UsersTable />
            </UsersContainerTable>
        </UsersContainer>
    )
}

export default UsersComponent;