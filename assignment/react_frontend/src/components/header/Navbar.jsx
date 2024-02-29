import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CustomerNavbar } from "./CustomerNavbar";
import { AdminNavbar } from "./AdminNavbar";
import { GuestNavbar } from "./GuestNavbar";

import { useSelector, useDispatch } from "react-redux";

import { checkStatus, logout } from "../../redux/actions/auth/authActions";

export function Navbar() {
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLinkClick = (event, path) => {
        event.preventDefault();
        navigate(path);
    };

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <div className="navbar" data-testid="navbar-container">
            {user.role === "customer" && <CustomerNavbar handleLinkClick={handleLinkClick} handleLogout={handleLogout} />}
            {user.role === "admin" && <AdminNavbar handleLinkClick={handleLinkClick} handleLogout={handleLogout} />}
            {user.role !== "customer" && user.role !== "admin" && <GuestNavbar handleLinkClick={handleLinkClick} />}
            <div className="inline-flex">
                <p className="navbar-list-item" >Role:&nbsp;</p>
                <div className="navbar-list-item" data-testid="profile-container"><p data-testid="role-value">{user ? user.role : 'guest'}</p></div>
            </div>
        </div>
    );

}