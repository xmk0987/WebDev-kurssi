import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "../../redux/actions/cart/actionCreators";
import { SUCCESS } from "../../redux/actions/actionTypes";
import { stateTypes } from "../../tests/constants/components";
import { deleteProduct } from "../../redux/actions/products/productActions";


export function Product({product}) {
  const navigate= useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(state => state.auth.user);

  const handleAdd = () => {
    dispatch(addToCart(product));
    dispatch({ type: SUCCESS, payload: {message:"Product added", stateType: stateTypes.cart}});
  }

  const productid = product.id;

  const handleDelete = () => {
    dispatch(deleteProduct(product.id));
  }

  const handleInspect = () => {
    navigate(`/products/${product.id}`)
  }

  const handleModify = () => {
    navigate(`/products/${product.id}/modify`)
  }

  return (
    <div data-testid={`list-item-${productid}-container`} className="list-item-container">
      <p data-testid="name-value" className="list-item">{product.name}</p>
      <p data-testid="price-value" className="list-item">{product.price}€</p>
      <button data-testid={`inspect-${product.id}-link`} className="list-item user-inspect" onClick={handleInspect}>Inspect</button>
      {user && user.role === 'admin' ? 
      <>
        <button data-testid="modify" className="user-inspect" onClick={handleModify}>Modify</button>
        <button data-testid="delete" className="user-inspect" onClick={handleDelete}>Delete</button>

      </>
      : <button data-testid="add" className="list-item user-inspect" onClick={handleAdd}>ADD</button>
      }
    </div>
  );
  }