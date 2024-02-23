import React from "react";
import { useNavigate } from "react-router-dom";

export function SingleOrder({order}) {
  const navigate = useNavigate();
  return (
    <div className="list-item-container" data-testid={`list-item-${order.id}-container`}>
      <p className="id-value" data-testid="id-value">{order.id}</p>
      <button onClick={() => navigate(`/orders/${order.id}`)} className="user-inspect" data-testid={`inspect-${order.id}-link`}>Inspect</button>
    </div>
  );
}
