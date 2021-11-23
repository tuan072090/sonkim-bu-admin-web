import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Box, Layout, TextInput } from "../../components";
import Loader from "../../components/atoms/loader";
import insiteApi from "../../share/services/insite-api";

const ArticleDetailPage = Layout(() => {
    const params = useParams<{ id: string }>();
    const [articleDetail, setArticleDetail] = useState<any>(null);
    const _fetchArticleDetail = async () => {
        try {
            const data = await insiteApi.ArticleService.getArticleDetail(
                +params.id
            );
            console.log(data);
            setArticleDetail(data);
        } catch (error) {
            console.log("error" + error);
        }
    };
    useEffect(() => {
        _fetchArticleDetail();
    }, [params.id]);
    return (
        <div className="grid grid-cols-4 gap-3">
            {articleDetail ? (
                <>
                    <Box className="col-span-3">
                        <div className="flex flex-col justify-center">
                            <h4 className="font-bold text-xl mb-4">
                                Chi tiết Articles
                            </h4>
                            <div className="flex flex-col mb-4">
                                <label className="font-semibold text-base mb-1">
                                    Tiêu đề:
                                </label>
                                <TextInput
                                    size="small"
                                    value={articleDetail.Title}
                                    type="text"
                                    disabled
                                    className="w-full"
                                ></TextInput>
                            </div>
                            <div className="flex flex-col mb-4">
                                <label className="font-semibold text-base mb-1">
                                    Slug:
                                </label>
                                <TextInput
                                    size="small"
                                    value={articleDetail.slug}
                                    type="text"
                                    disabled
                                    className="w-100"
                                ></TextInput>
                            </div>
                            <div className="flex flex-col mb-4">
                                <label className="font-semibold text-base mb-1">
                                    Hình ảnh:
                                </label>
                                <img
                                    src={
                                        articleDetail.avatar.formats.thumbnail
                                            .url
                                    }
                                    height={
                                        articleDetail.avatar.formats.thumbnail
                                            .height
                                    }
                                    width={
                                        articleDetail.avatar.formats.thumbnail
                                            .width
                                    }
                                />
                            </div>
                            <div>
                                <label className="font-semibold text-base mb-1">
                                    Nội dung:
                                </label>
                                <textarea cols={50} rows={10} value={articleDetail.body} className="border-2 w-full rounded-lg border-solid "></textarea>
                            </div>
                        </div>
                    </Box>
                    <Box>Hello 2</Box>
                </>
            ) : null}
        </div>
    );
});

export default ArticleDetailPage;
