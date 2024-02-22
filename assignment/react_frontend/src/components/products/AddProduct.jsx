import React, {useState} from "react";

export function AddProduct({toggleAdd}) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [desc, setDesc] = useState("");
  
    const handleAddProduct = (e) => {
      e.preventDefault();
      setName("");
      setPrice("");
      setDesc("");
      console.log("tuele")
    }
  
    return (
      <>
        <h2>Add Product</h2>
        <form data-testid="form-container" className="add-product-form" onSubmit={handleAddProduct}>
          <input data-testid="name-input" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Product name"/>
          <input data-testid="price-input" value={price} onChange={(e) => setPrice(e.target.value)} required placeholder="Product price"/>
          <input data-testid="description-input" value={desc} onChange={(e) => setDesc(e.target.value)} required placeholder="Product description"/>
          <button data-testid="submit" type="submit">Submit</button>
        </form>
        <button data-testid="cancel" className="user-inspect" onClick={() => toggleAdd(false)}>Cancel</button>
      </>
  
    );
  }