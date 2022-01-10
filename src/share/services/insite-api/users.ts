import FetchDataService from "../fetch";

const UserService={
    getUsers:async(params?:any)=>{
        try {
            const {count,users}=await FetchDataService.GET("/bu-api/users",params);
            return {count,users};
        } catch (error) {
            throw error;
        }
    },

    getUserDetail:async (userId:number)=>{
        try {
            const data=await FetchDataService.GET("/bu-api/users/"+userId);
            return data;
        } catch (error) {
            throw error;
        }
    },

    
}

export default UserService;