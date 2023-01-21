import { combineReducers } from "redux";
import postsReducer from "./postsReducer";
import userDataReducer from "./userDataReducer";

export default combineReducers({
  posts: postsReducer,
  users: userDataReducer,
});
