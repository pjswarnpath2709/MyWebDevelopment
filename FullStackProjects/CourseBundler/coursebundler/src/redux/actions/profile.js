import {
  RequestCredentialsConfig,
  RequestFormConfig,
  RequestJsonConfig,
} from '../constants/configs';
import { server } from '../store';
import axios from 'axios';

export const updateProfile = (name, email) => async dispatch => {
  try {
    dispatch({ type: 'updateProfileRequest' });
    const { data } = await axios.put(
      `${server}/updateprofile`,
      {
        name,
        email,
      },
      RequestJsonConfig
    );
    console.log('\x1b[35m', '👉👉👉 data :', data);
    dispatch({ type: 'updateProfileSuccess', payload: data.message });
  } catch (err) {
    console.error('\x1b[31m', ' 👎👎👎 :', err);
    dispatch({ type: 'updateProfileFail', payload: err.response.data.message });
  }
};

export const updateProfilePicture = formData => async dispatch => {
  try {
    dispatch({ type: 'updateProfilePictureRequest' });
    const { data } = await axios.put(
      `${server}/updateprofilepicture`,
      formData,
      RequestFormConfig
    );
    dispatch({ type: 'updateProfilePictureSuccess', payload: data.message });
  } catch (err) {
    dispatch({
      type: 'updateProfilePictureFail',
      payload: err.response.data.message,
    });
  }
};

export const changePassword = (oldPassword, newPassword) => async dispatch => {
  try {
    dispatch({ type: 'changePasswordRequest' });
    const { data } = await axios.put(
      `${server}/changepassword`,
      {
        oldPassword,
        newPassword,
      },
      RequestJsonConfig
    );
    dispatch({ type: 'changePasswordSuccess', payload: data.message });
  } catch (err) {
    dispatch({
      type: 'changePasswordFail',
      payload: err.response.data.message,
    });
  }
};

export const forgetPassword = email => async dispatch => {
  try {
    dispatch({ type: 'forgetPasswordRequest' });
    const { data } = await axios.post(
      `${server}/forgetpassword`,
      { email },
      RequestJsonConfig
    );
    dispatch({ type: 'forgetPasswordSuccess', payload: data.message });
  } catch (err) {
    dispatch({
      type: 'forgetPasswordFail',
      payload: err.response.data.message,
    });
  }
};

export const resetPassword = (token, password) => async dispatch => {
  try {
    dispatch({ type: 'resetPasswordRequest' });
    const { data } = await axios.put(
      `${server}/resetpassword/${token}`,
      { password },
      RequestJsonConfig
    );
    dispatch({ type: 'resetPasswordSuccess', payload: data.message });
  } catch (err) {
    dispatch({
      type: 'resetPasswordFail',
      payload: err.response.data.message,
    });
  }
};

export const addToPlaylist = courseId => async dispatch => {
  try {
    dispatch({ type: 'addToPlaylistRequest' });
    const { data } = await axios.post(
      `${server}/addtoplaylist`,
      {
        id: courseId,
      },
      RequestJsonConfig
    );
    dispatch({ type: 'addToPlaylistSuccess', payload: data.message });
  } catch (err) {
    dispatch({
      type: 'addToPlaylistFail',
      payload: err.response.data.message,
    });
  }
};

export const removeFromPlaylist = courseId => async dispatch => {
  try {
    dispatch({ type: 'removeFromPlaylistRequest' });
    const { data } = await axios.delete(
      `${server}/removefromplaylist?id=${courseId}`,
      RequestCredentialsConfig
    );
    dispatch({ type: 'removeFromPlaylistSuccess', payload: data.message });
  } catch (err) {
    dispatch({
      type: 'removeFromPlaylistFail',
      payload: err.response.data.message,
    });
  }
};
