import React from "react";
import { Link } from "react-router-dom";

export function GuestNavbar() {
    return (
        <>
            <Link to="/" data-testid="home-link">Home</Link>
            <Link to="/products" data-testid="products-link">Products</Link>
            <Link to="/cart" data-testid="cart-link">Cart</Link>
            <Link to="/login" data-testid="login-link">Login</Link>
            <Link to="/register" data-testid="register-link">Register</Link>
        </>
    );
}