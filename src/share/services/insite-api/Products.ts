import FetchDataService from "../fetch";

const ProductServices = {
    GetProduct: async (params?: any) => {
        try {
            const result = await FetchDataService.GET(
                "/market/catalogue/products",
                params
            );
            return result;
        } catch (err) {
            throw err;
        }
    },
};

export default ProductServices;
