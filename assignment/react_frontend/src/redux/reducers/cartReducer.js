import { REMOVE_ITEM, ADD_ITEM, SET_CART } from '../actions/actionTypes';
    
const cartReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_ITEM:
            const existingProduct = state.findIndex(item => item.product.id === action.payload.id);
            if (existingProduct !== -1) {
                const updatedState = [...state];
                updatedState[existingProduct].quantity += 1;
                return updatedState;
            }

            return [...state, { product: action.payload, quantity: 1 }];
        case REMOVE_ITEM:
            const updatedState = [...state];
            const itemToDecreaseIndex = state.findIndex(item => item.product.id === action.payload.id);
            if (itemToDecreaseIndex !== -1) {
                updatedState[itemToDecreaseIndex].quantity -= 1;
                if (updatedState[itemToDecreaseIndex].quantity === 0) {
                    updatedState.splice(itemToDecreaseIndex, 1);
                }
            }
            return updatedState;
        case SET_CART:
            return action.payload;
        default:
            return state;
    }
}

export default cartReducer;

