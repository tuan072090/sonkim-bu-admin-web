import { MessageType } from "../data-types/message"
import { UserType } from "../data-types/user"
import MyError from "../services/error"

export type ActionType={
    payload: any,
    type:string
}