import React, { FC } from "react";
import { MenuItemComponent } from "./menuItem.types";

const MenuIcon: MenuItemComponent = ({ href, text = "", icon = null, active = false, children }) => {
    // const [dropdown, setDropdown] = useState(true)

    const activeClass = active ? "text-primary-500 border-b border-primary-500" : ""

    return (
        <a className={`relative p-3 block hover:text-primary-500`} href={href} >
            <span className={`${activeClass} pb-1 block`}>{(icon)}</span>
        </a>
    )
}
const MenuDropDownBox: FC<any> = (props) => {

    return (
        <div className="pl-3">
            {props.children}
        </div>
    )
}
MenuIcon.DropdownBox = MenuDropDownBox

export default MenuIcon
