import React, { useEffect } from "react";
import { Routes, Route } from 'react-router-dom';

import { Home } from '../components/Home.jsx';
import { NotFound } from '../components/NotFound.jsx';
import { UsersIdModify } from '../components/users/UsersIdModify.jsx';
import { UsersId } from '../components/users/UsersId.jsx';
import { Users } from '../components/users/Users.jsx';
import { ProductsIdModify } from '../components/products/ProductsIdModify.jsx';
import { ProductsId } from '../components/products/ProductsId.jsx';
import { Products } from '../components/products/Products.jsx';
import { OrdersId } from '../components/orders/OrdersId.jsx';
import { Orders } from '../components/orders/Orders.jsx';
import { Cart } from '../components/cart/Cart.jsx';
import { Login } from '../components/users/Login.jsx';
import { Register } from "../components/users/Register.jsx";


export function ShopRoutes() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/orders/:orderId" element={<OrdersId />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:productId" element={<ProductsId />} />
      <Route path="/products/:productId/modify" element={<ProductsIdModify />} />
      <Route path="/users" element={<Users />} />
      <Route path="/users/:userId" element={<UsersId />} />
      <Route path="/users/:userId/modify" element={<UsersIdModify />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}