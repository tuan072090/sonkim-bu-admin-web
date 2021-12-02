import rootReducer from "./reducers";
import {configureStore} from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import FetchDataService from "./services/fetch"; // defaults to localStorage for web


//  redux persist
const persistedReducer = persistReducer({
    key: 'root',
    storage,
    blacklist:[]
}, rootReducer)

export const store = configureStore({
    reducer: persistedReducer
});
export const persistor = persistStore(store, null, () => {
    FetchDataService.SetAccessToken(store.getState().auth.accessToken)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
