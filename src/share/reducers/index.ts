import { combineReducers } from "redux";
import authReducer from "./auth/auth.reducer";
import modalMsgReducer from "./modal-msg/modalMsg.reducer";
import versionReducer from "./version/version.reducer";

const rootReducer=combineReducers({
    modalMsg: modalMsgReducer,
    auth:authReducer,
    version:versionReducer
})

export default rootReducer;