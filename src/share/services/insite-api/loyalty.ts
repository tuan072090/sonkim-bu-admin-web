import FetchDataService from "../fetch"

const LoyaltyService={
    getLoyaltyPrograms:async(params?:any)=>{
        try {
            const {count,loyaltyPrograms}=await FetchDataService.GET("/bu-api/loyalty-programs",params);
            return {count,loyaltyPrograms};
        } catch (err) {
            throw err
        }
    },

    getArticleDetail:async (loyaltyProgramId:number)=>{
        try {
            const data=await FetchDataService.GET("/bu-api/loyalty-programs/"+loyaltyProgramId);
            return data;
        } catch (error) {
            throw error;
        }
    }
}

export default LoyaltyService;