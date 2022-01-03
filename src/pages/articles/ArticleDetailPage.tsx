import React, { useEffect, useState } from "react";
import { ChevronLeft } from "react-feather";
import { useHistory, useParams } from "react-router";
import { Box, Button, Layout, TextInputForm } from "../../components";
import insiteApi from "../../share/services/insite-api";
import { DateFormat } from "../../share/utils/formater";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useForm } from "react-hook-form";

interface IFormInput {
    title?: string;
    slug?: string;
    body?: string;
    business_unit?: number;
    avatar?: number;
    locale?: string;
}

const ArticleDetailPage = Layout(() => {
    const params = useParams<{ id: string }>();
    const [articleDetail, setArticleDetail] = useState<any>(null);
    const history = useHistory();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInput>();

    const _onSubmit = (data: IFormInput) => {
        alert(JSON.stringify(data));
    };

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
    const _onBackButtonClick = () => {
        history.goBack();
    };
    return (
        <div className="grid grid-cols-4 gap-3">
            {articleDetail ? (
                <>
                    <Box className="col-span-3">
                        <div className="flex flex-col justify-center">
                            <div className="flex flex-row items-center justify-between">
                                <h4 className="font-bold text-xl mb-4">
                                    Chi tiết Articles
                                </h4>
                                <Button
                                    size="small"
                                    className="w-24 flex flex-row items-center justify-evenly"
                                    onClick={_onBackButtonClick}
                                >
                                    <ChevronLeft></ChevronLeft>
                                    <p>Trở về</p>
                                </Button>
                            </div>
                            <form onSubmit={handleSubmit(_onSubmit)}>
                                <div className="flex flex-col mb-4">
                                    <label className="font-semibold text-base mb-1">
                                        Tiêu đề:
                                    </label>
                                    <input
                                        {...register("title")}
                                        placeholder={articleDetail.title}
                                        type="text"
                                        className="w-full py-2 px-3 border rounded-md focus:outline-none focus:ring-2"
                                    />
                                    {/* {errors?.title?.type === "required" && (
                        <p className="italic text-xs text-red-500">
                            *Không được để trống
                        </p>
                    )} */}
                                </div>
                                <div className="flex flex-col mb-4">
                                    <label className="font-semibold text-base mb-1">
                                        Slug:
                                    </label>
                                    <input
                                        placeholder={articleDetail.slug}
                                        type="text"
                                        {...register("slug")}
                                        className="w-100 py-2 px-3 border rounded-md focus:outline-none focus:ring-2"
                                    />
                                </div>
                                <div className="flex flex-col mb-4">
                                    <label className="font-semibold text-base mb-1">
                                        Hình ảnh:
                                    </label>
                                    <img
                                        src={
                                            articleDetail.avatar.formats
                                                .thumbnail.url
                                        }
                                        height={
                                            articleDetail.avatar.formats
                                                .thumbnail.height
                                        }
                                        width={
                                            articleDetail.avatar.formats
                                                .thumbnail.width
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="font-semibold text-base mb-2">
                                        Nội dung:
                                    </label>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={articleDetail.body}
                                        onReady={(editor) => {
                                            // You can store the "editor" and use when it is needed.
                                            console.log(
                                                "Editor is ready to use!",
                                                editor
                                            );
                                        }}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            console.log({
                                                event,
                                                editor,
                                                data,
                                            });
                                        }}
                                        onBlur={(event, editor) => {
                                            console.log("Blur.", editor);
                                        }}
                                        onFocus={(event, editor) => {
                                            console.log("Focus.", editor);
                                        }}
                                    />
                                </div>
                                <div className="flex flex-col mb-4">
                                    <label className="font-semibold text-base mb-1">
                                        Created at:
                                    </label>
                                    <TextInputForm
                                        size="small"
                                        value={DateFormat(
                                            articleDetail.created_at
                                        )}
                                        type="text"
                                        disabled
                                        className="w-100"
                                    ></TextInputForm>
                                </div>
                                <div className="my-10">
                                    <input
                                        type="submit"
                                        value="Cập nhật"
                                        className="w-100 mx-auto bg-green-500 rounded-lg border border-green-500 ripple text-white hover:bg-green-700 py-2 px-4 text-base"
                                    />
                                </div>
                            </form>
                        </div>
                    </Box>
                    <Box>
                        <h4 className="font-bold text-xl mb-4">Thông tin BU</h4>
                    </Box>
                </>
            ) : null}
        </div>
    );
});

export default ArticleDetailPage;
