import { DeleteOutline, Edit } from "@mui/icons-material";
import { Card, Tooltip } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { TableColumn } from "react-data-table-component";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Box, DataTableBase, FilterTable, Layout } from "../../components";
import { Routers } from "../../share";
import { UpdateError } from "../../share/reducers/modal-msg";
import insiteApi from "../../share/services/insite-api";

const columns=[
    {field:'id',headerName:'ID',type:'number',width:30},
    {field: 'name', headerName: 'Name', flex: 1},
    {
        field: 'image',
        headerName: 'Image',
        sortable: false,
        filterable: false,
        flex:1,
        renderCell: (params: GridRenderCellParams) => {
            // if(!params.value) return <image src={"/error-image.jpg"} style={{height: 60, maxWidth: '100%'}}/>
            return (<img
                src={params.row.avatar.formats.thumbnail.url}
                width={80} height={80}/>)
        }
    },
    {field: 'location',
     headerName: 'Location', 
     flex: 1,
     renderCell:(params)=>{
         return (
             <div>{params.row.location.address}</div>
         )
     }
    },
    {
        field: 'bu',
        headerName: 'BU',
        sortable: false,
        filterable: false,
        flex:1,
        renderCell: (params: GridRenderCellParams) => {
            // if(!params.value) return <image src={"/error-image.jpg"} style={{height: 60, maxWidth: '100%'}}/>
            return (<img
                src={params.row.business_unit.logo.formats.thumbnail.url}
                width={80} height={80}/>)
        }
    },
    {field: 'contact',
     headerName: 'Contact',
     flex: 1,
     renderCell:(params)=>{
         return (
             <div>{params.row.contact.contact_phone}</div>
         )
     }
    },
    {
        field: 'action', headerName: '#', sortable: false,
        filterable: false,
        renderCell: (params) => {
            //  @ts-ignore
            const path = Routers.STORE_DETAIL.path.replace(":id", params.id);

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

const StoresPage: React.FC = Layout(() => {
    const [stores, setStores] = useState<null | any[]>(null);
    const appDispatch=useDispatch();
    const _fetchStores = async (filterData:any) => {
        try {
            const { stores, count } = await insiteApi.StoreService.getStores(filterData);
            setStores(stores);
        } catch (error) {
            console.log(error);
            appDispatch(UpdateError(error));
        }
    };

    

    const _onFilterChange=(newFilter:any)=>{
        _fetchStores(newFilter);
    }

    return (
        <Card>
            <FilterTable 
                onFilterChange={_onFilterChange}
                data={stores?{data:stores,count:stores.length}:null}
                detailRoute={Routers.STORE_DETAIL.path}
                columns={columns}
            />
        </Card>
    );
});

export default StoresPage;
