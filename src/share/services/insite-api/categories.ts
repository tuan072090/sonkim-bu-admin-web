import FetchDataService from "../fetch";

const CategoryServices = {
    GetCategories: async (params?: any) => {
        try {
            const result = await FetchDataService.GET(
                "/market/catalogue/categories",
                params
            );
            return result;
        } catch (err) {
            throw err;
        }
    },
};

export default CategoryServices;
