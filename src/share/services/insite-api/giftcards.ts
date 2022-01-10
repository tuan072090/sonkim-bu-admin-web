import FetchDataService from "../fetch";

const GiftCardService={
    getGiftCards:async(params?:any)=>{
        try {
            const {count,gift_cards}=await FetchDataService.GET("/bu-api/giftcards",params);
            return {count,gift_cards};
        } catch (error) {
            throw error;
        }
    },

    getGiftCardDetail:async (giftCardId:number)=>{
        try {
            const data=await FetchDataService.GET("bu-api/giftcards/"+giftCardId);
            return data;
        } catch (error) {
            throw error
        }
    }
}

export default GiftCardService;