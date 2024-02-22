import React from "react";



export const OrdersId = ({ }) => {
  return (
    <>
      <h1 className="page-header">Order 1</h1>
      <div className="list-item-container" data-testid="list-item-1-container">
        <p  data-testid="name-value">Peanut Butter</p>
        <p  data-testid="quantity-value">2</p>
      </div>
    </>
  );
};
