import axios from "axios";
import { apiURL } from "../../../config";
import { SUCCESS, ERROR, GET_USERS, DELETE_USER, LOADING, MODIFY_USER } from "../actionTypes";
import { stateTypes } from "../../../tests/constants/components";



export const getUsers  = () => async (dispatch) =>  {
    dispatch({ type: LOADING, payload: {message:"Fetching users", stateType: stateTypes.user}});

    try {
        const response = await axios.get(apiURL + '/users', {
            withCredentials: true,
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
        });

        console.log(response.data);

        if (response.status !== 200) {
            throw new Error('Failed to get users');
        }

        dispatch({ type: SUCCESS, payload: {message:"Users fetched", stateType: stateTypes.user}});
        dispatch({ type: GET_USERS, payload: response.data });
    } catch (error) {
        dispatch({ type: ERROR, payload: {message:"Can't get users", stateType: stateTypes.user}});
    }
}

export const getUser  = async (id) =>  {
    dispatch({ type: LOADING, payload: {message:"Fetching user", stateType: stateTypes.user}});

    try {
        const response = await axios.get(apiURL + '/users/' + id, {
            withCredentials: true,
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
        });

        if (response.status !== 200) {
            throw new Error('Failed to get user');
        }

        dispatch({ type: SUCCESS, payload: {message:"User fetched", stateType: stateTypes.user}});

        return response.data;
    } catch (error) {
        console.error(error);
    }
}


export const deleteUser = (id) => async (dispatch) => {
    dispatch({ type: LOADING, payload: {message:"Deleting user", stateType: stateTypes.user}});

    try {
        const response = await axios.delete(apiURL + '/users/' + id, {
            withCredentials: true,
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
        });

        if (response.status !== 200) {
            throw new Error('Failed to delete user');
        }

        dispatch({ type: DELETE_USER, payload: id });
        dispatch({ type: SUCCESS, payload: {message:"User deleted", stateType: stateTypes.user}});

    } catch (error) {
        dispatch({ type: ERROR, payload: {message:"Can't delete user", stateType: stateTypes.product}});
    }
}

export const modifyUser = (id, role) => async (dispatch) => {
    dispatch({ type: LOADING, payload: {message:"Modifying user", stateType: stateTypes.user}});

    try {
        const response = await axios.put(apiURL + '/users/' + id, {role},{
            withCredentials: true,
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
        });

        if (response.status !== 200) {
            throw new Error('Failed to modify user');
        }

        dispatch({ type: MODIFY_USER, payload: response.data});
        dispatch({ type: SUCCESS, payload: {message:"User modified", stateType: stateTypes.user}});

    } catch (error) {
        dispatch({ type: ERROR, payload: {message:"Can't modify user", stateType: stateTypes.product}});
    }
}

