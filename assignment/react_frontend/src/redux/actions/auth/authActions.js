
import axios from 'axios';
import { REGISTER_REQUEST, 
        REGISTER_SUCCESS, 
        REGISTER_FAILURE, 
        SUCCESS, ERROR,
        CHECK_STATUS_REQUEST, 
        CHECK_STATUS_SUCCESS, 
        CHECK_STATUS_FAILURE,
        LOGIN,
        LOGOUT
} from '../actionTypes';
import { apiURL } from '../../../config';

export const registerUser = (user) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
  
    try {
      const response = await axios.post(apiURL + '/register', user, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status !== 201) {
        throw new Error('Failed to register user');
      }
  
      dispatch({ type: REGISTER_SUCCESS, payload: response.data.user });
      dispatch({ type: SUCCESS, payload: 'Register Successful' });
    } catch (error) {
      dispatch({ type: REGISTER_FAILURE, payload: error });
      dispatch({ type: ERROR, payload: 'Register Failed' });
    }
  };


  export const loginUser = (user) => async (dispatch) => {  
    try {
      const response = await axios.post(apiURL + '/login', user, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status !== 200) {
        throw new Error('Failed to login user');
      }
  
      dispatch({ type: LOGIN, payload: response.data.user });
      dispatch({ type: SUCCESS, payload: 'Login Successful' });
    } catch (error) {
      dispatch({ type: ERROR, payload: 'Login Failed' });
    }
  };


  export const checkStatus = () => async (dispatch) => {
    dispatch({ type: CHECK_STATUS_REQUEST });  
    try {
      const response = await axios.get(apiURL + '/check-status', {
        withCredentials: true,
      });
      const user = response.data.user;
      console.log(user);
      dispatch({ type: CHECK_STATUS_SUCCESS, payload: user });
    } catch (error) {
      dispatch({ type: CHECK_STATUS_FAILURE, payload: error.message });
    }
  };
  
