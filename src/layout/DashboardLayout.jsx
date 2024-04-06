import React from 'react';
import Navbar from "../components/navbar/Navbar";
import {Outlet} from "react-router-dom";
import "./Layout.scss";
import {useSelector} from "react-redux";

const DashboardLayout = () => {
    const {userId} = useSelector(({loginSlice}) => loginSlice);

    if (userId === 0) {
        window.location.href = "/"
    }
    return (
        <div className="layout">
            <Navbar/>
            <Outlet/>
        </div>
    );
};

export default DashboardLayout;