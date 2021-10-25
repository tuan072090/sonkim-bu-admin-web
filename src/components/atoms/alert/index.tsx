import React from "react";
import {AlertProps} from "./alert.types";

const Alert:React.FC<AlertProps> = ({color, message}) => {

    //  background
    const backgroundClass = `bg-${color}-100`

    //  color
    const colorClass = `text-${color}-900`

    //  border color
    const borderColorClass = `border border-${color}-200`

    return (
        <div className={`py-3 px-5 text-sm rounded-md ${backgroundClass} ${colorClass} ${borderColorClass}`} role="alert">
            {message}
        </div>
    )
}

export default Alert
