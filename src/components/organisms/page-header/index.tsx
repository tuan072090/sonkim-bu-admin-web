import React, { useEffect} from "react";
import {MoreHorizontal} from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import {Image} from "../..";
import { InsideApiService, Validator} from "../../../share";
import { LOGOUT } from "../../../share/reducers/auth/auth.reducer";
import styler from "./styler.module.scss";

const PageHeader = (props: any) => {
    //@ts-ignore
    const {user}=useSelector(state=>state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user && Validator.isEmptyObj(user)) {
            InsideApiService.AuthService.getProfile()
                .then((profile) => {
                    // console.log("profile", profile);
                }).catch((err) => {
                dispatch({type: LOGOUT, payload: null});
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const _logout = () => {
        dispatch({type: LOGOUT, payload: null});
    }

    return (
        <div className="w-full px-5 h-14 flex items-center justify-between bg-white border-gray-200 border-b">
            <div className="flex">
                <h2 className="text-xl">BU-Admin Dashboard</h2>
            </div>

            <div className="flex text-sm text-gray-500 border-l border-gray-200">

                <div className="ml-3 flex items-center invisible md:visible">
                    {user && (
                        <>
                            <Image
                                className="w-8 h-8 rounded-full"
                                src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&size=400&name=${user.name}`}
                            />
                            <p className="text-base font-semibold ml-3">{user.name}</p>
                        </>
                    )}
                </div>

                <div className="ml-3 flex items-center">
                    <div className={`relative flex items-center text-left ${styler.dropdown}`}>
                        <button type="button">
                            <MoreHorizontal size={20} className="mr-3"/>
                        </button>
                        <div
                            className={`opacity-0 invisible ${styler.dropdownMenu} transition-all duration-300 transform origin-top-right -translate-y-2 scale-95`}
                        >
                            <div
                                className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                                aria-labelledby="headlessui-menu-button-1"
                                id="headlessui-menu-items-117"
                                role="menu"
                            >
                                <div className="px-3 py-3 flex items-center">
                                    {user && (
                                        <>
                                            <Image
                                                className="w-12 h-12 rounded-full"
                                                src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&size=400&name=${user.name}`}
                                            />
                                            <p className="text-base font-semibold ml-3">{user.name}</p>
                                        </>
                                    )}
                                </div>
                                <div className="py-1">
                                    <div
                                        className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
                                        role="menuitem"
                                    >
                                        Account settings
                                    </div>
                                    <div
                                        className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
                                        role="menuitem"
                                    >
                                        Support
                                    </div>
                                </div>
                                <div className="py-1">
                                    <div
                                        className="text-gray-700 cursor-pointer flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
                                        role="menuitem"
                                        onClick={_logout}
                                    >
                                        Đăng xuất
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageHeader;
