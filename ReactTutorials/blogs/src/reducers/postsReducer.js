export default (previousPostsState = [], action) => {
  switch (action.type) {
    case "FETCH_POSTS":
      return action.payload;
    default:
      return previousPostsState;
  }
};
