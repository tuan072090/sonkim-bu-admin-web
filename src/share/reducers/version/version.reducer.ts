import { ActionType } from "../action.type"
import { VersionType } from "./version.type"

export const UPDATE_VERSION='UPDATE_VERSION'

const initialState:VersionType={
    version:"1.0.0",
}

const versionReducer=(state=initialState,action:ActionType)=>{
    const {type,payload}=action;
    switch(type){
        case UPDATE_VERSION:
            return {
                ...state,
                version:payload
            }
        default:
            return state;
    }
}

export default versionReducer;