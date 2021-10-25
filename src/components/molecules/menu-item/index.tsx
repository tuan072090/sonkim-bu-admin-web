import React, { FC, useState } from "react";
import { MenuItemComponent } from "./menuItem.types";
import { ChevronRight } from "react-feather";
import { useHistory } from "react-router";

const MenuItem: MenuItemComponent = ({ href, text = "", icon = null, active = false, children }) => {
    const [dropdown, setDropdown] = useState(false)
    const history = useHistory();

    const hasDropDown = !!children

    const _menuClick = () => {
        if (hasDropDown) {
            _toggleDropdown()
        } else {
            history.push(href)
            //  navigate to href
        }
    }

    const _toggleDropdown = () => {
        setDropdown(!dropdown)
    }

    //  hover
    const hoverClass = active ? "" : "hover:bg-gray-100"

    //  background
    const backgroundClass = active ? "bg-primary-50" : ""

    //  text color
    const textColorClass = active ? "text-primary-500" : "text-gray-600"

    return (
        <div className="">

            <div onClick={_menuClick}
                className={`flex p-2 relative items-center cursor-pointer ${textColorClass} ${hoverClass} ${backgroundClass}`}>
                {
                    active && <span className="absolute left-0 h-full w-1 bg-primary-500 rounded-full" />
                }
                <span className="p-2 w-12">{(icon)}</span>
                <span className="text-sm">{text}</span>

                {
                    hasDropDown && <span
                        className={!dropdown ? "absolute right-4 transform rotate-0" : "absolute right-4 transform rotate-90"}>
                        <ChevronRight size={23} />
                    </span>
                }
            </div>

            <div
                className={dropdown ? "transition duration-300 ease-in-out transform scale-y-100" : "transition duration-300 ease-in-out transform scale-y-0"}>
                {
                    dropdown && children
                }
            </div>

        </div>
    )
}

const MenuDropDownBox: FC<any> = (props) => {

    return (
        <div className="pl-3">
            {props.children}
        </div>
    )
}

MenuItem.DropdownBox = MenuDropDownBox

export default MenuItem
