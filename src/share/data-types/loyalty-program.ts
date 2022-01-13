import { ThumbnailType } from "./image";

export interface LoyaltyProgramDataRow{
    id: number,
    name:string,
    avatar:ThumbnailType,
    business_unit:BusinessUnitType,
    levels:LevelType[],
    point_system:PointSystemType,
}

export interface BusinessUnitType{
    name:string,
    logo:ThumbnailType
}

export interface LevelType{
    name:string,
}

export interface PointSystemType{
    name:string,
    icon:ThumbnailType
}