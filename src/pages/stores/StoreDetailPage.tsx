import React, { useEffect, useState } from "react";
import { ChevronLeft } from "react-feather";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { Box, Button, Layout, TextInput } from "../../components";
import insiteApi from "../../share/services/insite-api";
import { DateFormat } from "../../share/utils/formater";

const StoreDetailPage = Layout(() => {
    const params = useParams<{ id: string }>();
    const [storeDetail, setStoreDetail] = useState<any>(null);
    const history = useHistory();
    const _fetchStoreDetail = async () => {
        try {
            const data = await insiteApi.StoreService.getStoreDetail(
                +params.id
            );
            console.log(data);
            setStoreDetail(data);
        } catch (error) {
            console.log("error" + error);
        }
    };
    useEffect(() => {
        _fetchStoreDetail();
    }, [params.id]);
    const _onBackButtonClick = () => {
        history.goBack();
    };
    return (
        <div className="grid grid-cols-4 grid-rows-2 gap-3">
            {storeDetail ? (
                <>
                    <Box className="col-span-3 row-span-2">
                        <div className="flex flex-col justify-center">
                            <div className="flex flex-row items-center justify-between">
                                <h4 className="font-bold text-xl mb-4">
                                    Chi tiết Store
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
                                    Tên:
                                </label>
                                <TextInput
                                    size="small"
                                    value={storeDetail.name}
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
                                    value={storeDetail.slug}
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
                                        storeDetail.avatar.formats.thumbnail.url
                                    }
                                    height={
                                        storeDetail.avatar.formats.thumbnail
                                            .height
                                    }
                                    width={
                                        storeDetail.avatar.formats.thumbnail
                                            .width
                                    }
                                />
                            </div>
                            <div className="flex flex-col mb-4">
                                <label className="font-semibold text-base mb-1">
                                    Địa điểm:
                                </label>
                                <TextInput
                                    size="small"
                                    value={storeDetail.location.address}
                                    type="text"
                                    disabled
                                    className="w-full"
                                ></TextInput>
                            </div>
                            <div className="flex flex-col mb-4">
                                <label className="font-semibold text-base mb-1">
                                    Liên hệ:
                                </label>
                                <TextInput
                                    size="small"
                                    value={storeDetail.contact.contact_phone}
                                    type="text"
                                    disabled
                                    className="w-full"
                                ></TextInput>
                            </div>
                            <div className="flex flex-col mb-4">
                                <label className="font-semibold text-base mb-1">
                                    Created at:
                                </label>
                                <TextInput
                                    size="small"
                                    value={DateFormat(storeDetail.created_at)}
                                    type="text"
                                    disabled
                                    className="w-100"
                                ></TextInput>
                            </div>
                        </div>
                    </Box>
                    <Box>
                        <div className="flex flex-col justify-center">
                            <h5 className="font-semibold text-lg mb-4">
                                Thông tin BU
                            </h5>
                            <div className="flex flex-col mb-4">
                                <label className="font-semibold text-base mb-1">
                                    Tên:
                                </label>
                                <TextInput
                                    size="small"
                                    value={storeDetail.business_unit.name}
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
                                    value={storeDetail.business_unit.slug}
                                    type="text"
                                    disabled
                                    className="w-100"
                                ></TextInput>
                            </div>
                            <div className="flex flex-col mb-4">
                                <label className="font-semibold text-base mb-1">
                                    Logo:
                                </label>
                                <img
                                    src={
                                        storeDetail.business_unit.logo.formats
                                            .thumbnail.url
                                    }
                                    height={
                                        storeDetail.business_unit.logo.formats
                                            .thumbnail.height
                                    }
                                    width={
                                        storeDetail.business_unit.logo.formats
                                            .thumbnail.width
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

export default StoreDetailPage;
