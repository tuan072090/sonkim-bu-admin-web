import React, { useEffect, useState } from "react";
import { TableColumn } from "react-data-table-component";
import { useHistory } from "react-router-dom";
import { Box, DataTableBase, Layout } from "../../components";
import Loader from "../../components/atoms/loader";
import { Routers } from "../../share";
import { UserDataRow } from "../../share/data-types/user";
import insiteApi from "../../share/services/insite-api";

const columns: TableColumn<UserDataRow>[] = [
    {
        name: "ID",
        cell: (row) => <a href={Routers.USERS.path + `/${row.id}`}>{row.id}</a>,
        sortable: true,
        reorder: true,
    },
    {
        name: "Label",
        selector: (row) => row.label,
        sortable: true,
        reorder: true,
        wrap: true,
    },
    {
        name: "Point",
        selector: (row) => row.point,
        sortable: true,
        reorder: true,
    },
];

const UsersPage: React.FC = Layout(() => {
    const [users, setUsers] = useState<null | any[]>(null);
    const history = useHistory();

    const _fetchUsers = async () => {
        try {
            const { count, users } = await insiteApi.UserService.getUsers();
            setUsers(users);
        } catch (error) {
            throw error;
        }
    };

    const _onRowClicked = (row: any, event: React.MouseEvent) => {
        console.log("row...", row);
    };
    useEffect(() => {
        _fetchUsers();
    }, []);
    return (
        <div>
            {!users ? (
                <div className="flex justify-center items-center">
                    <Loader status="info" />
                </div>
            ) : (
                <Box>
                    <DataTableBase
                        title="Users list"
                        columns={columns}
                        data={users}
                        onRowClicked={_onRowClicked}
                    />
                </Box>
            )}
        </div>
    );
});

export default UsersPage;
