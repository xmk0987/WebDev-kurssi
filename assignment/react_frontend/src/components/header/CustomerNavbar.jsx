import React from "react";

export function CustomerNavbar({ handleLinkClick, handleLogout }) {
    return (
        <>
            <a href="/" data-testid="home-link" onClick={event => handleLinkClick(event, '/')}>Home</a>
            <a href="/products" data-testid="products-link" onClick={event => handleLinkClick(event, '/products')}>Products</a>
            <a href="/orders" data-testid="orders-link" onClick={event => handleLinkClick(event, '/orders')}>Orders</a>
            <a href="/cart" data-testid="cart-link" onClick={event => handleLinkClick(event, '/cart')}>Cart</a>
            <a href="/" data-testid="logout" onClick={() => handleLogout()}>Logout</a>
        </>
    );
}
