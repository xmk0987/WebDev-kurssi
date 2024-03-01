import React from "react";
import { Link } from "react-router-dom";

export function AdminNavbar({ handleLogout }) {
    return (
        <>
            <Link to="/" data-testid="home-link">Home</Link>
            <Link to="/products" data-testid="products-link">Products</Link>
            <Link to="/orders" data-testid="orders-link">Orders</Link>
            <Link to="/users" data-testid="users-link">Users</Link>
            <button data-testid="logout" onClick={handleLogout}>Logout</button>
        </>
    );
}