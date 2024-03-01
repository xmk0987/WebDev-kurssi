import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import { deleteProduct, getProduct } from "../../redux/actions/products/productActions";
import { addToCart } from "../../redux/actions/cart/actionCreators";
import { SUCCESS } from "../../redux/actions/actionTypes";
import { stateTypes } from "../../tests/constants/components";
import { Message } from "../Message";


export const ProductsId = () => {
  const { productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector(state => state.products);
  const user = useSelector(state => state.auth.user);

  let product = products.find(product => product.id === productId);

  useEffect(() => {
    const fetchData = async () => {
      if (product === "") {
        const result = await getProduct(productId);
        product = result;
      }
    };

    fetchData();
  }, []);

  const handleAdd = () => {
    dispatch(addToCart(product));
    dispatch({ type: SUCCESS, payload: {message:"Product added", stateType: stateTypes.cart}});
  }

  const handleDelete = () => {
    dispatch(deleteProduct(productId));
    navigate(-1);
  }

  const handleModify = () => {
    navigate(`/products/${product.id}/modify`)
  }

  return (
    <div data-testid="inspect-container">
      {product ? 
      <>
      <h1 className="page-header" data-testid="name-value">{product.name}</h1>
      <Message />
      <p data-testid="description-value" className="mg-bot-1">{product.description}</p>
      <p data-testid="price-value" className="mg-bot-1">{product.price}€</p>
      {user.role === "admin" ?
      <>
        <button data-testid="delete" className="user-inspect mg-right-05" onClick={handleDelete}>Delete</button>
        <button data-testid="modify" className="user-inspect" onClick={handleModify}>Modify</button>
      </> : <button data-testid="add" className="user-inspect mg-right-05" onClick={handleAdd}>Add</button>
      }</>: null}
    </div>
  );
};
