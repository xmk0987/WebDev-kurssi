import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import { getProduct, updateProduct } from "../../redux/actions/products/productActions";
import { addToCart } from "../../redux/actions/cart/actionCreators";
import { SUCCESS } from "../../redux/actions/actionTypes";
import { stateTypes } from "../../tests/constants/components";



export const ProductsIdModify = () => {
  const { productId } = useParams();

  const products = useSelector(state => state.products);
  const user = useSelector(state => state.auth.user);

  const [product, setProduct] = useState(products.find(product => product.id === productId) || "");

  const [name, setName] = useState(product.name || "");
  const [price, setPrice] = useState(product.price || "");
  const [desc, setDesc] = useState(product.description || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    if (user.role === 'guest') {
      navigate('/login')
    } else if (user.role === 'customer') {
      navigate('/')
    }
  }, [user.role]);

  useEffect(() => {
    const fetchData = async () => {
      if (product === "") {
        const result = await getProduct(productId);
        setProduct(result);
      }
    };

    fetchData();
  }, []);


  const handleModifyProduct = (e) => {
    e.preventDefault();
    dispatch(updateProduct({name: name, price: price, description: desc}, productId));
    navigate(-1);
  }

  const goBack = () => {
    navigate(-1);
  }

  return (
    <>
      <h1 className="page-header">Modify Product</h1>
      <form data-testid="form-container" className="add-product-form" onSubmit={handleModifyProduct}>
        <p data-testid="id-value">{product.id}</p>
        <input type="text" data-testid="name-input" value={name} onChange={(e) => setName(e.target.value)}  placeholder={product.name}/>
        <input type="number" data-testid="price-input" value={price} onChange={(e) => setPrice(e.target.value)}  placeholder={product.price}/>
        <input type="text" data-testid="description-input" value={desc} onChange={(e) => setDesc(e.target.value)}  placeholder={product.description}/>
        <button data-testid="submit" type="submit">Submit</button>
      </form>
      <button data-testid="cancel" onClick={goBack}>Cancel</button>
    </>

  );
};
