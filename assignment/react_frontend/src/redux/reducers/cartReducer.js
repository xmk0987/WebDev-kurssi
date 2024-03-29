import { REMOVE_ITEM, ADD_ITEM, SET_CART, RESET_CART } from '../actions/actionTypes';

const cartReducer = (state = [], action) => {
    let updatedState;
    let existingProductIndex;
    let itemToDecreaseIndex;

    switch (action.type) {
        case ADD_ITEM:
            existingProductIndex = state.findIndex(item => item.product.id === action.payload.id);
            if (existingProductIndex !== -1) {
                updatedState = [...state]; 
                updatedState[existingProductIndex].quantity += 1;
                return updatedState;
            }

            return [...state, { product: action.payload, quantity: 1 }];
        case REMOVE_ITEM:
            updatedState = [...state];
            itemToDecreaseIndex = state.findIndex(item => item.product.id === action.payload.id);
            if (itemToDecreaseIndex !== -1) {
                updatedState[itemToDecreaseIndex].quantity -= 1;
                if (updatedState[itemToDecreaseIndex].quantity === 0) {
                    updatedState.splice(itemToDecreaseIndex, 1);
                }
            }
            return updatedState;
        case SET_CART:
            return action.payload;
        case RESET_CART: 
            return [];
        default:
            return state;
    }
}

export default cartReducer;