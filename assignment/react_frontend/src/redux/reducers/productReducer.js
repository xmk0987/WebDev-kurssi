import { GET_PRODUCTS, POST_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from '../actions/actionTypes';
    
const productReducer = (state = [], action) => {
    let updatedProduct;
    switch (action.type) {
        case GET_PRODUCTS:
            return action.payload; 
        case POST_PRODUCT:
            return [...state, action.payload];
        case UPDATE_PRODUCT:
            updatedProduct = action.payload;
            return state.map(product => product.id === updatedProduct.id ? updatedProduct : product);
        case DELETE_PRODUCT:
            return state.filter((product) => product.id !== action.payload);
        default:
            return state;
    }
}

export default productReducer;