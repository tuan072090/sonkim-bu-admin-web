import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Link } from "react-router-dom";
import { DataTableBase, Layout } from "../../components";
import Loader from "../../components/atoms/loader";
import InsideApi from "../../share/services/insite-api";
interface DataRow {
    id: number;
    title: string;
    avatar: { formats:{thumbnail:{url:string,width:number,height:number}} };
}

const columns: TableColumn<DataRow>[] = [
    {
        name: "ID",
        cell: (row) => <a href="#">{row.id}</a>,
        sortable: true,
        reorder:true,
        width: '100px',
    },
    {
        name: "Title",
        selector: (row) => row.title,
        sortable: true,
        reorder:true,
        wrap:true,


    },
    {
        name: "Image",
        cell:row=><img src={row.avatar.formats.thumbnail.url} width={row.avatar.formats.thumbnail.width} height={row.avatar.formats.thumbnail.height}/>,
        reorder:true,
    },
];


const ArticlesPage: React.FC = Layout(() => {
    const [articles, setArticles] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const _fetchArticles = async () => {
        try {
            const { articles, count } =
                await InsideApi.ArticleService.getArticles();
            setArticles(articles);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        _fetchArticles();
    }, []);


    return (
        <div>
            {loading ? (
                <Loader></Loader>
            ) : (
                <DataTableBase
                    title="Articles List"
                    columns={columns} 
                    data={articles}
                ></DataTableBase>
            )}
        </div>
    );
});

export default ArticlesPage;
