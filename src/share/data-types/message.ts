import { StatusType } from "./status";

export type MessageType = {
    status: StatusType,
    title: string,
    body?: string
}
