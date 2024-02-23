import React, {useState, useEffect} from "react";
import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../redux/actions/orders/orderActions";
import { checkStatus } from "../../redux/actions/auth/authActions";

export const OrdersId = () => {
  const { orderId } = useParams();
  console.log(orderId);

  const dispatch = useDispatch();
  const orders = useSelector(state => state.orders);
  const auth = useSelector(state => state.auth);

  const [order, setOrder] = useState(orders.find(order => order.id === orderId) || "");

  useEffect(() => {
    
    if (orders.length === 0 && auth.user.role !== 'guest') {
      const fetchOrder = async () => {
        const result = await getOrder(orderId);
        setOrder(result);
        
      }

      fetchOrder();
    }
    
  }, [auth.user.role, orderId]);


  return (
    <>
      <h1 className="page-header">Order {order.id}</h1>
      <div data-testid="inspect-container">
        {order.items && order.items.map((item) => (
            <SingleInspectOrder key={item.product.id} item={item}/>
          ))
          } 
      </div>
    </>
  );
};


const SingleInspectOrder = ({item}) => {
  return (
    <div className="list-item-container" data-testid={`list-item-${item.product.id}-container`}>
      <p  data-testid="name-value">{item.product.name}</p>
      <p  data-testid="quantity-value">{item.quantity}</p>
    </div>
  )
}