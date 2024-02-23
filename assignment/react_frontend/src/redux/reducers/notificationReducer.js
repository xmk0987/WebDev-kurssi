

import { ERROR, SUCCESS, RESET, LOADING} from '../actions/actionTypes';

const initialState = {
  error: false,
  message: "",
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ERROR:
        return {
            ...state,
            error: true,
            message: action.payload.message,
            stateType: action.payload.stateType,
        };
    case SUCCESS:
        return {
            ...state,
            error: false,
            message: action.payload.message,
            stateType: action.payload.stateType,
        };
    case LOADING: 
        return {
            ...state,
            error: null,
            message: action.payload.message,
            stateType: action.payload.stateType,
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