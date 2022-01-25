import { DeleteOutline, Edit } from "@mui/icons-material";
import { Card, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { TableColumn } from "react-data-table-component";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Box, DataTableBase, FilterTable, Layout } from "../../components";
import { Routers } from "../../share";
import { UpdateError } from "../../share/reducers/modal-msg";
import insiteApi from "../../share/services/insite-api";



const columns=[
    {field:'id',headerName:'ID',type:'number',width:30},
    {field: 'label', headerName: 'Label', flex: 1},
    {field: 'point', headerName: 'Point', flex: 1},
    {
        field: 'action', headerName: '#', sortable: false,
        filterable: false,
        renderCell: (params) => {
            //  @ts-ignore
            const path = Routers.USER_DETAIL.path.replace(":id", params.id);

            return (
                <>
                    <Link to={path}>
                        <Tooltip title="Chỉnh sửa">
                            <Edit color="info"/>
                        </Tooltip>
                    </Link>
                    <Link to={path}>
                        <Tooltip title="Xoá">
                            <DeleteOutline color="error"/>
                        </Tooltip>
                    </Link>
                </>
            )
        }
    }

]

const UsersPage: React.FC = Layout(() => {
    const [users, setUsers] = useState<null | any[]>(null);
    const appDispatch=useDispatch();

    const _fetchUsers = async (filterData:any) => {
        try {
            const { count, users } = await insiteApi.UserService.getUsers(filterData);
            setUsers(users);
        } catch (error) {
            appDispatch(UpdateError(error));
        }
    };

    const _onFilterChange=(newFilter:any)=>{
        _fetchUsers(newFilter);
    }
    return (
        <Card>
            <FilterTable 
                onFilterChange={_onFilterChange}
                data={users?{data:users,count:users.length}:null}
                detailRoute={Routers.USER_DETAIL.path}
                columns={columns}
            />
        </Card>
    );
});

export default UsersPage;
