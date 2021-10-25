import React, {ChangeEventHandler} from "react";
import {InputType, SizeType, StatusType} from "../../global.types";

export interface TextInputProps extends React.PropsWithChildren<any> {
    status?: StatusType;
    type?: InputType;
    value?: string;
    placeholder?: string;
    size?: SizeType,
    onChange?: ChangeEventHandler<HTMLInputElement>;
}
