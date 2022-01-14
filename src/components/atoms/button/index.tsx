import React, {MouseEvent} from "react";
import {ButtonProps} from "./Button.types";

const Button: React.FC<ButtonProps> = ({children, onClick, color = 'primary', size = "medium", outline = false, disabled, ...props}) => {

    const _onClick = (event: MouseEvent<HTMLButtonElement>) => {

        const button = event.currentTarget;
        const circle = document.createElement("span");
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add("child");

        button.appendChild(circle)

        //  remove after 600 ms
        setTimeout(() => {
            circle.remove()
        }, 600)

        if (onClick) {
            onClick(event)
        }
    }
    //  button size
    const classButtonSize = size === "small" ? "py-1 px-3" : size === "medium" ? "py-2 px-4" : "py-4 px-6"

    //  button background
    let classButtonBg = outline ? 'bg-transparent' : "bg-" + color + "-500";
    if(disabled) classButtonBg += " opacity-70"

    //  button border
    const classOutline = `border border-${color}-500`

    //  button hover
    const classHover = `hover:bg-${color}-700 hover:text-white`

    //  text size
    const classTextSize = size === "small" ? 'text-xs' : size === "medium" ? 'text-base' : "text-xl"

    //  text color
    const classTextColor = !outline ? 'text-white' : `text-${color}-500`;

    //  ripple effect
    const rippleClass = "ripple"

    return (
        <button {...props}
                onClick={_onClick}
                className={`${classButtonBg} ${classOutline} ${rippleClass} ${classTextColor} ${classHover} ${classButtonSize} ${classTextSize} rounded-lg ${props.className}`}>
            {children}
        </button>
    )
}

export default Button
