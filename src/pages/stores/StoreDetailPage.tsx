import React from 'react'
import { useParams } from 'react-router'
import { Layout } from '../../components';

const StoreDetailPage=Layout(()=> {
    const params=useParams<{id:string}>();
    return (
        <div>
            StoreDetailPage
            {JSON.stringify(params)}
        </div>
    )
})

export default StoreDetailPage
