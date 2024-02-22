import React, {useState} from "react";



export const ProductsIdModify = () => {
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
      <h1 className="page-header">Modify Product</h1>
      <form data-testid="form-container" className="add-product-form" onSubmit={handleAddProduct}>
        <p data-testid="id-value">fjlkdsjflksd</p>
        <input type="text" data-testid="name-input" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Product name"/>
        <input type="text" data-testid="price-input" value={price} onChange={(e) => setPrice(e.target.value)} required placeholder="Product price"/>
        <input type="number" data-testid="description-input" value={desc} onChange={(e) => setDesc(e.target.value)} required placeholder="Product description"/>
        <button data-testid="submit" type="submit">Submit</button>
      </form>
      <button data-testid="cancel">Cancel</button>
    </>

  );
};
