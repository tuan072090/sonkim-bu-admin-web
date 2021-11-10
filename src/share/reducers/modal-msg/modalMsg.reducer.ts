import { ActionType } from "../action.type";
import { ModalMsgType } from "./modalMsg.type";

export const UPDATE_MESSAGE='UPDATE_MESSAGE';
export const UPDATE_ERROR='UPDATE_ERROR';

const initialState:ModalMsgType={
    message:null,
    error:null,
};

const modalMsgReducer=(state=initialState,action:ActionType)=>{
    const {type,payload}=action;
    switch(type){
        case UPDATE_MESSAGE:
            return {...state,message:payload};
        case UPDATE_ERROR:
            return {...state,error:payload};
        default:
            return state;
    }
}

export default modalMsgReducer;