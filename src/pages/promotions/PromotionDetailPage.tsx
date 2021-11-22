import React from 'react'
import { useParams } from 'react-router'
import { Layout } from '../../components';

const PromotionDetailPage=Layout(()=> {
    const params=useParams<{id:string}>();
    return (
        <div>
            PromotionDetailPage
            {JSON.stringify(params)}
        </div>
    )
})

export default PromotionDetailPage
