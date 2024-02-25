import React from "react";

export function GuestNavbar({ handleLinkClick }) {
    return (
        <>
            <a href="/" data-testid="home-link" onClick={event => handleLinkClick(event, '/')}>Home</a>
            <a href="/products" data-testid="products-link" onClick={event => handleLinkClick(event, '/products')}>Products</a>
            <a href="/cart" data-testid="cart-link" onClick={event => handleLinkClick(event, '/cart')}>Cart</a>
            <a href="/login" data-testid="login-link" onClick={event => handleLinkClick(event, '/login')}>Login</a>
            <a href="/register" data-testid="register-link" onClick={event => handleLinkClick(event, '/register')}>Register</a>
        </>
    );
}
