import React from "react";
import { Link } from "react-router-dom";

export function GuestNavbar({ handleLinkClick }) {
    return (
        <ul className="navbar-list" data-testid="navbar-container">
            <li className="navbar-list-item">
                <Link to="/" data-testid="home-link" onClick={event => handleLinkClick(event, '/')}>Home</Link>
            </li>
            <li className="navbar-list-item">
                <Link to="/products" data-testid="products-link" onClick={event => handleLinkClick(event, '/products')}>Products</Link>
            </li>
            <li className="navbar-list-item">
                <Link to="/cart" data-testid="cart-link" onClick={event => handleLinkClick(event, '/cart')}>Cart</Link>
            </li>
            <li className="navbar-list-item">
                <Link to="/login" data-testid="login-link" onClick={event => handleLinkClick(event, '/login')}>Login</Link>
            </li>
            <li className="navbar-list-item">
                <Link to="/register" data-testid="register-link" onClick={event => handleLinkClick(event, '/register')}>Register</Link>
            </li>
        </ul>
    );
}
