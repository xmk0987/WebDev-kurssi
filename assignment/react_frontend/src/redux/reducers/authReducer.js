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
        return {
            ...state,
            loading: true,
            error:null
        };
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
                error: false
            };
        case REGISTER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
            case CHECK_STATUS_REQUEST:
                return {
                  ...state,
                  loading: true,
                  error: null,
                };
            case CHECK_STATUS_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    user: action.payload,
                };
            case CHECK_STATUS_FAILURE:
                return {
                    ...state,
                    loading: false,
                    error: action.payload,
                };
            case LOGIN:
                return {
                    ...state,
                    loading: false,
                    error: null,
                    user: action.payload
                }
            case LOGOUT:
                return initialState;
        default:
            return state;
    }
};

export default authReducer;