import React, {useEffect} from "react";
import { SingleOrder } from "./SingleOrder";
import { getOrders } from "../../redux/actions/orders/orderActions";
import { useSelector, useDispatch } from "react-redux";
import { Message } from "../Message";
import { useNavigate } from "react-router-dom";

export const Orders = () => {

  const orders = useSelector(state => state.orders);
  const auth = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user.role !== "guest") {
      if (orders.length === 0) {
        dispatch(getOrders());
      }
    } else {
      navigate('/login')
    }
  },[auth.user.role]);

  return (
    <>
      <h1 className="page-header">Orders</h1>
      <Message />
      {orders.length === 0 ? <div data-testid="empty-container"></div>
      :
      orders.map((order) => (
        <SingleOrder key={order.id} order={order}/>
      ))}
    </>
  );
};

