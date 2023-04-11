import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducer/userReducer';

export const server = 'https://coursebundler-e637.onrender.com/api/v1';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
