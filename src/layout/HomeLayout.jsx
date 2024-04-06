import Navbar from "../components/navbar/Navbar";
import {Outlet} from "react-router-dom";
import React from "react";

const HomeLayout = () => {
    return (
        <div className="layout">
            <Navbar/>
            <Outlet/>
        </div>
    );
};

export default HomeLayout;
