import React, {useEffect, useState} from "react";
import { postProduct } from "../../redux/actions/products/productActions";
import { useDispatch, useSelector } from "react-redux";


export function AddProduct({toggleAdd}) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [desc, setDesc] = useState("");

    const dispatch = useDispatch();

    const products = useSelector(state => state.products);

    useEffect(() => {
      setName("");
      setPrice("");
      setDesc("");
    }, [products]);
  
    
    const handleAddProduct = (e) => {
      e.preventDefault();
      dispatch(postProduct({price: price, name: name, description: desc}));
    }

    const handleNameChange = (e) => setName(e.target.value)
    const handlePriceChange = (e) => setPrice(e.target.value)
    const handleDescChange = (e) => setDesc(e.target.value)

    const handleToggleAdd = () => {
      toggleAdd(false)
    }
  
    return (
      <>
        <h2>Add Product</h2>
        <form data-testid="form-container" className="add-product-form" onSubmit={handleAddProduct}>
          <input data-testid="name-input" value={name} onChange={handleNameChange} required placeholder="Product name"/>
          <input type="number" data-testid="price-input" value={price} onChange={handlePriceChange} required placeholder="Product price"/>
          <input data-testid="description-input" value={desc} onChange={handleDescChange} required placeholder="Product description"/>
          <button data-testid="submit" type="submit">Submit</button>
        </form>
        <button data-testid="cancel" className="user-inspect" onClick={handleToggleAdd}>Cancel</button>
      </>
  
    );
  }