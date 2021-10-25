import moment from "moment";
import React from "react";
import { Box, Layout } from "../../components";
import Tables from "../../components/templates/table";
import { Routers } from "../../share";
import InsideApi from "../../share/services/insite-api";
import { FormatVND } from "../../share/utils/formater";

const BadgeStatus: React.FC<{ status: string }> = ({ status = "" }) => {
    const getStatusOrder = (status: string) => {
        switch (status) {
            case "pending":
                return "Chờ xác nhận";
            case "verified":
                return "Xác nhận";
            case "shipping":
                return "Đang giao";
            case "to_receive":
                return "Chờ lấy hàng";
            case "completed":
                return "Đã nhận";
            default:
                return;
        }
    };

    return (
        <span className="px-2 py-1 font-semibold whitespace-no-wrap leading-tight text-primary-700 bg-primary-100 rounded-sm">
            {" "}
            {getStatusOrder(status)}{" "}
        </span>
    );
};

const OrdersPage = Layout(() => {
    return (
        <Box className="mt-5">
            <Tables
                title={"Danh sách đơn hàng"}
                structure={[
                    {
                        label: "Id",
                        key: "id",
                        format: (value: any) => {
                            return (
                                <a
                                    href={Routers.ORDERS + `/${value}`}
                                    className="font-semibold text-blue-700"
                                >
                                    {value}
                                </a>
                            );
                        },
                    },
                    {
                        label: "Store address",
                        key: "store_address",
                        format: (value: any) => {
                            return (
                                <div>
                                    <div className="font-semibold text-black">{value.name}</div>
                                    <div className=" text-gray-500">{value.phone}</div>
                                    <div className="text-sm text-gray-900 whitespace-no-wrap">
                                        {value.address1}
                                    </div>
                                </div>
                            );
                        },
                    },
                    {
                        label: "Billing address",
                        key: "billing_address",
                        format: (value: any) => {
                            return (
                                <div>
                                    <div className="font-semibold text-black">{value.name}</div>
                                    <div className="text-gray-500">{value.phone}</div>
                                    <div className="text-sm text-gray-900 whitespace-no-wrap">
                                        {value.address1}
                                    </div>
                                </div>
                            );
                        },
                    },
                    {
                        label: "Shipping address",
                        key: "shipping_address",
                        format: (value: any) => {
                            return (
                                <div>
                                    <div className="font-semibold text-black">{value.name}</div>
                                    <div className="text-gray-500">{value.phone}</div>
                                    <div className="text-sm text-gray-900 whitespace-no-wrap">
                                        {value.address1}
                                    </div>
                                </div>
                            );
                        },
                    },
                    {
                        label: "Financial status",
                        key: "financial_status",
                        format: (value: any) => {
                            return <BadgeStatus status={value}></BadgeStatus>;
                        },
                        // filter: {
                        //     type: "options-select",
                        //     options: [
                        //         { label: "Chờ xác nhận", value: "pending" },
                        //         { label: "Xác nhận", value: "verified" },
                        //         { label: "Đang giao", value: "shipping" },
                        //         { label: "Chờ lấy hàng", value: "to_receive" },
                        //         { label: '"Đã nhận"', value: "completed" },
                        //     ],
                        // },
                    },
                    {
                        label: "Market status",
                        key: "market_status",
                        format: (value: any) => {
                            return <BadgeStatus status={value}></BadgeStatus>;
                        },
                        filter: {
                            type: "options-select",
                            options: [
                                { label: "Chờ xác nhận", value: "pending" },
                                { label: "Xác nhận", value: "verified" },
                                { label: "Đang giao", value: "shipping" },
                                { label: "Chờ lấy hàng", value: "to_receive" },
                                { label: '"Đã nhận"', value: "completed" },
                            ],
                        },
                    },
                    {
                        label: "Total discounts",
                        key: "total_discounts",
                        format: (value: any) => {
                            return (
                                <div className="text-secondary-700  text-base font-semibold px-6 py-2 rounded-lg">
                                    {FormatVND(value)} VND
                                </div>
                            );
                        },
                    },
                    {
                        label: "Total items price",
                        key: "total_items_price",
                        format: (value: any) => {
                            return (
                                <div className="text-primary-700 text-base font-semibold px-6 py-2 rounded-lg">
                                    {FormatVND(value)} VND
                                </div>
                            );
                        },
                    },
                    {
                        label: "Total price",
                        key: "total_price",
                        format: (value: any) => {
                            return (
                                <div className="text-primary-700 text-base font-semibold px-6 py-2 rounded-lg">
                                    {FormatVND(value)} VND
                                </div>
                            );
                        },
                    },
                    {
                        label: "Created at",
                        key: "created_at",
                        format: (value: any) => {
                            return (
                                <div>
                                    {moment(value).format("DD-MM-YYYY")}
                                </div>
                            );
                        },
                    },
                ]}
                onChange={(
                    { params = {}, itemsPerPage = 10, pageNumber = 1 },
                    callBack: (res: any) => void
                ) => {
                    InsideApi.OrderServices.GetOrders({
                        ...params,
                        limit: itemsPerPage,
                        offset: (pageNumber - 1) * itemsPerPage,
                    })
                        .then(({ data, count }) => {

                            callBack({
                                data: data,
                                count: count,
                            });
                        })
                        .catch((err) => {
                            callBack({ errorMessage: err });
                        });
                }}
            />
        </Box>
    );
});

export default OrdersPage;
