import { DeleteOutline, Edit } from "@mui/icons-material";
import { Card, Tooltip } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { TableColumn } from "react-data-table-component";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Box, DataTableBase, FilterTable, Layout } from "../../components";
import { InsideApiService, Routers } from "../../share";
import { LoyaltyProgramDataRow } from "../../share/data-types/loyalty-program";
import { UpdateError } from "../../share/reducers/modal-msg";


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
    {
        field: 'point_system',
        headerName: 'Point System',
        sortable: false,
        filterable: false,
        flex:1,
        renderCell: (params: GridRenderCellParams) => {
            // if(!params.value) return <image src={"/error-image.jpg"} style={{height: 60, maxWidth: '100%'}}/>
            return (<img
                src={params.row.point_system.icon.formats.thumbnail.url}
                width={80} height={80}/>)
        }
    },
    {
        field: 'action', headerName: '#', sortable: false,
        filterable: false,
        renderCell: (params) => {
            //  @ts-ignore
            const path = Routers.ARTICLE_DETAIL.path.replace(":id", params.id);

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

const LoyaltyProgramsPage: React.FC = Layout(() => {
    const [loyaltyPrograms, setLoyaltyPrograms] = useState<null | any[]>(null);
    const appDispatch=useDispatch();

    const _fetchLoyaltyPrograms = async (filterData:any) => {
        try {
            const { count, loyaltyPrograms } =
                await InsideApiService.LoyaltyService.getLoyaltyPrograms(filterData);
            setLoyaltyPrograms(loyaltyPrograms);
        } catch (error) {
            console.log(error);
            appDispatch(UpdateError(error));
        }
    };

    const _onFilterChange=(newFilter:any)=>{
        _fetchLoyaltyPrograms(newFilter);
    }

    return (
        <Card>
            <FilterTable 
                onFilterChange={_onFilterChange}
                data={loyaltyPrograms?{data:loyaltyPrograms,count:loyaltyPrograms.length}:null}
                detailRoute={Routers.LOYALTY_PROGRAM_DETAIL.path}
                columns={columns}
            />
        </Card>
    );
});

export default LoyaltyProgramsPage;
