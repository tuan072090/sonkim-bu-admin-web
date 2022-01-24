import { DeleteOutline, Edit } from "@mui/icons-material";
import { Card, Tooltip } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { TableColumn } from "react-data-table-component";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Box, DataTableBase, FilterTable, Layout } from "../../components";
import Loader from "../../components/atoms/loader";
import { Routers } from "../../share";
import { ThumbnailType } from "../../share/data-types/image";
import { UpdateError } from "../../share/reducers/modal-msg";
import InsideApi from "../../share/services/insite-api";
import { useAppDispatch } from "../../share/store";

const columns=[
    {field:'id',headerName:'ID',type:'number',width:30},
    {field: 'title', headerName: 'Title', flex: 1},
    {
        field: 'image',
        headerName: 'Image',
        sortable: false,
        filterable: false,
        width: 130,
        renderCell: (params: GridRenderCellParams) => {
            // if(!params.value) return <image src={"/error-image.jpg"} style={{height: 60, maxWidth: '100%'}}/>
            console.log(params.row.avatar.formats.thumbnail.url)
            return (<img
                src={params.row.avatar.formats.thumbnail.url}
                className="w-100"/>)
        }
    },
    {
        field: 'action', headerName: '#', sortable: false,
        filterable: false,
        renderCell: (params) => {
            //  @ts-ignore
            const path = Routers.ARTICLE_DETAIL.path.replace(":id", params.id);

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

const ArticlesPage: React.FC = Layout(() => {
    const [articles, setArticles] = useState<null | any[]>(null);
    const history = useHistory();
    const appDispatch=useAppDispatch();

    const _fetchArticles = async (filterData:any) => {
        try {
            const { articles, count } =
                await InsideApi.ArticleService.getArticles(filterData);
            setArticles(articles);
        } catch (error) {
            console.log(error);
            appDispatch(UpdateError(error));
        }
    };

    const _onFilterChange=(newFilter:any)=>{
        _fetchArticles(newFilter);
    }

    return (
        <Card>
            <FilterTable
                onFilterChange={_onFilterChange}
                data={articles?{data:articles,count:articles.length}:null}
                detailRoute={Routers.ARTICLE_DETAIL.path}
                columns={columns}
            />
        </Card>
    );
});

export default ArticlesPage;
