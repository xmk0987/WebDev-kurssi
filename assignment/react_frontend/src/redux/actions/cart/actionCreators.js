
import { ADD_ITEM, REMOVE_ITEM, SET_CART, RESET_CART } from "../actionTypes";

export const addToCart = (product) => (
    {type: ADD_ITEM, payload: product}
);

export const decreaseFromCart = (product) => (
    {type: REMOVE_ITEM, payload: product}
);

export const resetCart = () => (dispatch) => {
  localStorage.removeItem('cart');
  dispatch({ type: RESET_CART });
}

export const initializeCartFromLocalStorage = () => (dispatch) => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart) {
      dispatch({ type: SET_CART, payload: cart });
    }
  };