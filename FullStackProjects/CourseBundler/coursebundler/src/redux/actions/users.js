import {
  RequestCredentialsConfig,
  RequestFormConfig,
  RequestJsonConfig,
} from '../constants/configs';
import { server } from '../store';
import axios from 'axios';

export const login = (email, password) => async dispatch => {
  try {
    dispatch({ type: 'loginRequest' });
    const { data } = await axios.post(
      `${server}/login`,
      { email, password },
      RequestJsonConfig
    );
    dispatch({ type: 'loginSuccess', payload: data });
  } catch (err) {
    dispatch({ type: 'loginFail', payload: err.response.data.message });
  }
};
export const loadUser = () => async dispatch => {
  try {
    dispatch({ type: 'loadUserRequest' });
    const { data } = await axios.get(`${server}/me`, RequestCredentialsConfig);
    dispatch({ type: 'loadUserSuccess', payload: data.user });
  } catch (err) {
    dispatch({ type: 'loadUserFail', payload: err.response.data.message });
  }
};
export const logout = () => async dispatch => {
  try {
    dispatch({ type: 'logoutRequest' });
    const { data } = await axios.get(
      `${server}/logout`,
      RequestCredentialsConfig
    );
    dispatch({ type: 'logoutSuccess', payload: data.message });
  } catch (err) {
    dispatch({ type: 'logoutFail', payload: err.response.data.message });
  }
};

export const register = formData => async dispatch => {
  try {
    dispatch({ type: 'registerRequest' });
    const { data } = await axios.post(
      `${server}/register`,
      formData,
      RequestFormConfig
    );
    dispatch({ type: 'registerSuccess', payload: data });
  } catch (err) {
    dispatch({ type: 'registerFail', payload: err.response.data.message });
  }
};

export const buySubscription = () => async dispatch => {
  try {
    dispatch({ type: 'buySubscriptionRequest' });
    const { data } = await axios.get(
      `${server}/subscribe`,
      RequestCredentialsConfig
    );
    dispatch({ type: 'buySubscriptionSuccess', payload: data });
  } catch (err) {
    dispatch({
      type: 'buySubscriptionFail',
      payload: err.response.data.message,
    });
  }
};
