import { REGISTER_REQUEST, 
    REGISTER_SUCCESS, 
    REGISTER_FAILURE,
    CHECK_STATUS_FAILURE, 
    CHECK_STATUS_REQUEST, 
    CHECK_STATUS_SUCCESS,
    LOGIN, 
    LOGOUT 
} from '../actions/actionTypes';

const initialState = {
loading: false,
user: {
role: "guest"
},
error: null
};

const authReducer = (state = initialState, action) => {
switch (action.type) {
    case REGISTER_REQUEST:
    case CHECK_STATUS_REQUEST:
        return {
            ...state,
            loading: true,
            error: null
        };
    case REGISTER_SUCCESS:
    case CHECK_STATUS_SUCCESS:
    case LOGIN:
        return {
            ...state,
            loading: false,
            user: action.payload,
            error: false
        };
    case REGISTER_FAILURE:
    case CHECK_STATUS_FAILURE:
        return {
            ...state,
            loading: false,
            error: action.payload
        };
    case LOGOUT:
        return initialState;
    default:
        return state;
}
};

export default authReducer;