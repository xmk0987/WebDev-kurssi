import React, { useEffect } from "react";
import { CardItem } from "./CartItem";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Message } from "../Message";
import { postOrders } from "../../redux/actions/orders/orderActions";
import { ERROR } from "../../redux/actions/actionTypes";
import { stateTypes } from "../../tests/constants/components";

export const Cart = () => {

  const cart = useSelector(state => state.cart);
  const user = useSelector(state => state.auth.user);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if(user.role === 'admin') {
      navigate('/');
    }
  }, [user.role]);


  const buy = () =>{
    if (user && user.role === "guest") {
      dispatch({type: ERROR, payload: {message:"Authentication required", stateType: stateTypes.auth}});
      navigate('/login');
    } else {
      const cartWithoutImages = cart.map(item => {
        const { image, ...rest } = item.product;
        return { ...item, product: rest };
      });
      dispatch(postOrders(cartWithoutImages));
    }
  }

  return (
    <>
      <h1 className="page-header">Cart</h1>
      <Message />
      {cart.length === 0 ?
      <div data-testid="empty-container"></div> 
      : 
      <>
        {cart.map((item) => (
          <CardItem key={item.product.id} item={item}/>
        ))}
        <button data-testid="submit" onClick={buy}>Submit</button>
      </>

    }
    </>
  );
};

