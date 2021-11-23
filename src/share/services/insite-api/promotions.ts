import FetchDataService from "../fetch"

const PromotionService={
    getPromotions:async(params?:any)=>{
        try {
            const {count,promotions}=await FetchDataService.GET("/bu-api/promotions",params);
            return {count,promotions};
        } catch (err) {
            throw err
        }
    },

    getPromotionDetail:async (promotionId:number)=>{
        try {
            const data=await FetchDataService.GET("/bu-api/promotions/"+promotionId);
            return data;
        } catch (error) {
            throw error;
        }
    }
}

export default PromotionService;