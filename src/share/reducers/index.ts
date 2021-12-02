import authReducer from "./auth";
import modalMsgReducer from "./modal-msg";
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    modalMsg: modalMsgReducer,
    auth: authReducer
})

export default rootReducer;
