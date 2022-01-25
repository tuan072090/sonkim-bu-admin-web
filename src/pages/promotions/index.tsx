import { DeleteOutline, Edit } from "@mui/icons-material";
import { Card, Tooltip } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { TableColumn } from "react-data-table-component";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Box, DataTableBase, FilterTable, Layout } from "../../components";
import Loader from "../../components/atoms/loader";
import { Routers } from "../../share";
import { PromotionDataRow } from "../../share/data-types/promotion";
import { UpdateError } from "../../share/reducers/modal-msg";
import insiteApi from "../../share/services/insite-api";
import { FormatVND } from "../../share/utils/formater";

// const columns: TableColumn<PromotionDataRow>[] = [
//     {
//         name: "ID",
//         cell: (row) => <a href={Routers.PROMOTIONS.path + `/${row.id}`}>{row.id}</a>,
//         sortable: true,
//         reorder: true,
//     },
//     {
//         name: "Title",
//         selector: (row) => row.title,
//         sortable: true,
//         reorder: true,
//         wrap: true,
//     },
//     {
//         name: "Description",
//         cell: (row) => <div>{`${row.description.slice(0, 100)}...`}</div>,
//         sortable: true,
//         reorder: true,
//         wrap: true,
//     },
//     {
//         name: "Image",
//         cell: (row) => (
//             <img
//                 src={row.avatar.formats.thumbnail.url}
//                 width={50}
//                 height={50}
//             />
//         ),
//         reorder: true,
//         center: true,
//     },
//     {
//         name: "Cash",
//         selector: (row) => FormatVND(row.cash),
//         sortable: true,
//         reorder: true,
//         center: true,
//     },
//     {
//         name: "Loyalty program",
//         cell: (row) => <a href="#">{row.loyalty_program.name}</a>,
//         sortable: true,
//         reorder: true,
//     },
//     {
//         name: "Stores",
//         cell: (row) => (
//             <div>
//                 {row.stores.map((store, i) => (
//                     <div key={i}>{store.name}</div>
//                 ))}
//             </div>
//         ),
//         reorder: true,
//         center: true,
//     },
// ];

const columns=[
    {field:'id',headerName:'ID',type:'number',width:30},
    {field: 'title', headerName: 'Title', flex: 1},
    {
        field: 'description',
        headerName: 'Description', 
        flex: 1,
        renderCell:(params)=>{
            return (
                <div>{params.row.description.slice(0,100)}...</div>
            )
        }
    },
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
        field: 'cash',
        headerName: 'Cash', 
        flex: 1,
        renderCell:(params)=>{
            return (
                <div>{FormatVND(params.row.cash)}</div>
            )
        }
    },
    {
        field: 'loyalty_program',
        headerName: 'Loyalty Program', 
        flex: 1,
        renderCell:(params)=>{
            return (
                <div>{params.row.loyalty_program.name}</div>
            )
        }
    },
    {
        field: 'stores',
        headerName: 'Stores', 
        flex: 1,
        renderCell:(params)=>{
            return (
                <div>
                    {params.row.stores.map((store,index)=>(
                        <div key={index}>{store.name}</div>
                    ))}
                </div>
            )
        }
    },
    {
        field: 'action', headerName: '#', sortable: false,
        filterable: false,
        renderCell: (params) => {
            //  @ts-ignore
            const path = Routers.PROMOTION_DETAIL.path.replace(":id", params.id);

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

const PromotionsPage: React.FC = Layout(() => {
    const [promotions, setPromotions] = useState<null | any[]>(null);
    const appDispatch=useDispatch();


    const _fetchPromotions = async (filterData:any) => {
        try {
            const { promotions, count } =
                await insiteApi.PromotionService.getPromotions(filterData);
            setPromotions(promotions);
        } catch (error) {
            console.log(error);
            appDispatch(UpdateError(error));
        }
    };

    const _onFilterChange=(newFilter:any)=>{
        _fetchPromotions(newFilter);
    }

    return (
        <Card>
            <FilterTable 
                onFilterChange={_onFilterChange}
                data={promotions?{data:promotions,count:promotions.length}:null}
                detailRoute={Routers.PROMOTION_DETAIL.path}
                columns={columns}
            />
        </Card>
    );
});

export default PromotionsPage;
