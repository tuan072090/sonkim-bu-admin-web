import { DeleteOutline, Edit } from '@mui/icons-material'
import { Card, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { TableColumn } from 'react-data-table-component'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Box, DataTableBase, FilterTable, Layout } from '../../components'
import Loader from '../../components/atoms/loader'
import { Routers } from '../../share'
import { GiftCardOrderDataRow } from '../../share/data-types/giftcard-order'
import { UpdateError } from '../../share/reducers/modal-msg'
import insiteApi from '../../share/services/insite-api'

// const column:TableColumn<GiftCardOrderDataRow>[]=[
//     {
//         name:"ID",
//         cell:(row)=><a href={Routers.GIFTCARD_ORDERS.path+`/${row.id}`}>{row.id}</a>,
//         sortable:true,
//         reorder:true
//     },
//     {
//         name:'Code',
//         selector:(row)=>row.code,
//         sortable:true,
//         reorder:true
//     },
// ]

const columns=[
    {field:'id',headerName:'ID',type:'number',width:30},
    {field: 'code', headerName: 'Code', flex: 1},
    {
        field: 'action', headerName: '#', sortable: false,
        filterable: false,
        renderCell: (params) => {
            //  @ts-ignore
            const path = Routers.GIFTCARD_ORDER_DETAIL.path.replace(":id", params.id);

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

const GiftCardOrdersPage:React.FC=Layout(()=> {
    const [giftCardOrders,setGiftCardOrders]=useState<null|any[]>(null);
    const appDispatch=useDispatch();

    const _fetchGiftCardOrders=async (filterData:any)=>{
        try {
            const {count,giftcard_orders}=await insiteApi.GiftCardOrderService.getGiftCardOrders(filterData);
            setGiftCardOrders(giftcard_orders);
        } catch (error) {
            console.log(error);
            appDispatch(UpdateError(error));
        }
    }

    const _onFilterChange=(newFilter:any)=>{
        _fetchGiftCardOrders(newFilter);
    }
    return (
        <Card>
            <FilterTable
                onFilterChange={_onFilterChange}
                data={giftCardOrders?{data:giftCardOrders,count:giftCardOrders.length}:null}
                detailRoute={Routers.GIFTCARD_ORDER_DETAIL.path}
                columns={columns}
            />
        </Card>
    )
})

export default GiftCardOrdersPage
