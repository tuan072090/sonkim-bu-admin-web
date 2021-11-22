import React from 'react'
import { useParams } from 'react-router'
import { Layout } from '../../components';

const LoyaltyProgramDetailPage=Layout(()=> {
    const params=useParams<{id:string}>();
    return (
        <div>
            LoyaltyProgramDetailPage
            {JSON.stringify(params)}
        </div>
    )
})

export default LoyaltyProgramDetailPage
