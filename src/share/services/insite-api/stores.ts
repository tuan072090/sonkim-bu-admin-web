import FetchDataService from "../fetch"

const StoreService={
    getStores:async(params?:any)=>{
        try {
            const {count,stores}=await FetchDataService.GET("/bu-api/stores",params);
            return {count,stores};
        } catch (err) {
            throw err
        }
    },

    getStoreDetail:async (storeId:number)=>{
        try {
            const data=await FetchDataService.GET("/bu-api/stores/"+storeId);
            return data;
        } catch (error) {
            throw error;
        }
    }
}

export default StoreService;