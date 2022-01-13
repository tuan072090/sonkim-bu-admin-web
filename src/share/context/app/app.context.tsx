import React, { createContext, useReducer } from "react";
import FetchDataService from "../../services/fetch";
import LocalStorageService from "../../services/local-storage";
import { AppActionType, AppStateType } from "./app.types";

const UPDATE_VERSION = 'UPDATE_VERSION'
const UPDATE_ACCESS_TOKEN = 'UPDATE_ACCESS_TOKEN'
const UPDATE_USER = "UPDATE_USER";
const UPDATE_ERROR = "UPDATE_ERROR";
const UPDATE_MESSAGE = "UPDATE_MESSAGE";
const LOGOUT = "LOGOUT";

const appInitState: AppStateType = {
    version: "1.0.0",
    user: null,
    accessToken: null,
    dispatch: (value: any) => { }
}

const appContext = createContext(appInitState);
const { Provider } = appContext;

const reducer = (state: any, action: AppActionType) => {
    let newData = appInitState;
    const { type, data } = action;

    switch (type) {
        case UPDATE_VERSION:
            newData = { ...state, version: data };
            break;

        case UPDATE_ACCESS_TOKEN:
            FetchDataService.SetAccessToken(data);
            LocalStorageService.SetAccessToken(data);
            newData = { ...state, accessToken: data };
            break;

        case UPDATE_USER:
            LocalStorageService.SetUser(data);
            newData = { ...state, user: data };
            break;

        case UPDATE_MESSAGE:
            newData = { ...state, message: data };
            break;

        case UPDATE_ERROR:
            newData = { ...state, error: data };
            break;

        case LOGOUT:
            FetchDataService.SetAccessToken("");
            LocalStorageService.SetAccessToken("");
            LocalStorageService.SetUser(null)
            newData = { ...state, user: undefined, accessToken: "", refreshToken: "" };
            break;
        default:
            throw new Error("Unexpected action");
    }

    return newData;
}

const AppProvider = (props: React.PropsWithChildren<any>) => {
    const accessToken = LocalStorageService.GetAccessToken();
    const user = LocalStorageService.GetUser()

    const initData = {
        ...appInitState,
        user: user,
        accessToken: accessToken
    };

    const [state, dispatch] = useReducer(reducer, initData);

    return (
        <Provider value={{ ...state, dispatch }}>
            {props.children}
        </Provider>
    )
}

AppProvider.actions = { LOGOUT, UPDATE_ERROR, UPDATE_MESSAGE, UPDATE_VERSION, UPDATE_ACCESS_TOKEN, UPDATE_USER }
AppProvider.context = appContext

export default AppProvider;
