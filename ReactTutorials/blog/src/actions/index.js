import jsonPlaceHolder from "../apis/jsonPlaceholder";

export const fetchPosts = () => async (dispatch) => {
  try {
    const response = await jsonPlaceHolder.get("/posts");
    dispatch({
      type: "FETCH_POSTS",
      payload: response.data,
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const fetchUser = (userId) => async (dispatch) => {
  try {
    const response = await jsonPlaceHolder.get(`/users/${userId}`);
    dispatch({
      type: "FETCH_USER",
      payload: response.data,
    });
  } catch (err) {
    console.error(err.message);
  }
};
