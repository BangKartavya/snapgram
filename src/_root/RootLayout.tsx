import React from 'react';
import Topbar from "@/components/shared/Topbar.tsx";
import LeftSidebar from "@/components/shared/LeftSidebar.tsx";
import {Outlet} from "react-router-dom";
import Bottombar from "@/components/shared/Bottombar.tsx";

const RootLayout = () => {
    return (
        <div className="w-full md:flex">
            <Topbar/>
            <LeftSidebar/>

            <section className="flex flex-1 h-full">
                <Outlet/>
            </section>
            <Bottombar/>
        </div>
    )
};

export default RootLayout;