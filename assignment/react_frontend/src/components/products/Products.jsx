import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../redux/actions/products/productActions";
import { Message } from "../Message";
import { Product } from "./Product";
import { AddProduct } from "./AddProduct";

export const Products = () => {
  const [add, toggleAdd] = useState(false);
  const products = useSelector(state => state.products);
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getProducts());
    }
  }, [user.role]);

  const handleToggle = useCallback(() => {
    toggleAdd(true);
  }, [toggleAdd]);

  return (
    <>
      <h1 className="page-header">Products</h1>
      <Message />
      {products.length !== 0 ? (
        products.map((product) => (
          <Product key={product.id} product={product} />
        ))
      ) : (
        <div data-testid="empty-container"></div>
      )}
      {user && user.role === "admin" && !add ? (
        <button
          className="mg-bot-2 mg-top-1 user-inspect"
          onClick={handleToggle}
          data-testid="add"
        >
          ADD
        </button>
      ) : null}
      {add && user && user.role === "admin" ? <AddProduct toggleAdd={toggleAdd} /> : null}
    </>
  );
};