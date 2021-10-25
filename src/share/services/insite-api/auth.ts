import FetchDataService from "../fetch";

const AuthService = {

    login: async (username: string, password: string) => {
        try {
            const { jwt, user } = await FetchDataService.POST("/auth/local", {
                identifier: username,
                password: password
            });

            return { jwt, user };
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
