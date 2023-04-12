import {
  RequestCredentialsConfig,
  RequestFormConfig,
  RequestJsonConfig,
} from '../constants/configs';
import { server } from '../store';
import axios from 'axios';

export const createCourse = formData => async dispatch => {
  try {
    dispatch({ type: 'createCourseRequest' });
    const { data } = await axios.post(
      `${server}/createcourse`,
      formData,
      RequestFormConfig
    );
    console.log('\x1b[35m', '👉👉👉 data :', data);
    dispatch({ type: 'createCourseSuccess', payload: data.message });
  } catch (err) {
    console.error('\x1b[31m', ' 👎👎👎 :', err);
    dispatch({ type: 'createCourseFail', payload: err.response.data.message });
  }
};

export const deleteCourse = courseId => async dispatch => {
  try {
    dispatch({ type: 'deleteCourseRequest' });
    const { data } = await axios.delete(
      `${server}/course/${courseId}`,
      RequestCredentialsConfig
    );
    dispatch({ type: 'deleteCourseSuccess', payload: data.message });
  } catch (err) {
    console.error('\x1b[31m', ' 👎👎👎 :', err);
    dispatch({ type: 'deleteCourseFail', payload: err.response.data.message });
  }
};

export const addLecture = (id, formData) => async dispatch => {
  try {
    dispatch({ type: 'addLectureRequest' });
    const { data } = await axios.post(
      `${server}/course/${id}`,
      formData,
      RequestFormConfig
    );
    dispatch({ type: 'addLectureSuccess', payload: data.message });
  } catch (err) {
    console.error('\x1b[31m', ' 👎👎👎 :', err);
    dispatch({ type: 'addLectureFail', payload: err.response.data.message });
  }
};

export const deleteLecture = (courseId, lectureId) => async dispatch => {
  try {
    dispatch({ type: 'deleteLectureRequest' });
    const { data } = await axios.delete(
      `${server}/lecture?courseId=${courseId}&lectureId=${lectureId}`,
      RequestCredentialsConfig
    );
    dispatch({ type: 'deleteLectureSuccess', payload: data.message });
  } catch (err) {
    dispatch({ type: 'deleteLectureFail', payload: err.response.data.message });
  }
};

export const getAllUsers = () => async dispatch => {
  try {
    dispatch({ type: 'getAllUsersRequest' });
    const { data } = await axios.get(
      `${server}/admin/users`,
      RequestCredentialsConfig
    );
    dispatch({ type: 'getAllUsersSuccess', payload: data.users });
  } catch (err) {
    dispatch({ type: 'getAllUsersFail', payload: err.response.data.message });
  }
};

export const updateUserRole = id => async dispatch => {
  try {
    dispatch({ type: 'updateUserRoleRequest' });
    const { data } = await axios.put(
      `${server}/admin/user/${id}`,
      {},
      RequestCredentialsConfig
    );
    dispatch({ type: 'updateUserRoleSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'updateUserRoleFail',
      payload: error.response.data.message,
    });
  }
};

export const deleteUser = id => async dispatch => {
  try {
    dispatch({ type: 'deleteUserRequest' });
    const { data } = await axios.delete(
      `${server}/admin/user/${id}`,
      RequestCredentialsConfig
    );
    dispatch({ type: 'deleteUserSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'deleteUserFail',
      payload: error.response.data.message,
    });
  }
};

export const getDashboardStats = () => async dispatch => {
  try {
    dispatch({ type: 'getAdminStatsRequest' });
    const { data } = await axios.get(
      `${server}/admin/stats`,
      RequestCredentialsConfig
    );
    dispatch({ type: 'getAdminStatsSuccess', payload: data });
  } catch (error) {
    dispatch({
      type: 'getAdminStatsFail',
      payload: error.response.data.message,
    });
  }
};
