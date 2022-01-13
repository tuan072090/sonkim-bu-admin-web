import { ContactType } from "./contact";
import { ThumbnailType } from "./image";
import { LocationType } from "./location";
import { BusinessUnitType } from "./loyalty-program";

export interface StoreDataRow{
    id:number,
    name:string,
    slug:string,
    avatar:ThumbnailType,
    location:LocationType,
    business_unit:BusinessUnitType,
    contact:ContactType,
}