import jsonPlaceholder from "../api/jsonPlaceholder";
import lodash from "lodash";

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  // make sure that we wait for the api request to be completed or anything that is in fetchPost must be called

  await dispatch(fetchPosts());

  lodash
    .chain(getState().posts)
    .map("userId")
    .uniq()
    .forEach((userId) => dispatch(fetchUserData(userId)))
    .value();
};

//////+++++++++++++++++++++++++++++++++++++++++//////

// this is how redux-thunk works
export const fetchPosts = () => async (dispatch /*getState*/) => {
  const { data } = await jsonPlaceholder.get("/posts");
  // manually calling the dispatch function of the reduxStore
  dispatch({ type: "FETCH_POSTS", payload: data });
};

//////+++++++++++++++++++++++++++++++++++++++++//////

export const fetchUserData = (userId) => async (dispatch) => {
  const { data } = await jsonPlaceholder.get(`/users/${userId}`);
  dispatch({ type: "FETCH_USER_DATA", payload: data });
};

// export const fetchUserData = (userId) => async (dispatch) => {
//   _fetchUserData(userId, dispatch);
// };

// const _fetchUserData = lodash.memoize(async (userId, dispatch) => {
//   const { data } = await jsonPlaceholder.get(`users/${userId}`);
//   dispatch({ type: "FETCH_USER_DATA", payload: data });
// });

//////+++++++++++++++++++++++++++++++++++++++++//////
