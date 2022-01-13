import { UserType } from "../../data-types/user";

export type AuthStateType={
    user?:UserType|null,
    accessToken:string|null,
}