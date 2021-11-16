import React from "react";
import Image from "../../atoms/image";
import { Archive, Bell, FilePlus, Grid, Home, List, Menu, Settings, ShoppingCart, Truck,Book } from 'react-feather'
import MenuItem from "../../molecules/menu-item";
import MenuIcon from "../../molecules/menu-item/MenuIcon";
import { Routers, useLocalStorage } from "../../../share";
import { useLocation } from "react-router-dom";
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
                <div onClick={_changeToggle} className="p-3 cursor-pointer"><Menu size={24} /></div>

                <div className="py-3 mt-3 flex-grow">
                    <MenuIcon href={Routers.HOME} active={location.pathname === Routers.HOME} icon={<Home size={20} />} />
                    {/* <MenuIcon href={Routers.NOTIFICATIONS} active={location.pathname === Routers.NOTIFICATIONS}
                        icon={<Bell size={20} />} /> */}
                    <MenuIcon href={Routers.ARTICLES} active={location.pathname === Routers.ARTICLES}
                        icon={<Book size={20} />} />
                    <MenuIcon href={Routers.CATEGORIES} active={location.pathname === Routers.CATEGORIES}
                        icon={<Grid size={20} />} />
                    <MenuIcon href={Routers.PRODUCTS} active={location.pathname === Routers.PRODUCTS}
                        icon={<Archive size={20} />} />
                    <MenuIcon href={Routers.ORDERS} active={location.pathname === Routers.ORDERS}
                        icon={<ShoppingCart size={20} />} />
                    <MenuIcon href={Routers.WAREHOUSE} active={location.pathname === Routers.WAREHOUSE}
                        icon={<Truck size={20} />} />

                </div>

                <div className="flex-shrink-0 border-t border-gray-200">
                    <MenuIcon href={"/settings"} icon={<Settings size={20} />} />
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-screen overflow-y-auto w-72 bg-white border-r border-gray-200">

            <div className="flex-shrink-0 flex items-center justify-between h-14 w-full">
                <Image className="w-24 mx-2" src={logoUri} />

                <div onClick={_changeToggle} className="p-3 cursor-pointer"><Menu size={24} /></div>
            </div>

            <div className="py-3 mt-3 flex-grow">
                <MenuItem href={Routers.HOME} active={location.pathname === Routers.HOME} text="Trang chủ" icon={<Home size={20} />} />

                <MenuItem href={Routers.NOTIFICATIONS} active={location.pathname === Routers.NOTIFICATIONS} text="Thông báo" icon={<Bell size={20} />} />

                <MenuItem href={Routers.CATEGORIES} active={location.pathname === Routers.CATEGORIES} text="Danh mục" icon={<Grid size={20} />} />

                <MenuItem href={Routers.PRODUCTS} active={location.pathname === Routers.PRODUCTS} text="Sản phẩm" icon={<Archive size={20} />}>
                    <MenuItem.DropdownBox>
                        <MenuItem href="/products/add" text="Thêm mới" icon={<FilePlus size={20} />} />

                        <MenuItem href="/products" text="Danh sách" icon={<List size={20} />} />
                    </MenuItem.DropdownBox>
                </MenuItem>

                <MenuItem href={Routers.ORDERS} active={location.pathname === Routers.ORDERS} text="Đơn hàng" icon={<ShoppingCart size={20} />} />

                <MenuItem href={Routers.WAREHOUSE} active={location.pathname === Routers.WAREHOUSE} text="Kho bãi" icon={<Truck size={20} />} />

            </div>

            <div className="flex-shrink-0 border-t border-gray-200">
                <MenuItem href="/settings" text="Cấu hình" icon={<Settings size={20} />} />
            </div>
        </div>
    )
}

export default Sidebar
