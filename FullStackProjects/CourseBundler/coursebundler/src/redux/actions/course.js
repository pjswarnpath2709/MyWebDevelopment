import { RequestCredentialsConfig } from '../constants/configs';
import { server } from '../store';
import axios from 'axios';

export const getAllCourses =
  (category = '', keyword = '') =>
  async dispatch => {
    try {
      dispatch({ type: 'allCoursesRequest' });
      const { data } = await axios.get(
        `${server}/courses?category=${category}&keyword=${keyword}`,
        RequestCredentialsConfig
      );
      dispatch({ type: 'allCoursesSuccess', payload: data.courses });
    } catch (err) {
      dispatch({
        type: 'allCoursesFail',
        payload: err.response.data.message,
      });
    }
  };

export const getCourseLectures = id => async dispatch => {
  try {
    dispatch({ type: 'getCourseRequest' });
    const { data } = await axios.get(
      `${server}/course/${id}`,
      RequestCredentialsConfig
    );
    dispatch({ type: 'getCourseSuccess', payload: data.lectures });
  } catch (err) {
    dispatch({
      type: 'allCoursesFail',
      payload: err.response.data.message,
    });
  }
};
