import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decreaseFromCart, addToCart } from "../../redux/actions/cart/actionCreators";




export function CardItem({item}) {
  const cart = useSelector(state => state.cart);
  const product = item.product;

  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addToCart(product));
  }

  const handleDecrease = () => {
    if (cart.length === 1 && cart[0].quantity === 1) {
      window.localStorage.removeItem('cart');
    }
    
    dispatch(decreaseFromCart(product));
  }
  
  return (<div className="cart-item" data-testid={`list-item-${5}-container`}>
    <div className="cart-item-content">
      <p className="text-center cart-item-name" data-testid="name-value">{product.name}</p>
      <p className="text-center cart-item-price" data-testid="price-value">{product.price}€</p>
    </div>
    <div className="cart-item-quantity">
      <button className="quantity-btn" data-testid="add" onClick={handleAdd}>+</button>
      <p className="text-center quantity" data-testid="quantity-value">{item.quantity}</p>
      <button className="quantity-btn" data-testid="reduce" onClick={handleDecrease}>-</button>
    </div>
  </div>);
}
