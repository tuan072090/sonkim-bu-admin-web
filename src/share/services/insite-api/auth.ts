import FetchDataService from "../fetch";

const AuthService = {

    login: async (username: string, password: string) => {
        try {
            const { access_token, user } = await FetchDataService.POST("/bu-api/login", {
                identifier: username,
                password: password
            });

            return { access_token, user };
        } catch (err) {
            throw err
        }
    },

    getProfile: async () => {
        try {
            const { data } = await FetchDataService.GET("/account/profile/me");
            return data
        } catch (err) {
            throw err
        }
    }
}
export default AuthService
