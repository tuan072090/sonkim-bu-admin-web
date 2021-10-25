import React, {ReactElement} from "react";

export type MenuItemTypes = {
    href: string,
    active?:boolean,
    icon?: ReactElement|null,
    text?:string
}

export interface MenuItemComponent extends React.FC<MenuItemTypes>{
    DropdownBox:React.FC<any>
}
