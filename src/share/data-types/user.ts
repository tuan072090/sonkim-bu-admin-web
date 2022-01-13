import { LoyaltyProgramDataRow } from "./loyalty-program"

export type UserType = {
    id: number,
    name: string
}

export type AuthResponseType = {
    session: {
        access_token: string,
    },
    data: UserType
}

export interface UserDataRow{
    id:number,
    label:string,
    point:number,
    loyalty_program:LoyaltyProgramDataRow,
    user_membership_info?:string,
    
}