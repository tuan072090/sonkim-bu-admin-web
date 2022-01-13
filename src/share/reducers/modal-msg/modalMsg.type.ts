import { MessageType } from "../../data-types/message";
import MyError from "../../services/error";

export type ModalMsgType={
    message:MessageType | null,
    error:MyError | null
}