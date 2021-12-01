import FetchDataService from "../../services/fetch";
import LocalStorageService from "../../services/local-storage";
import { ActionType } from "../action.type";
import { AuthStateType } from "./auth.type";

export const UPDATE_ACCESS_TOKEN = "UPDATE_ACCESS_TOKEN";
export const UPDATE_USER = "UPDATE_USER";
export const LOGOUT = "LOGOUT";

const initialState: AuthStateType = {
    user: LocalStorageService.GetUser(),
    accessToken: LocalStorageService.GetAccessToken(),
};

const authReducer = (state = initialState, action: ActionType) => {
    const { type, payload } = action;
    switch (type) {
        case UPDATE_ACCESS_TOKEN:
            console.log("payload access token redux: ", payload);
            FetchDataService.SetAccessToken(payload);
            LocalStorageService.SetAccessToken(payload);
            return {
                ...state,
                accessToken: payload,
            };
        case UPDATE_USER:
            console.log("payload user redux: ", payload);
            LocalStorageService.SetUser(payload);
            return {
                ...state,
                user: payload,
            };
        case LOGOUT:
            FetchDataService.SetAccessToken("");
            LocalStorageService.SetAccessToken("");
            LocalStorageService.SetRefreshToken("");
            LocalStorageService.SetUser(null);
            return {
                ...state,
                user: undefined,
                accessToken: "",
                refreshToken: "",
            };
        default:
            return state;
    }
};

export default authReducer;
