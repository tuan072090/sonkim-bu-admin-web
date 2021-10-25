import React, { FC } from "react";
import { CardTypeComponent } from "./card.types";
import Image from "../../atoms/image";

const Card: CardTypeComponent = ({ className = "", children }) => {

    return (
        <div className={`shadow-lg border-gray-800 rounded-lg bg-white relative p-4 ${className}`}>
            {children}
        </div>
    )
}

const CardImage: FC<any> = (props) => {
    return (
        <Image className="w-full rounded-lg mb-4" {...props} />
    )
}

const CardTitle: FC<any> = (props) => {
    return (
        <h4 className="mb-4 text-xl" {...props}>{props.children}</h4>
    )
}

const CardBody: FC<any> = (props) => {
    return (
        <div className="text-sm" {...props}>
            {props.children}
        </div>
    )
}

Card.Image = CardImage
Card.Title = CardTitle
Card.Body = CardBody

export default Card
