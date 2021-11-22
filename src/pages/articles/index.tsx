import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Link } from "react-router-dom";
import { DataTableBase, Layout } from "../../components";
import Loader from "../../components/atoms/loader";
import { Routers } from "../../share";
import { ThumbnailType } from "../../share/data-types/image";
import InsideApi from "../../share/services/insite-api";
interface DataRow {
    id: number;
    title: string;
    avatar: ThumbnailType;
}

const columns: TableColumn<DataRow>[] = [
    {
        name: "ID",
        cell: (row) => <a href={Routers.ARTICLES + `/${row.id}`}>{row.id}</a>,
        sortable: true,
        reorder: true,
        width: "100px",
    },
    {
        name: "Title",
        selector: (row) => row.title,
        sortable: true,
        reorder: true,
        wrap: true,
        center:true
    },
    {
        name: "Image",
        cell: (row) => (
            <img
                src={row.avatar.formats.thumbnail.url}
                width={row.avatar.formats.thumbnail.width}
                height={row.avatar.formats.thumbnail.height}
            />
        ),
        reorder: true,
        center:true,
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
                <div className="flex justify-center items-center">
                    <Loader status="info"></Loader>
                </div>
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
