import React from "react";
import { Link } from "react-router-dom";

export function CustomerNavbar({ handleLogout }) {
    return (
        <>
            <Link to="/" data-testid="home-link">Home</Link>
            <Link to="/products" data-testid="products-link">Products</Link>
            <Link to="/orders" data-testid="orders-link">Orders</Link>
            <Link to="/cart" data-testid="cart-link">Cart</Link>
            <button data-testid="logout" onClick={handleLogout}>Logout</button>
        </>
    );
}