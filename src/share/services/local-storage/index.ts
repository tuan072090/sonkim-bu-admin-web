import { UserType } from "../../data-types/user";

const Cookies = require('js-cookie');

class LocalStorage {
    public ACCESS_TOKEN_KEY = "accessToken";
    public REFRESH_TOKEN_KEY = "refreshToken";
    public USER = 'user'

    private refreshToken: string = "";

    public static instance: LocalStorage;
    private accessToken: string = "";
    private user: UserType | null = null


    private constructor() {
        // token
        const cookieAccessToken = Cookies.get(this.ACCESS_TOKEN_KEY);
        this.accessToken = cookieAccessToken ? cookieAccessToken : "";
        // refresh token
        const cookieRefreshToken = Cookies.get(this.REFRESH_TOKEN_KEY);
        this.refreshToken = cookieRefreshToken || "";
        // user

        const cookieUser = Cookies.get(this.USER);
        this.user = cookieUser ? JSON.parse(cookieUser) : {};
    }

    public static GetInstance(): LocalStorage {
        if (!LocalStorage.instance) {
            LocalStorage.instance = new LocalStorage()
        }
        return LocalStorage.instance
    }


    public SetAccessToken = (newAccessToken: string): string => {
        this.accessToken = newAccessToken;
        Cookies.set(this.ACCESS_TOKEN_KEY, newAccessToken, { expires: 7 })
        return this.accessToken
    }

    public GetAccessToken = (): string|null => {
        return this.accessToken
    }


    public SetRefreshToken = (newRefreshToken: string): string => {
        this.refreshToken = newRefreshToken;

        Cookies.set(this.REFRESH_TOKEN_KEY, newRefreshToken, { expires: 7 })

        return this.refreshToken
    }

    public GetRefreshToken = (): string => {
        return this.refreshToken
    }

    public SetUser = (user: UserType | null) => {
        this.user = user
        Cookies.set(this.USER, JSON.stringify(user))
        return this.user;
    }
    public GetUser = (): UserType | null => {
        return this.user
    }
}

const LocalStorageService = LocalStorage.GetInstance()

export default LocalStorageService;
