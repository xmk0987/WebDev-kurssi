import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { getProduct } from "../../redux/actions/products/productActions";
import { addToCart } from "../../redux/actions/cart/actionCreators";



export const ProductsId = () => {
  const { productId } = useParams();

  const dispatch = useDispatch();

  const products = useSelector(state => state.products);
  const user = useSelector(state => state.auth.user);
  const [product, setProduct] = useState(products.find(product => product.id === productId) || "");

  useEffect(() => {
    const fetchData = async () => {
      if (product === "") {
        const result = await getProduct(productId);
        setProduct(result);
      }
    };

    fetchData();
  }, []);

  const handleAdd = () => {
    dispatch(addToCart(product));
  }

  return (
    <div data-testid="inspect-container">
      <h1 className="page-header" data-testid="name-value">{product.name}</h1>
      <p data-testid="description-element" className="mg-bot-1">{product.description}</p>
      <p data-testid="price-element" className="mg-bot-1">{product.price}€</p>
      <button data-testid="add" className="user-inspect mg-right-05" onClick={handleAdd}>Add</button>
      {user.role === "admin" ?
      <>
        <button data-testid="delete" className="user-inspect mg-right-05">Delete</button>
        <button data-testid="modify" className="user-inspect">Modify</button>
      </> : null}
    </div>
  );
};
