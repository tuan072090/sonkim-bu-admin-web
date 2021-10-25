import { Dispatch } from "react";
import { MessageType } from "../../data-types/message";
import { UserType } from "../../data-types/user";
import MyError from "../../services/error";

export type AppStateType = {
    version: string,
    user?: UserType | null,
    accessToken: string | null,
    message?: MessageType,
    error?: MyError,
    dispatch: Dispatch<AppActionType>
}

export type AppActionType = {
    data: any;
    type: string;
};
