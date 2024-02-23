import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import authReducer from "./reducers/authReducer";
import notificationReducer from "./reducers/notificationReducer";
import productReducer from "./reducers/productReducer";
import cartReducer from "./reducers/cartReducer";
import orderReducer from "./reducers/orderReducer";
import userReducer from "./reducers/userReducer";

// Redux-devtools extension library
import { composeWithDevTools } from "@redux-devtools/extension";


export const reducers = combineReducers({
  auth: authReducer,
  notification: notificationReducer,
  products: productReducer,
  cart: cartReducer,
  orders: orderReducer,
  users: userReducer
});

export default legacy_createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);
