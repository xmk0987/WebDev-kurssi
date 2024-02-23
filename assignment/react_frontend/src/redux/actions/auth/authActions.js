
import axios from 'axios';
import { REGISTER_REQUEST, 
        REGISTER_SUCCESS, 
        REGISTER_FAILURE, 
        SUCCESS, ERROR,
        CHECK_STATUS_REQUEST, 
        CHECK_STATUS_SUCCESS, 
        CHECK_STATUS_FAILURE,
        LOGIN,
        LOGOUT, 
        LOADING
} from '../actionTypes';
import { apiURL } from '../../../config';
import { stateTypes } from '../../../tests/constants/components';

export const registerUser = (user) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
  
    try {
      const response = await axios.post(apiURL + '/register', user, {
        withCredentials: true,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status !== 201) {
        throw new Error('Failed to register user');
      }

      dispatch({ type: REGISTER_SUCCESS, payload: response.data.user });
      dispatch({ type: SUCCESS, payload: {message:"Login success", stateType: stateTypes.auth}});

    } catch (error) {
      dispatch({ type: REGISTER_FAILURE, payload: error });
      dispatch({ type: ERROR, payload: {message: error.response.data.error.email, stateType: stateTypes.auth}});
    }
  };


  export const loginUser = (user) => async (dispatch) => {  
    dispatch({ type: LOADING, payload: {message:"Loading", stateType: stateTypes.auth}});

    try {
      const response = await axios.post(apiURL + '/login', user, {
        withCredentials: true,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status !== 200) {
        throw new Error('Failed to login user');
      }

      dispatch({ type: SUCCESS, payload: {message:"Login success", stateType: stateTypes.auth}});
      dispatch({ type: LOGIN, payload: response.data.user });

    } catch (error) {
      dispatch({ type: ERROR, payload: {message:"Login failed", stateType: stateTypes.auth}});
    }
  };


  export const checkStatus = () => async (dispatch) => {
    dispatch({ type: CHECK_STATUS_REQUEST });  
    try {
      const response = await axios.get(apiURL + '/check-status', { withCredentials: true });
      console.log("in check")
      if (response.status !== 200) {
        throw new Error("Not authenticated");
      }
  
      dispatch({ type: CHECK_STATUS_SUCCESS, payload: response.data.user });
    } catch (error) {
      dispatch({ type: CHECK_STATUS_FAILURE, payload: error.message });
    }
  };
  
export const logout = () => async (dispatch) => {
  dispatch({ type: LOADING, payload: {message:"Logging out", stateType: stateTypes.auth}});

  try {
    const response = await axios.get(apiURL + '/logout', { withCredentials: true });
    if (response.status !== 200) {
      throw new Error("Failed to logout");
    }
    dispatch({ type: LOGOUT});
    dispatch({ type: SUCCESS, payload: {message:"Logout success", stateType: stateTypes.auth}});

  } catch (error) {
    dispatch({ type: CHECK_STATUS_FAILURE, payload: error.message });
  }
};
