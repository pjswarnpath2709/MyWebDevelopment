import { RequestFormConfig } from '../constants/configs';
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
