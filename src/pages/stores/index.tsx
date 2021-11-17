import React, { useEffect, useState } from 'react'
import { TableColumn } from 'react-data-table-component';
import { DataTableBase, Layout } from '../../components'
import Loader from '../../components/atoms/loader';
import { StoreDataRow } from '../../share/data-types/store';
import insiteApi from '../../share/services/insite-api';

const columns:TableColumn<StoreDataRow>[]=[
    {
        name:"ID",
        cell: (row)=> <a href="#">{row.id}</a>,
        sortable:true,
        reorder:true,
    },
    {
        name:"Name",
        selector: (row)=> row.name,
        sortable:true,
        reorder:true,
        wrap:true,
    },
    {
        name: "Image",
        cell:row=><img src={row.avatar.formats.thumbnail.url} width={row.avatar.formats.thumbnail.width} height={row.avatar.formats.thumbnail.height}/>,
        reorder:true,
        center:true
    },
    {
        name:"Location",
        selector:row=>row.location.address,
        reorder:true,
    },
    {
        name: "BU",
        cell:row=><img src={row.business_unit.logo.formats.thumbnail.url} width={row.business_unit.logo.formats.thumbnail.width} height={row.business_unit.logo.formats.thumbnail.height}/>,
        reorder:true,
        center:true
    },
    {
        name:"Contact",
        selector:row=>row.contact.contact_phone,
        reorder:true,
        center:true
    }
]

const StoresPage:React.FC=Layout(()=> {
    const [stores,setStores]=useState(null);
    const [loading,setLoading]=useState<boolean>(true);
    const _fetchStores=async()=>{
        try {
            const {stores,count}=await insiteApi.StoreService.getStores();
            setStores(stores);
            setLoading(false);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        _fetchStores();
    },[])
    return (
        <div>
            {loading?<Loader></Loader>:
                <DataTableBase 
                    title="Stores list"
                    columns={columns}
                    data={stores}
                />
            }
        </div>
    )
})

export default StoresPage
