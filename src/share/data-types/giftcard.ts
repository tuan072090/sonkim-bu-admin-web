import { ThumbnailType } from "./image";
import { LoyaltyProgramDataRow } from "./loyalty-program";
import { StoreDataRow } from "./store";


export interface GiftCardDataRow{
    id:number,
    title:string,
    avatar:ThumbnailType,
    cash:number,
    price:number,
    sale_price:number,
    loyalty_program:LoyaltyProgramDataRow,
    stores:StoreDataRow[]
}