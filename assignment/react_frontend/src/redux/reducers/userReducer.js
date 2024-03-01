



import { GET_USERS, GET_USER, DELETE_USER, MODIFY_USER } from '../actions/actionTypes';


const userReducer = (state = [], action) => {
    let newUser;
    switch (action.type) {
        case GET_USERS:
        case GET_USER:
            return action.payload;
        case DELETE_USER:
            return state.filter(user => user.id !== action.payload);
        case MODIFY_USER:
            newUser = action.payload;
            return state.map(user => user.id === newUser.id ? newUser : user);
        default:
            return state;
    }
}

export default userReducer;

