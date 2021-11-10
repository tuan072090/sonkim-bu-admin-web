/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Layout, Modal, Wizard } from "../../components";
import { InsideApiService, OrderType } from "../../share";
import Loader from "../../components/atoms/loader";
import TextInput from "../../components/atoms/text-input";

import TableBody from "../../components/templates/table/TableBody";
import { FormatVND } from "../../share/utils/formater";
import moment from "moment";
import { useDispatch } from "react-redux";
import { UPDATE_ERROR } from "../../share/reducers/modal-msg/modalMsg.reducer";

const CartAddress = ({ title = "", name = "", phone = "", address = "" }) => {
    return (
        <Box>
            <dt className=" font-semibold text-gray-900">{title}</dt>
            <dd className="mt-3 ">
                <span className="block font-medium text-md font-poppins">{name}</span>
                <span className="block text-gray-500">{phone}</span>
                <span className="block text-gray-500">{address}</span>
            </dd>
        </Box>
    );
};



const OrderDetail = Layout(() => {
    const dispatch=useDispatch();
    const [order, setOrder] = useState<OrderType | null>(null);
    const [toRecieve, setToRecieve] = useState<boolean>(false)

    const params = useParams<{ id: string }>();

    useEffect(() => {
        if (params.id) {
            InsideApiService.OrderServices.GetOrderDetail(parseInt(params.id))
                .then((data) => {
                    setOrder(data);
                })
                .catch((err) => {
                    dispatch({ type: UPDATE_ERROR, payload: err });
                });
        }
    }, [params]);

    if (!order) {
        return (
            <Box className="flex justify-center py-5">
                <Loader status="primary" />
            </Box>
        );
    }
    return (
        <div className="grid grid-cols-1  gap-4">
            <Box>
                <div className="flex justify-between align-center">
                    <h2 className="text-2xl font-semibold leading-tight">#{order.id}</h2>
                    <h2 className="font-semibold leading-tight">
                        {moment(order.created_at).format("DD-MM-YYYY")}
                    </h2>
                    <Button onClick={() => setToRecieve(true)} children={"To recieve"} />
                    {/* {order.market_status === 'shipping' && } */}
                </div>

                <Modal show={toRecieve} onSave={() => {
                    console.log(' To recieve');

                }} title='comfirm' children='chuyển trạng thái qua To recieve' onChange={setToRecieve} />

                {/*status*/}

                <div className="py-3">
                    {/*Pending -> Verified -> Shipping -> To recieve -> Completed || Cancelled */}
                    <Wizard status={order.market_status} />
                </div>
            </Box>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 ">
                <CartAddress
                    title="Store address"
                    name={order.store_address.name}
                    phone={order.store_address.phone}
                    address={order.store_address.address1}
                />
                <CartAddress
                    title="Billing address"
                    name={order.billing_address.name}
                    phone={order.billing_address.phone}
                    address={order.billing_address.address1}
                />
                <CartAddress
                    title="Shipping address"
                    name={order.shipping_address.name}
                    phone={order.shipping_address.phone}
                    address={order.shipping_address.address1}
                />
            </div>

            <Box className="p-3">
                <TableBody
                    isLoading={false}
                    data={order.products}
                    structure={[
                        {
                            label: "Id",
                            key: "id",
                        },

                        {
                            label: "Name",
                            key: "name",
                            format: (value: any) => {
                                return <div className="   text-lg ">{value}</div>;
                            },
                        },

                        {
                            label: "Quaity",
                            key: "order_details",
                            format: (value: any) => {
                                return (
                                    <div className="text-secondary-700 text-base  font-semibold ">
                                        {value[0].quantity}
                                    </div>
                                );
                            },
                        },
                        {
                            label: "Price",
                            key: "variants",
                            format: (value: any) => {
                                return (
                                    <div className="text-primary-700 text-base font-semibold ">
                                        {FormatVND(value[0].price)} VND
                                    </div>
                                );
                            },
                        },
                        {
                            label: "Total",
                            key: "order_details",
                            format: (value: any) => {
                                return (
                                    <div className="text-primary-700 text-base font-semibold ">
                                        {FormatVND(value[0].price * value[0].quantity)} VND
                                    </div>
                                );
                            },
                        },
                    ]}
                ></TableBody>
                <div className="flex  justify-between items-start px-2 pt-2">
                    <div className="p-2   flex-grow text-right">
                        <p className="text-gray-500  pb-4 font-nunito ">
                            Total items price
                        </p>
                        <p className="text-gray-500  pb-4 font-nunito ">Total discounts</p>
                        <p className="text-gray-500  pb-4 font-nunito ">Delivery fee</p>
                        <p className="font-medium text-xl  pb-4 font-poppins ">
                            Total price
                        </p>
                    </div>
                    <div className="p-2  w-1/4 text-right">
                        <p className="text-gray-500  pb-4 font-nunito">
                            {order.total_items_price}
                        </p>
                        <p className="text-gray-500  pb-4 font-nunito">
                            {order.total_discounts}
                        </p>
                        <p className="text-gray-500  pb-4 font-nunito">
                            {order.delivery_fee}
                        </p>
                        <p className="text-primary-700  text-xl  font-semibold">
                            {order.total_price}
                        </p>
                    </div>
                </div>
            </Box>
        </div>
    );
});

export default OrderDetail;
