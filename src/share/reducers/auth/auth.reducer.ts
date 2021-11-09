import FetchDataService from "../../services/fetch";
import LocalStorageService from "../../services/local-storage";
import { ActionType } from "../action.type";
import { AuthStateType } from "./auth.type";

const UPDATE_ACCESS_TOKEN='UPDATE_ACCESS_TOKEN';
const UPDATE_USER='UPDATE_USER';
const LOGOUT='LOGOUT';

const initialState:AuthStateType={
    user:null,
    accessToken:null,
}

const authReducer=(state=initialState,action:ActionType)=>{
    const {type,payload}=action;
    switch(type){
        case UPDATE_ACCESS_TOKEN:
            FetchDataService.SetAccessToken(payload);
            LocalStorageService.SetAccessToken(payload);
            return {
                ...state,
                accessToken:payload
            }
        case UPDATE_USER:
            LocalStorageService.SetUser(payload);
            return {
                ...state,
                user:payload
            }
        case LOGOUT:
            FetchDataService.SetAccessToken("");
            LocalStorageService.SetAccessToken("");
            LocalStorageService.SetUser(null);
            return {
                ...state,
                user:undefined,
                accessToken:"",
                refreshToken:""
            }
        default:
            return state;
    }
}

export default authReducer;