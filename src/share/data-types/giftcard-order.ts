import {GiftCardDataRow} from './giftcard'

export interface GiftCardOrderDataRow{
    id:number,
    code:string,
    gift_card:GiftCardDataRow,
    point_history:PointHistoryType,
}

export interface PointHistoryType{
    id:number,
    point:number,
    point_before:number,
    point_after:number,
    note:string,
    type:string,
    loyalty_program:number,
}