import React from 'react';
import {Outlet} from "react-router-dom";
import "./Layout.scss";
import Navbar from "../components/navbar/Navbar";

const LoginLayout = () => {
    return (
        <div className="layout">
            <Navbar/>
            <Outlet/>
        </div>
    );
};

export default LoginLayout;