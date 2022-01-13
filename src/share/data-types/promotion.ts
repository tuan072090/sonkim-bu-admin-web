import { ThumbnailType } from "./image";
import { LocationType } from "./location";
import { LoyaltyProgramDataRow } from "./loyalty-program";

export interface PromotionDataRow{
    id:number,
    title:string,
    description:string,
    avatar:ThumbnailType,
    cash:number,
    price?:number|null,
    loyalty_program:LoyaltyProgramDataRow,
    stores:StoreType[]
}

export interface StoreType{
    id:number,
    name:string,
    avatar:ThumbnailType,
    location:LocationType
}