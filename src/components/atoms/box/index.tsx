import React from "react";

const Box:React.FC<any> = ({children, className, ...props}) => {
    return (
        <div className={`bg-white rounded-lg p-4 shadow ${className || ""}`} {...props}>
            {children}
        </div>
    )
}

export default Box
