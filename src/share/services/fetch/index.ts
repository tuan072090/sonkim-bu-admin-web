import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import MyError from "../error";
import LocalStorageService from "../local-storage";
import {CONFIGS} from "../../configs";

const apiUri = CONFIGS.REACT_APP_API_URI

type MethodType = "GET" | "POST" | "PUT"

class FetchData {
    private static fetchDataInstance: FetchData;
    private axiosInstance: AxiosInstance;
    private headers = {}

    public static GetInstance() {
        if (!FetchData.fetchDataInstance) {
            FetchData.fetchDataInstance = new FetchData()
        }
        return FetchData.fetchDataInstance
    }

    constructor() {
        const accessToken = LocalStorageService.GetAccessToken();
        if (accessToken && accessToken.length > 0) {
            this.headers = { Authorization: "Bearer " + accessToken }
        }

        this.axiosInstance = axios.create({
            baseURL: apiUri,
            timeout: 10000, //  10s
            headers: this.headers
        });
    }

    private handleData = (res: AxiosResponse) => {
        return res.data;
    }

    private handleError = (error: AxiosError) => {
        //  Need optimize
        const message = error.response?.data?.error?.message || "Something error"
        const status = error.response?.status || 500
        const code = error.response?.data?.error?.code || 500
        const errors = error.response?.data?.error?.errors || []

        if (status === 401 || status === 403) {
            //  logout
            this.SetAccessToken("")
            LocalStorageService.SetAccessToken("");
            LocalStorageService.SetRefreshToken("");
            LocalStorageService.SetUser(null)
        }

        throw new MyError(status, message, code, errors)
    }

    public SetAccessToken(accessToken = "") {
        this.headers = accessToken.length > 0 ? { Authorization: "Bearer " + accessToken } : {}
    }

    public GET(route: string, params = {}) {
        return this.executeRequest("GET", route, params)
    }

    public PUT(route: string, params = {}) {
        return this.executeRequest("PUT", route, params)
    }

    public POST(route: string, params = {}) {
        return this.executeRequest("POST", route, params)
    }

    private executeRequest = (method: MethodType, route: string, params = {}) => {

        switch (method) {
            case "GET":
                return this.axiosInstance.get(route, {
                    params,
                    headers: this.headers
                }).then(this.handleData).catch(this.handleError);
            case "POST":
                return this.axiosInstance.post(route, { ...params }, { headers: this.headers }).then(this.handleData).catch(this.handleError);
            case "PUT":
                return this.axiosInstance.put(route, { ...params }, { headers: this.headers }).then(this.handleData).catch(this.handleError);

            default:
                throw new MyError(400, "Unknown method")
        }
    }
}

const FetchDataService = FetchData.GetInstance();
export default FetchDataService
