import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { CustomerNavbar } from "./CustomerNavbar";
import { AdminNavbar } from "./AdminNavbar";
import { GuestNavbar } from "./GuestNavbar";

import { useSelector, useDispatch } from "react-redux";

import { checkStatus } from "../../redux/actions/auth/authActions";

export function Navbar() {
    const user = useSelector(state => state.auth.user);

    const [role, setRole ] = useState(user.role);

    useEffect(() => {
        setRole(user.role);
    }, [user.role]);

    const navigate = useNavigate();

    const handleLinkClick = (event, path) => {
        event.preventDefault();
        navigate(path);
    };

    const handleLogout = () => {
        console.log("Log out");
    }

    return (
        <div className="navbar" data-testid="navbar-container">
            {role === "guest" && <GuestNavbar handleLinkClick={handleLinkClick} />}
            {role === "customer" && <CustomerNavbar handleLinkClick={handleLinkClick} handleLogout={handleLogout} />}
            {role === "admin" && <AdminNavbar handleLinkClick={handleLinkClick} handleLogout={handleLogout} />}
            <div className="inline-flex">
            <p className="navbar-list-item" >Role:&nbsp;</p>
            <p className="navbar-list-item" data-testid="profile-container">{role}</p>
            </div>
        </div>
    );

}



