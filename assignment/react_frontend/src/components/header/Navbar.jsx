import React, { useCallback } from "react";
import { CustomerNavbar } from "./CustomerNavbar";
import { AdminNavbar } from "./AdminNavbar";
import { GuestNavbar } from "./GuestNavbar";

import { useSelector, useDispatch } from "react-redux";

import { logout } from "../../redux/actions/auth/authActions";


export function Navbar() {
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    const handleLogout = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    return (
        <div className="navbar" data-testid="navbar-container">
            {user.role === "customer" && <CustomerNavbar handleLogout={handleLogout}/>}
            {user.role === "admin" && <AdminNavbar handleLogout={handleLogout} />}
            {user.role !== "customer" && user.role !== "admin" && <GuestNavbar />}
            <div className="inline-flex">
                <p className="navbar-list-item" >Role:&nbsp;</p>
                <div className="navbar-list-item" data-testid="profile-container"><p data-testid="role-value">{user ? user.role : 'guest'}</p></div>
            </div>
        </div>
    );
}