/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import PageHeader from "../../organisms/page-header";
import Sidebar from "../../organisms/sidebar";
import {AppProvider} from "../../../share";
import LoginForm from "../../organisms/login-form";
import ErrorDialog from "../../organisms/modal/ErrorDialog";
import MessageDialog from "../../organisms/modal/MessageDialog";
import { useSelector } from "react-redux";

const Layout = (Component: React.ComponentType<any>) => function Comp(props: React.PropsWithChildren<any>) {
    //@ts-ignore
    const {user} = useSelector(state=>state.auth)
    console.log('user ne',user);
    if (!user) {
        return (
            <div className="p-5 w-full flex justify-center items-center">
                <LoginForm/>

                <ErrorDialog/>

                <MessageDialog/>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex">
            <div className="flex-shrink-0">
                <Sidebar/>
            </div>
            <div className="relative flex flex-col items-center flex-grow max-h-screen overflow-y-auto">
                <div className="sticky top-0 w-full z-40">
                    <PageHeader {...props} />
                </div>

                <div className="container my-5 max-w-screen-xl ">
                    <Component {...props} />
                </div>
            </div>

            <ErrorDialog/>

            <MessageDialog/>
        </div>
    )
}


export default Layout
