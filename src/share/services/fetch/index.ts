import axios, {AxiosError, AxiosInstance, AxiosResponse} from 'axios';
import MyError from "../error";
import {CONFIGS} from "../../configs";
import {store} from '../../store'
import {LogOut} from '../../reducers/auth'

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

        this.axiosInstance = axios.create({
            baseURL: apiUri,
            timeout: 10000 //  10s
        });
    }

    private handleData = (res: AxiosResponse) => {
        return res.data;
    }

    private handleError = (error: AxiosError) => {
        //  Need optimize
        const message = error.response?.data?.message || "Something error"
        const status = error.response?.status || 500
        const code = error.response?.data?.error?.code || 500
        const errors = error.response?.data?.error?.errors || []

        if (status === 401 || status === 403) {
            store.dispatch(LogOut())
            this.headers = {}
        }

        throw new MyError(status, message, code, errors)
    }

    public SetAccessToken(accessToken: string | null) {
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
        const headers = store.getState().auth.accessToken ? {Authorization: "Bearer " + store.getState().auth.accessToken} : {};

        switch (method) {
            case "GET":
                return this.axiosInstance.get(route, {
                    params,
                    headers: headers
                }).then(this.handleData).catch(this.handleError);
            case "POST":
                return this.axiosInstance.post(route, {...params}, {headers: headers}).then(this.handleData).catch(this.handleError);
            case "PUT":
                return this.axiosInstance.put(route, {...params}, {headers: headers}).then(this.handleData).catch(this.handleError);

            default:
                throw new MyError(400, "Unknown method")
        }
    }
}

const FetchDataService = FetchData.GetInstance();
export default FetchDataService
