import React from "react";
import { Link } from "react-router-dom";

export function AdminNavbar({ handleLinkClick, handleLogout }) {
    return (
        <ul className="navbar-list" data-testid="navbar-container">
            <li className="navbar-list-item">
                <Link to="/" data-testid="home-link" onClick={event => handleLinkClick(event, '/')}>Home</Link>
            </li>
            <li className="navbar-list-item">
                <Link to="/products" data-testid="products-link" onClick={event => handleLinkClick(event, '/products')}>Products</Link>
            </li>
            <li className="navbar-list-item">
                <Link to="/orders" data-testid="orders-link" onClick={event => handleLinkClick(event, '/orders')}>Orders</Link>
            </li>
            <li className="navbar-list-item">
                <Link to="/users" data-testid="users-link" onClick={event => handleLinkClick(event, '/users')}>Users</Link>
            </li>
            <li className="navbar-list-item">
                <Link to="/" data-testid="logout" onClick={() => handleLogout()}>Logout</Link>
            </li>
        </ul>
    );
}
