import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export function SingleOrder({order}) {
  const navigate = useNavigate();

  const handleOrderInspect = useCallback(() => {
    navigate(`/orders/${order.id}`)
  }, [navigate, order.id]);

  return (
    <div className="list-item-container" data-testid={`list-item-${order.id}-container`}>
      <p className="id-value" data-testid="id-value">{order.id}</p>
      <button onClick={handleOrderInspect} className="user-inspect" data-testid={`inspect-${order.id}-link`}>Inspect</button>
    </div>
  );
}