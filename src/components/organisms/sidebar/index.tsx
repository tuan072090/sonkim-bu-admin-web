import React from "react";
import Image from "../../atoms/image";
import {Activity, Archive, Book, FilePlus, Grid, Heart, Tag, List, Menu, Settings, Users, CreditCard, FileText} from 'react-feather'
import MenuItem from "../../molecules/menu-item";
import MenuIcon from "../../molecules/menu-item/MenuIcon";
import {Routers, useLocalStorage} from "../../../share";
import {useLocation} from "react-router-dom";
import logoUri from '../../../static/logo.png'

const Sidebar = () => {
    const [toggleSidebar, setToggleSidebar] = useLocalStorage("openSidebar", "yes")
    let location = useLocation();

    const _changeToggle = () => {
        setToggleSidebar(toggleSidebar === "yes" ? "no" : "yes")
    }

    const isOpenSidebar = toggleSidebar === "yes"
    if (isOpenSidebar) {
        //  small sidebar
        return (
            <div className="flex flex-col items-center h-screen overflow-y-auto w-14 bg-white border-r border-gray-200">
                <div onClick={_changeToggle} className="p-3 cursor-pointer"><Menu size={24}/></div>

                <div className="py-3 mt-3 flex-grow">
                    <MenuIcon href={Routers.HOME.path} active={location.pathname === Routers.HOME.path}
                              icon={<Activity size={20}/>}/>
                    <MenuIcon href={Routers.ARTICLES.path} active={location.pathname === Routers.ARTICLES.path}
                              icon={<Book size={20}/>}/>
                    <MenuIcon href={Routers.LOYALTY_PROGRAMS.path} active={location.pathname === Routers.LOYALTY_PROGRAMS.path}
                              icon={<Heart size={20}/>}/>
                    <MenuIcon href={Routers.PROMOTIONS.path} active={location.pathname === Routers.PROMOTIONS.path}
                              icon={<Tag size={20}/>}/>
                    <MenuIcon href={Routers.STORES.path} active={location.pathname === Routers.STORES.path}
                              icon={<Archive size={20}/>}/>
                    <MenuIcon href={Routers.USERS.path} active={location.pathname === Routers.USERS.path}
                              icon={<Users size={20}/>}/>
                    <MenuIcon href={Routers.GIFTCARDS.path} active={location.pathname === Routers.GIFTCARDS.path}
                              icon={<CreditCard size={20}/>}/>
                    <MenuIcon href={Routers.GIFTCARD_ORDERS.path} active={location.pathname === Routers.GIFTCARD_ORDERS.path}
                              icon={<FileText size={20}/>}/>
                </div>

                <div className="flex-shrink-0 border-t border-gray-200">
                    <MenuIcon href={"/settings"} icon={<Settings size={20}/>}/>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-screen overflow-y-auto w-72 bg-white border-r border-gray-200">

            <div className="flex-shrink-0 flex items-center justify-between h-14 w-full">
                <Image className="w-24 mx-2" src={logoUri}/>

                <div onClick={_changeToggle} className="p-3 cursor-pointer"><Menu size={24}/></div>
            </div>

            <div className="py-3 mt-3 flex-grow">
                <MenuItem href={Routers.HOME.path} active={location.pathname === Routers.HOME.path} text="Dashboard"
                          icon={<Activity size={20}/>}/>

                <MenuItem href={Routers.ARTICLES.path} active={location.pathname === Routers.ARTICLES.path} text="Articles"
                          icon={<Book size={20}/>}/>

                <MenuItem href={Routers.LOYALTY_PROGRAMS.path} active={location.pathname === Routers.LOYALTY_PROGRAMS.path}
                          text="Loyalty Programs" icon={<Heart size={20}/>}/>

                <MenuItem href={Routers.PROMOTIONS.path} active={location.pathname === Routers.PROMOTIONS.path} text="Promotions"
                          icon={<Tag size={20}/>}>
                    <MenuItem.DropdownBox>
                        <MenuItem href={Routers.PROMOTIONS.path} text="Thêm mới" icon={<FilePlus size={20}/>}/>

                        <MenuItem href={Routers.PROMOTIONS.path} text="Danh sách" icon={<List size={20}/>}/>
                    </MenuItem.DropdownBox>
                </MenuItem>

                <MenuItem href={Routers.STORES.path} active={location.pathname === Routers.STORES.path} text="Stores"
                          icon={<Archive size={20}/>}/>


            </div>

            <div className="flex-shrink-0 border-t border-gray-200">
                <MenuItem href="/settings" text="Cấu hình" icon={<Settings size={20}/>}/>
            </div>
        </div>
    )
}

export default Sidebar
