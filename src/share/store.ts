import { createStore } from "redux";
import rootReducer from "./reducers";
import { persistStore, persistReducer } from 'redux-persist'

import storage from 'redux-persist/lib/storage';

const persistConfig={
    key:'root',
    storage,
}

const persistedReducer=persistReducer(persistConfig,rootReducer);
const store=createStore(persistedReducer);
//@ts-ignore
const persistor=persistStore(store);
export {store,persistor};

// export default ()=>{
//     let store=createStore(persistedReducer);
//     //@ts-ignore
//     let persistor=persistStore(store);
//     return {store,persistor}
// }