import FetchDataService from "../fetch"

const ArticleService={
    getArticles:async(params?:any)=>{
        try {
            const {count,articles}=await FetchDataService.GET("/bu-api/articles",params);
            return {count,articles};
        } catch (err) {
            throw err
        }
    },

    getArticleDetail:async (articleId:number)=>{
        try {
            const data=await FetchDataService.GET("/bu-api/articles/"+articleId);
            return data;
        } catch (error) {
            throw error;
        }
    },

    updateArticleDetail: async (articleId:number,payload:any)=>{
        try {
            // const {title,slug,body,business_unit,avatar,locale}=payload;
            const data=await FetchDataService.PUT(`/bu-api/articles/${articleId}`,payload);
            return data;
        } catch (error) {
            throw error;
        }
    }
}

export default ArticleService;