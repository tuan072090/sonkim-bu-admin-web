import React, {memo} from "react";
import {TextInputProps} from "./TextInput.types";

const TextInput: React.FC<TextInputProps> = memo(({status = "default", size="medium", type, placeholder, ...props}) => {

    return (
        <input
            {...props}
            className={`py-2 px-3 border rounded-md focus:outline-none focus:ring-2 ${props.className || ""}`}
            placeholder={placeholder}
            type={type}
        />
    );
});

export default TextInput;
