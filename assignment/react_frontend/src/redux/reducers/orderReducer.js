

import { GET_ORDERS, POST_ORDERS } from '../actions/actionTypes';


    
const orderReducer = (state = [], action) => {
    switch (action.type) {
        case GET_ORDERS:
            return action.payload;
        case POST_ORDERS:
            return [...state, action.payload];
        default:
            return state;
    }
}

export default orderReducer;

