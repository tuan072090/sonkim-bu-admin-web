import React, { useEffect, useState } from 'react'
import { TableColumn } from 'react-data-table-component'
import { useHistory } from 'react-router-dom'
import { Box, DataTableBase, Layout } from '../../components'
import Loader from '../../components/atoms/loader'
import { Routers } from '../../share'
import { GiftCardDataRow } from '../../share/data-types/giftcard'
import insiteApi from '../../share/services/insite-api'
import { FormatVND } from '../../share/utils/formater'

const columns:TableColumn<GiftCardDataRow>[]=[
    {
        name:"ID",
        cell:(row)=><a href={Routers.GIFTCARDS.path+`/${row.id}`}>{row.id}</a>,
        sortable:true,
        reorder:true
    },
    {
        name:'Title',
        selector:(row)=>row.title,
        sortable:true,
        reorder:true
    },
    {
        name: "Image",
        cell: (row) => (
            <img
                src={row.avatar.formats.thumbnail.url}
                width={"auto"}
                height={"auto"}
            />
        ),
        reorder: true,
        center: true,
    },
    {
        name: "Cash",
        selector: (row) => FormatVND(row.cash),
        sortable: true,
        reorder: true,
        center: true,
    },
    {
        name: "Price",
        selector: (row) => FormatVND(row.price),
        sortable: true,
        reorder: true,
        center: true,
    },
    {
        name: "Price Sale",
        selector: (row) => FormatVND(row.sale_price),
        sortable: true,
        reorder: true,
        center: true,
    },

]

const GiftCardsPage:React.FC=Layout(()=> {
    const [giftCards,setGiftCards]=useState<null|any[]>(null);
    const history=useHistory();

    const _fetchGiftCards=async ()=>{
        try {
            const {count,gift_cards}=await insiteApi.GiftCardService.getGiftCards();
            setGiftCards(gift_cards);
        } catch (error) {
            console.log(error);
        }
    }

    const _onRowClicked = (row: any, event: React.MouseEvent) => {
        console.log("row...", row);
        history.push(`${Routers.PROMOTIONS.path}/${row.id}`);
    };

    useEffect(()=>{
        _fetchGiftCards()
    },[])
    return (
        <div>
            {!giftCards?<div className="flex justify-center items-center">
                    <Loader status="info" />
                </div>:<Box>
                    <DataTableBase
                        title="Users list"
                        columns={columns}
                        data={giftCards}
                        onRowClicked={_onRowClicked}
                    />
                </Box>}
        </div>

    )
})

export default GiftCardsPage
