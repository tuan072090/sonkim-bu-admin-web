import React, {ChangeEventHandler, memo, useState} from "react";
import {SelectTypes} from "./select.types";

const Select: React.FC<SelectTypes> = memo(({className, data, onChange, value}) => {
    const [selectValue, setSelectValue] = useState<string | number>(value || "");

    const _onChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
        if (onChange) onChange(event)
        setSelectValue(event.currentTarget.value)
    }

    return (
        <div className="relative">
            <select
                value={selectValue}
                onChange={_onChange}
                className={`appearance-none rounded-md border block border-gray-400 w-full text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${className || ""}`}>
                {
                    data.map((item, key) => {
                        return (
                            <option key={key} value={item.value}>{item.label}</option>
                        )
                    })
                }
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
            </div>
        </div>
    )
})

export default Select
