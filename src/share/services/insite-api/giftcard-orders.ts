import FetchDataService from "../fetch";

const GiftCardOrderService={
    getGiftCardOrders:async (params?:any)=>{
        try {
            const {count,giftcard_orders}=await FetchDataService.GET("bu-api/giftcard-orders",params);
            return {count,giftcard_orders};
        } catch (error) {
            throw error;
        }
    },
    
    getGiftCardOrderDetail:async (giftCardOrderId:number)=>{
        try {
            const data=await FetchDataService.GET("bu-api/giftcard-orders/"+giftCardOrderId);
            return data;
        } catch (error) {
            throw error;
        }
    }
    
}

export default GiftCardOrderService;