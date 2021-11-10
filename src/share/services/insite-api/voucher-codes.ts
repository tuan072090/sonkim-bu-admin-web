import FetchDataService from "../fetch"

const VoucherCodeService={
    getVoucherCodes:async(params?:any)=>{
        try {
            const {count,voucherCodes}=await FetchDataService.GET("/bu-api/voucher-codes",params);
            return {count,voucherCodes};
        } catch (err) {
            throw err
        }
    },

    getVoucherCodeDetail:async (voucherCodeId:number)=>{
        try {
            const {data}=await FetchDataService.GET("/bu-api/voucher-codes/"+voucherCodeId);
            return data;
        } catch (error) {
            throw error;
        }
    }
}

export default VoucherCodeService;