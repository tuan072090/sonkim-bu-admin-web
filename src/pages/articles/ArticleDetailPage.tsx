import React from 'react'
import { useParams } from 'react-router'
import { Layout } from '../../components';

const ArticleDetailPage=Layout(()=> {
    const params=useParams<{id:string}>();
    return (
        <div>
            ArticleDetail Page
            {JSON.stringify(params)}
        </div>
    )
})

export default ArticleDetailPage
