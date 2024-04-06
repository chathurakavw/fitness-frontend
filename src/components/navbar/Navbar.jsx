import React from 'react';
import "./Navbar.scss";
import PageRoutes from "../../constants/page-routes";
import {useNavigate} from "react-router-dom";
import logo from "../../assets/images/logo.png";

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <div className="navbar">
            <div className="navbar-left">
                <div onClick={() => navigate(`/`)}>
                    <img src={logo} alt=""/>
                </div>

                <div className="logo-name" onClick={() => navigate(`/`)}>
                    <p>STAMINA</p>
                    <p>FITNESS</p>
                </div>
            </div>
            <div className="navbar-right">
                <button className="btn-primary" onClick={() => navigate(`${PageRoutes.LOGIN}`)}>Login</button>
                <button className="btn-secondary" onClick={() => navigate(`${PageRoutes.REGISTRATION}`)}>Register</button>
            </div>
        </div>
    );
};

export default Navbar;