import React, {useState, useEffect} from "react";
import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../redux/actions/orders/orderActions";
import { checkStatus } from "../../redux/actions/auth/authActions";
import { Message } from "../Message";
import { stateTypes } from "../../tests/constants/components";
import { SUCCESS } from "../../redux/actions/actionTypes";

export const OrdersId = () => {
  const { orderId } = useParams();

  const dispatch = useDispatch();
  const orders = useSelector(state => state.orders);
  const auth = useSelector(state => state.auth);

  const [order, setOrder] = useState(orders.find(order => order.id === orderId) || "");

  useEffect(() => {
    dispatch(checkStatus());
  }, []);

  useEffect(() => {
    const fetchOrder = async () => {
        if(!order) {
          try {
            const result = await getOrder(orderId, dispatch);
            setOrder(result);
          } catch (error) {
              console.error(error);
          }
        }
    }

    fetchOrder();
}, [auth.user.role]);

useEffect(() => {
  dispatch({ type: SUCCESS, payload: {message:"Order fetched", stateType: stateTypes.order}});

},[]);


  return (
    <>
      <h1 className="page-header">Order {order.id}</h1>
      <Message />
      <div data-testid="inspect-container">
          {order.items.map((item) => (
            <div key={item.product.id} className="list-item-container" data-testid={`list-item-${item.product.id}-container`}>
              <p  data-testid="name-value">{item.product.name}</p>
              <p  data-testid="quantity-value">{item.quantity}</p>
            </div>
          ))}
      </div>
    </>
  );
};

