

import { ERROR, SUCCESS, RESET} from '../actions/actionTypes';

const initialState = {
  error: false,
  message: ""
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ERROR:
        console.log("Pitäisi tulla");
        return {
            ...state,
            error: true,
            message: action.payload
        };
    case SUCCESS:
        return {
            ...state,
            error: false,
            message: action.payload
        };
    case RESET: 
    return {
        ...state,
        error: false,
        message: ""
    };
    default:
        return state;
  }
};

export default notificationReducer;