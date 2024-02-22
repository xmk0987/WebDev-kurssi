import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { addToCart } from "../../redux/actions/cart/actionCreators";

export function Product({product}) {
  const navigate= useNavigate();
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addToCart(product));
  }


  return (
    <div datatest-id={`list-item-${product.id}-container`} className="list-item-container">
      <p data-testid="name-value" className="list-item">{product.name}</p>
      <p data-testid="price-value" className="list-item">{product.price}€</p>
      <button data-testid={`inspect-${product.id}-link`} className="list-item user-inspect" onClick={() => navigate(`/products/${product.id}`)}>Inspect</button>
      <button data-testid="add" className="list-item user-inspect" onClick={handleAdd}>ADD</button>
    </div>
  );
  }