import React from "react";
import { CardItem } from "./CartItem";

import { useSelector } from "react-redux";

export const Cart = () => {

  const cart = useSelector(state => state.cart);

  const buy = () =>{
    console.log(cart);
  }

  return (
    <>
      <h1 className="page-header">Cart</h1>
      {cart.length === 0 ?
      <div data-testid="empty-container"></div> 
      : 
      cart.map((item) => (
        <CardItem key={item.product.id} item={item}/>
      ))}
      <button data-testid="submit" onClick={buy}>Submit</button>
    </>
  );
};

