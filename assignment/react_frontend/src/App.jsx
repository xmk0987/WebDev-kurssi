import React, {useEffect} from "react";

import { ShopRoutes } from "./Routes/shopRoutes.jsx";

import { dataTestIds } from "./tests/constants/components.js";

import { Navbar } from './components/header/Navbar';
import { checkStatus } from "./redux/actions/auth/authActions.js";
import './styles/app.css'

import { useDispatch, useSelector } from "react-redux";
import { initializeCartFromLocalStorage } from "./redux/actions/cart/actionCreators.js";
import { useNavigate } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector(state => state.cart);
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(checkStatus());
  }, []);

  useEffect(() => {
    dispatch(initializeCartFromLocalStorage());
  }, [auth.user.role])

  useEffect(() => {
    if (cart.length !== 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  return (
    <div data-testid={dataTestIds.app} className="store-container">
      <header>
        <Navbar     />
      </header>
      <main className="main-container" data-testid="main-container">
        <ShopRoutes />
      </main>
      <footer>
        <p>Copyright &copy; 2024</p>
      </footer>
    </div>
  );
};

export default App;

  