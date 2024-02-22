import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from '../actionTypes';

export const registerRequest = () => ({
  type: REGISTER_REQUEST,
});

export const registerSuccess = (user) => ({
  type: REGISTER_SUCCESS,
  payload: user,
});

export const registerFailure = (error) => ({
  type: REGISTER_FAILURE,
  payload: error,
});