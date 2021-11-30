import React, { useEffect, useState } from "react";
import { ChevronLeft } from "react-feather";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { Box, Button, Layout, TextInput } from "../../components";
import insiteApi from "../../share/services/insite-api";
import { FormatVND } from "../../share/utils/formater";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const PromotionDetailPage = Layout(() => {
    const params = useParams<{ id: string }>();
    const [promotionDetail, setPromotionDetail] = useState<any>(null);
    const history = useHistory();
    const _fetchPromotionDetail = async () => {
        try {
            const data = await insiteApi.PromotionService.getPromotionDetail(
                +params.id
            );
            console.log(data);
            setPromotionDetail(data);
        } catch (error) {
            console.log("error" + error);
        }
    };
    useEffect(() => {
        _fetchPromotionDetail();
    }, [params.id]);
    const _onBackButtonClick = () => {
        history.goBack();
    };
    return (
        <div className="grid grid-cols-4 grid-rows-2 gap-3">
            {promotionDetail ? (
                <>
                    <Box className="col-span-3 row-span-2">
                        <div className="flex flex-col justify-center">
                            <div className="flex flex-row items-center justify-between">
                                <h4 className="font-bold text-xl mb-4">
                                    Chi tiết Promotion
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
                            <div className="flex flex-col mb-4">
                                <label className="font-semibold text-base mb-1">
                                    Tiêu đề:
                                </label>
                                <TextInput
                                    size="small"
                                    value={promotionDetail.title}
                                    type="text"
                                    disabled
                                    className="w-full"
                                ></TextInput>
                            </div>
                            <div className="flex flex-col mb-4">
                                <label className="font-semibold text-base mb-1">
                                    Hình ảnh:
                                </label>
                                <img
                                    src={
                                        promotionDetail.avatar.formats.thumbnail
                                            .url
                                    }
                                    height={
                                        promotionDetail.avatar.formats.thumbnail
                                            .height
                                    }
                                    width={
                                        promotionDetail.avatar.formats.thumbnail
                                            .width
                                    }
                                />
                            </div>
                            <div className="flex flex-col mb-4">
                                <label className="font-semibold text-base mb-1">
                                    Mô tả:
                                </label>
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={promotionDetail.description}
                                    onReady={(editor) => {
                                        // You can store the "editor" and use when it is needed.
                                        console.log(
                                            "Editor is ready to use!",
                                            editor
                                        );
                                    }}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        console.log({ event, editor, data });
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
                                    Cash:
                                </label>
                                <TextInput
                                    size="small"
                                    value={`${FormatVND(
                                        promotionDetail.cash
                                    )} VNĐ`}
                                    type="text"
                                    disabled
                                    className="w-full"
                                ></TextInput>
                            </div>

                            <div className="flex flex-col mb-4">
                                <label className="font-semibold text-base mb-1">
                                    Price:
                                </label>
                                <TextInput
                                    size="small"
                                    value={
                                        promotionDetail.price
                                            ? FormatVND(promotionDetail.price)
                                            : "-"
                                    }
                                    type="text"
                                    disabled
                                    className="w-full"
                                ></TextInput>
                            </div>
                        </div>
                    </Box>
                    {/* Loyalty_Program zone */}
                    <Box>
                        <div className="flex flex-col justify-center">
                            <h5 className="font-semibold text-lg mb-4">
                                Thông tin Loyalty
                            </h5>
                            <div className="flex flex-col mb-4">
                                <label className="font-semibold text-base mb-1">
                                    Tên:
                                </label>
                                <TextInput
                                    size="small"
                                    value={promotionDetail.loyalty_program.name}
                                    type="text"
                                    disabled
                                    className="w-full"
                                ></TextInput>
                            </div>
                            <div className="flex flex-col mb-4">
                                <label className="font-semibold text-base mb-1">
                                    Avatar:
                                </label>
                                <img
                                    src={
                                        promotionDetail.loyalty_program.avatar
                                            .formats.thumbnail.url
                                    }
                                    height={
                                        promotionDetail.loyalty_program.avatar
                                            .formats.thumbnail.height
                                    }
                                    width={
                                        promotionDetail.loyalty_program.avatar
                                            .formats.thumbnail.width
                                    }
                                />
                            </div>
                        </div>
                    </Box>
                </>
            ) : null}
        </div>
    );
});

export default PromotionDetailPage;
