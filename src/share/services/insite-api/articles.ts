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
    }
}

export default ArticleService;