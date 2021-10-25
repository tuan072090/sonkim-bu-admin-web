import {SizeType} from "../../global.types";

export type SwitchButtonTypes = {
    label?:string,
    value?:boolean,
    onChange?:(value:boolean) => void,
    size?: SizeType,
    className?:string
}
