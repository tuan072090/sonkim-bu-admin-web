import { ColorType, SizeType, StatusType } from "../../global.types";
import React from "react";

export interface ButtonProps extends React.PropsWithChildren<any> {
    onClick?: (params: any) => void,
    color?: ColorType;
    outline?: boolean;
    disabled?: boolean;
    size?: SizeType,
    status?: StatusType;

}
