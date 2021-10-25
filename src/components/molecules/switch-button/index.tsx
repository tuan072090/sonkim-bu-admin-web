import React, {useState} from "react";
import {SwitchButtonTypes} from "./switchButton.types";

const SwitchButton: React.FC<SwitchButtonTypes> = ({label, value, onChange, size = "medium", className=""}) => {
    const [isOn, setIsOn] = useState(!!value)

    const _toggleChange = () => {
        const newValue = !isOn
        setIsOn(newValue)

        if (onChange) {
            onChange(newValue)
        }
    }

    const backgroundClass = !isOn ? "bg-gray-400" : "bg-primary-500"

    const toggleClass = !isOn ? "translate-x-0" : size === "small" ? "translate-x-4" : "translate-x-6"

    const sizeOuterClass = size === "medium" ? "w-14 h-8" : size === "large" ? "w-16 h-10" : "w-10 h-6"

    const sizeInnerClass = size === "medium" ? "w-6 h-6" : size === "large" ? "w-8 h-8" : "w-4 h-4"

    return (
        <label className={`inline-flex items-center cursor-pointer ${className}`}>
            <span className="relative">
              <span className={`${backgroundClass} ${sizeOuterClass} block rounded-full shadow-inner`}/>

              <span className={`${toggleClass} ${sizeInnerClass} transform transition-transform duration-300 absolute block m-1 bg-white rounded-full shadow inset-y-0`}>
                <input onChange={_toggleChange} type="checkbox" className="absolute opacity-0 w-0 h-0"/>
              </span>

            </span>
            {
                label && <span className="ml-3 text-sm">{label}</span>
            }

        </label>
    )
}

export default SwitchButton
