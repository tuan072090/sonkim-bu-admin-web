import React from "react";

export type TableBodyType = {
    data: any
    structure: any,
    isLoading: boolean

}

export type TableType = {
    data: any,
    structure: any,
    params: any,
    getState: any
    title?: string,
    count: number,
    isLoading: boolean
    itemsPerPage: number, pageNumber: number,
    itemsPerPageOptions?: number[],
    handleChange: (params: any) => void,
    handleChangeParams: (fieldName?: any, value?: any, additionParams?: any) => void,
    handleChangeItemsPerPage: (res: number) => void
}

export type StructureItem = {
    label: string;
    key: string;
    render?: () => void;
    format?: (value: any) => void
    filter?: any
};

export type Structure = {
    structure: StructureItem[];
    onChange?: (response: any, callBack: any) => void;
    defaultPageNumber?: number;
    itemsPerPageOptions?: number[],
    title?: string,
};

export type TableFilterType = {
    structure: StructureItem[];
    params: any,
    handleChangeParams: (fieldName: any, value: any, additionParams?: any) => void,
}

export const FilterTypes = {
    optionsSelect: "options-select",
    asyncSelect: "async-select",
    textInput: "text-input",
    timeInput: "time-input",
    timeRangeInput: "time-range-input",
}