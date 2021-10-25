import React, {ReactElement} from "react";

export type CardProps = {
    className?:string
}

export interface CardTypeComponent extends React.FC<CardProps>{
    Image:React.FC<any>
    Title:React.FC<any>
    Body:React.FC<any>
}
