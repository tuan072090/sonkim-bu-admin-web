import FetchDataService from "../fetch";

const OrderServices = {
    GetOrders: async (params?: any) => {
        try {
            const result = await FetchDataService.GET(
                "/market/sale/orders",
                params
            );
            return result;
        } catch (err) {
            throw err;
        }
    },

    GetOrderDetail: async (orderId:number) => {
        try {
            const {data} = await FetchDataService.GET("/market/sale/orders/"+orderId);
            return data;
        } catch (err) {
            throw err;
        }
    },

    CompleteOrder: async (orderId:number) => {
        try {
            const {data} = await FetchDataService.GET("/market/sale/orders/"+orderId+"/complete");
            return data;
        } catch (err) {
            throw err;
        }
    },

    ToReceiveOrder: async (orderId:number) => {
        try {
            const {data} = await FetchDataService.GET("/market/sale/orders/"+orderId+"/to_receive");
            return data;
        } catch (err) {
            throw err;
        }
    },

    CancelOrder: async (orderId:number) => {
        try {
            const {data} = await FetchDataService.GET("/market/sale/orders/"+orderId+"/cancel");
            return data;
        } catch (err) {
            throw err;
        }
    }
};

export default OrderServices;
