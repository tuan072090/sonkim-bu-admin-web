import {ChangeEvent} from "react";

type OptionType = {
    value: string|number,
    label: string
}
export type SelectTypes = {
    className?:string,
    data: OptionType[],
    value?: string|number,
    onChange?: (event:ChangeEvent<HTMLSelectElement>) => void
}
