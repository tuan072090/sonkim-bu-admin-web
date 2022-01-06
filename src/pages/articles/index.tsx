import React, { useEffect, useState } from "react";
import { TableColumn } from "react-data-table-component";
import { useHistory } from "react-router";
import { Box, DataTableBase, Layout } from "../../components";
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
        center: true,
    },
    {
        name: "Image",
        cell: (row) => (
            <img src={row.avatar.formats.thumbnail.url} className="max-w-20 h-10"/>
        ),
        reorder: true,
        center: true,
    },
];

const ArticlesPage: React.FC = Layout(() => {
    const [articles, setArticles] = useState<null | any[]>(null);
    const history = useHistory();

    const _fetchArticles = async () => {
        try {
            const { articles, count } =
                await InsideApi.ArticleService.getArticles();
            setArticles(articles);
        } catch (error) {
            console.log(error);
        }
    };

    const _onRowClicked = (row: any, event: React.MouseEvent) => {
        console.log("row...", row);
        history.push(`${Routers.ARTICLES}/${row.id}`);
    };

    useEffect(() => {
        _fetchArticles();
    }, []);

    return (
        <div>
            {!articles ? (
                <div className="flex justify-center items-center">
                    <Loader status="info" />
                </div>
            ) : (
                <Box>
                    <DataTableBase
                        title="Articles List"
                        columns={columns}
                        data={articles}
                        onRowClicked={_onRowClicked}
                    />
                </Box>
            )}
        </div>
    );
});

export default ArticlesPage;
