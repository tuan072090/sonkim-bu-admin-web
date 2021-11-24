import React, { useEffect, useState } from "react";
import { ChevronLeft } from "react-feather";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { Box, Button, Layout, SwitchButton, TextInput } from "../../components";
import insiteApi from "../../share/services/insite-api";
import { DateFormat } from "../../share/utils/formater";

const LoyaltyProgramDetailPage = Layout(() => {
    const params = useParams<{ id: string }>();
    const [loyaltyProgramDetail, setLoyaltyProgramDetail] = useState<any>(null);
    const history = useHistory();
    const _fetchLoyaltyProgramDetail = async () => {
        try {
            const data = await insiteApi.LoyaltyService.getLoyaltyProgramDetail(
                +params.id
            );
            console.log(data);
            setLoyaltyProgramDetail(data);
        } catch (error) {
            console.log("error" + error);
        }
    };
    useEffect(() => {
        _fetchLoyaltyProgramDetail();
    }, [params.id]);
    const _onBackButtonClick = () => {
        history.goBack();
    };
    return (
        <div className="grid grid-cols-4 grid-rows-2 gap-3">
            {loyaltyProgramDetail ? (
                <>
                    <Box className="col-span-3 row-span-2">
                        <div className="flex flex-col justify-center">
                            <div className="flex flex-row items-center justify-between">
                                <h4 className="font-bold text-xl mb-4">
                                    Chi tiết Loyalty Program
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
                            <div className="flex flex-row items-center mb-4">
                                <label className="font-semibold text-base mr-4">
                                    Active:
                                </label>
                                <SwitchButton
                                    value={loyaltyProgramDetail.active}
                                ></SwitchButton>
                            </div>
                            <div className="flex flex-col mb-4">
                                <label className="font-semibold text-base mb-1">
                                    Tên:
                                </label>
                                <TextInput
                                    size="small"
                                    value={loyaltyProgramDetail.name}
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
                                        loyaltyProgramDetail.avatar.formats
                                            .thumbnail.url
                                    }
                                    height={
                                        loyaltyProgramDetail.avatar.formats
                                            .thumbnail.height
                                    }
                                    width={
                                        loyaltyProgramDetail.avatar.formats
                                            .thumbnail.width
                                    }
                                />
                            </div>
                            <div>
                                <label className="font-semibold text-base mb-1">
                                    Nội dung:
                                </label>
                                <textarea
                                    cols={50}
                                    rows={10}
                                    value={loyaltyProgramDetail.body}
                                    className="border-2 w-full rounded-lg border-solid p-2"
                                ></textarea>
                            </div>
                            <div className="flex flex-col mb-4">
                                <label className="font-semibold text-base mb-1">
                                    Created at:
                                </label>
                                <TextInput
                                    size="small"
                                    value={DateFormat(
                                        loyaltyProgramDetail.created_at
                                    )}
                                    type="text"
                                    disabled
                                    className="w-100"
                                ></TextInput>
                            </div>
                        </div>
                    </Box>
                    {/* BU zone */}
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
                                    value={
                                        loyaltyProgramDetail.business_unit.name
                                    }
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
                                    value={
                                        loyaltyProgramDetail.business_unit.slug
                                    }
                                    type="text"
                                    disabled
                                    className="w-100"
                                ></TextInput>
                            </div>
                            <div className="flex flex-col mb-4">
                                <label className="font-semibold text-base mb-1">
                                    Cover:
                                </label>
                                <img
                                    src={
                                        loyaltyProgramDetail.business_unit.cover
                                            .formats.thumbnail.url
                                    }
                                    height={
                                        loyaltyProgramDetail.business_unit.cover
                                            .formats.thumbnail.height
                                    }
                                    width={
                                        loyaltyProgramDetail.business_unit.cover
                                            .formats.thumbnail.width
                                    }
                                />
                            </div>
                        </div>
                    </Box>
                    {/* Point System Zone */}
                    <Box>
                        <div className="flex flex-col justify-center">
                            <h5 className="font-semibold text-lg mb-4">
                                Hệ thống điểm
                            </h5>
                            <div className="flex flex-col mb-4">
                                <label className="font-semibold text-base mb-1">
                                    Tên:
                                </label>
                                <TextInput
                                    size="small"
                                    value={
                                        loyaltyProgramDetail.point_system.name
                                    }
                                    type="text"
                                    disabled
                                    className="w-full"
                                ></TextInput>
                            </div>

                            <div className="flex flex-col mb-4">
                                <label className="font-semibold text-base mb-1">
                                    Icon:
                                </label>
                                <img
                                    src={
                                        loyaltyProgramDetail.point_system.icon
                                            .formats.thumbnail.url
                                    }
                                    height={
                                        loyaltyProgramDetail.point_system.icon
                                            .formats.thumbnail.height
                                    }
                                    width={
                                        loyaltyProgramDetail.point_system.icon
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

export default LoyaltyProgramDetailPage;
