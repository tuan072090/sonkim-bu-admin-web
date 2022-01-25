import { DeleteOutline, Edit } from '@mui/icons-material'
import { Card, Tooltip } from '@mui/material'
import { GridRenderCellParams } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Box, DataTableBase, FilterTable, Layout } from '../../components'
import { Routers } from '../../share'
import { UpdateError } from '../../share/reducers/modal-msg'
import insiteApi from '../../share/services/insite-api'
import { FormatVND } from '../../share/utils/formater'


const columns=[
    {field:'id',headerName:'ID',type:'number',width:30},
    {field: 'title', headerName: 'Title', flex: 1},
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
            console.log(params.row)
            return (
                <div>{FormatVND(params.row.cash)}</div>
            )
        }
    },
    {
        field: 'price',
        headerName: 'Price', 
        flex: 1,
        renderCell:(params)=>{
            return (
                <div>{FormatVND(params.row.price)}</div>
            )
        }
    },
    {
        field: 'sale_price',
        headerName: 'Sale price', 
        flex: 1,
        renderCell:(params)=>{
            return (
                <div>{FormatVND(params.row.sale_price)}</div>
            )
        }
    },
    {
        field: 'action', headerName: '#', sortable: false,
        filterable: false,
        renderCell: (params) => {
            //  @ts-ignore
            const path = Routers.GIFTCARD_DETAIL.path.replace(":id", params.id);

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

const GiftCardsPage:React.FC=Layout(()=> {
    const [giftCards,setGiftCards]=useState<null|any[]>(null);
    const appDispatch=useDispatch();

    const _fetchGiftCards=async (filterData:any)=>{
        try {
            const {count,gift_cards}=await insiteApi.GiftCardService.getGiftCards(filterData);
            setGiftCards(gift_cards);
        } catch (error) {
            console.log(error);
            appDispatch(UpdateError(error));
        }
    }

    const _onFilterChange=(newFilter:any)=>{
        _fetchGiftCards(newFilter);
    }
    return (
        <Card>
            <FilterTable
                onFilterChange={_onFilterChange}
                data={giftCards?{data:giftCards,count:giftCards.length}:null}
                detailRoute={Routers.GIFTCARD_DETAIL.path}
                columns={columns}
            />
        </Card>

    )
})

export default GiftCardsPage
