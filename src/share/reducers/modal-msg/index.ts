import {ModalMsgType} from "./modalMsg.type";
import {createSlice} from '@reduxjs/toolkit'

export const UPDATE_MESSAGE = 'UPDATE_MESSAGE';
export const UPDATE_ERROR = 'UPDATE_ERROR';

const initialState: ModalMsgType = {
    message: null,
    error: null,
};

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        UpdateMessage: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.message = action.payload
        },
        UpdateError: (state, action) => {
            state.error = action.payload
        },

    },
})

export const { UpdateMessage, UpdateError } = modalSlice.actions

export default modalSlice.reducer;
