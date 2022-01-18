import React, { useEffect, useState } from 'react'
import { TableColumn } from 'react-data-table-component'
import { useHistory } from 'react-router-dom'
import { Box, DataTableBase, Layout } from '../../components'
import Loader from '../../components/atoms/loader'
import { Routers } from '../../share'
import { GiftCardOrderDataRow } from '../../share/data-types/giftcard-order'
import insiteApi from '../../share/services/insite-api'

const column:TableColumn<GiftCardOrderDataRow>[]=[
    {
        name:"ID",
        cell:(row)=><a href={Routers.GIFTCARD_ORDERS.path+`/${row.id}`}>{row.id}</a>,
        sortable:true,
        reorder:true
    },
    {
        name:'Code',
        selector:(row)=>row.code,
        sortable:true,
        reorder:true
    },
]

const GiftCardOrdersPage:React.FC=Layout(()=> {
    const [giftCardOrders,setGiftCardOrders]=useState<null|any[]>(null);
    const history=useHistory();

    const _fetchGiftCardOrders=async ()=>{
        try {
            const {count,giftcard_orders}=await insiteApi.GiftCardOrderService.getGiftCardOrders();
            setGiftCardOrders(giftcard_orders);
        } catch (error) {
            console.log(error);
        }
    }

    const _onRowClicked = (row: any, event: React.MouseEvent) => {
        console.log("row...", row);
        history.push(`${Routers.GIFTCARD_ORDERS.path}/${row.id}`);
    };

    useEffect(()=>{
        _fetchGiftCardOrders();
    })
    return (
        <div>
            {!giftCardOrders?<div className="flex justify-center items-center">
                    <Loader status="info" />
                </div>:<Box>
                    <DataTableBase
                        title="Giftcard Orders list"
                        columns={column}
                        data={giftCardOrders}
                        onRowClicked={_onRowClicked}
                    />
                </Box>}
        </div>
    )
})

export default GiftCardOrdersPage
