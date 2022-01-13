import {AuthStateType} from "./auth.type";
import {createSlice} from '@reduxjs/toolkit'
import FetchDataService from "../../services/fetch";

const initialState: AuthStateType = {
    user: null,
    accessToken: null
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        UpdateAccessToken: (state, action) => {
            state.accessToken = action.payload
            //  update API header
            FetchDataService.SetAccessToken(action.payload)
        },
        UpdateUser: (state, action) => {
            state.user = action.payload
        },
        LogOut: (state) => {
            state.accessToken = null
            state.user = null
            FetchDataService.SetAccessToken(null)
        }
    },
})

export const {UpdateAccessToken, UpdateUser, LogOut} = authSlice.actions

export default authSlice.reducer;
