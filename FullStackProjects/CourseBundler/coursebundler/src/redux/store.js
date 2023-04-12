import { configureStore } from '@reduxjs/toolkit';
import {
  profileReducer,
  subscriptionReducer,
  userReducer,
} from './reducer/userReducer';
import { courseReducer } from './reducer/courseReducer';
import { adminReducer } from './reducer/adminReducer';

//export const server = 'https://coursebundler-e637.onrender.com/api/v1';
export const server = 'http://localhost:8080/api/v1';

const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    course: courseReducer,
    subscription: subscriptionReducer,
    admin: adminReducer,
  },
});

export default store;
