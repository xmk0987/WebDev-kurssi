import React, {useCallback} from "react";
import { useDispatch, useSelector } from "react-redux";
import { decreaseFromCart, addToCart } from "../../redux/actions/cart/actionCreators";

import { stateTypes } from "../../tests/constants/components";
import { SUCCESS } from "../../redux/actions/actionTypes";

export function CardItem({item}) {
  const cart = useSelector(state => state.cart);
  const product = item.product;

  const handleAdd = useCallback((dispatch, product) => {
    dispatch(addToCart(product));
    dispatch({ type: SUCCESS, payload: {message:"Product added", stateType: stateTypes.cart}});
  }, [dispatch]);
  
  const handleDecrease = useCallback((dispatch, product, cart) => {
    if (cart.length === 1 && cart[0].quantity === 1) {
      window.localStorage.removeItem('cart');
    }
    
    dispatch(decreaseFromCart(product));
    dispatch({ type: SUCCESS, payload: {message:"Product removed", stateType: stateTypes.cart}});
  }, [dispatch, cart]);
  
  const dispatch = useDispatch();

  return (
    <div className="cart-item" data-testid={`list-item-${product.id}-container`}>
      <div className="cart-item-content">
        <p className="text-center cart-item-name" data-testid="name-value">{product.name}</p>
        <p className="text-center cart-item-price" data-testid="price-value">{product.price}€</p>
      </div>
      <div className="cart-item-quantity">
        <button className="quantity-btn" data-testid="add" onClick={() => handleAdd(dispatch, product)}>+</button>
        <p className="text-center quantity" data-testid="quantity-value">{item.quantity}</p>
        <button className="quantity-btn" data-testid="reduce" onClick={() => handleDecrease(dispatch, product, cart)}>-</button>
      </div>
    </div>
  );
}