import React from "react";

export function SingleOrder({ }) {
  return (<div className="list-item-container" data-testid="list-item-1-container">
    <p className="id-value" data-testid="id-value">1</p>
    <a href="/orders/1" className="inspect-link" data-testid="inspect-1-link">Inspect Order 1</a>
  </div>);
}
