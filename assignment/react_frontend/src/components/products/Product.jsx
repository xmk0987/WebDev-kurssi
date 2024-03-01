import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/cart/actionCreators";
import { SUCCESS } from "../../redux/actions/actionTypes";
import { stateTypes } from "../../tests/constants/components";
import { deleteProduct } from "../../redux/actions/products/productActions";

export function Product({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleAdd = useCallback(() => {
    dispatch(addToCart(product));
    dispatch({ type: SUCCESS, payload: { message: "Product added", stateType: stateTypes.cart } });
  }, [dispatch, product]);

  const handleDelete = useCallback(() => {
    dispatch(deleteProduct(product.id));
  }, [dispatch, product.id]);

  const handleInspect = useCallback(() => {
    navigate(`/products/${product.id}`);
  }, [navigate, product.id]);

  const handleModify = useCallback(() => {
    navigate(`/products/${product.id}/modify`);
  }, [navigate, product.id]);

  return (
    <div data-testid={`list-item-${product.id}-container`} className="list-item-container">
      <p data-testid="name-value" className="list-item">
        {product.name}
      </p>
      <p data-testid="price-value" className="list-item">
        {product.price}€
      </p>
      <button data-testid={`inspect-${product.id}-link`} className="list-item user-inspect" onClick={handleInspect}>
        Inspect
      </button>
      {user && user.role === "admin" ? (
        <>
          <button data-testid="modify" className="user-inspect" onClick={handleModify}>
            Modify
          </button>
          <button data-testid="delete" className="user-inspect" onClick={handleDelete}>
            Delete
          </button>
        </>
      ) : (
        <button data-testid="add" className="list-item user-inspect" onClick={handleAdd}>
          ADD
        </button>
      )}
    </div>
  );
}