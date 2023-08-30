/*

import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";

interface StateType {
  count: number;
}

const initialState: StateType = {
  count: 0,
};

const increment = createAction("increment");
const decrement = createAction("decrement");

const rootReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(increment, (state) => {
      state.count += 1;
    })
    .addCase(decrement, (state) => {
      state.count -= 1;
    });
});

export const store = configureStore({
  reducer: {
    count: rootReducer,
  },
});


*/

import { countReducer } from "./counterSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    counterSlice: countReducer,
  },
});

export type ReduxStoreStateType = ReturnType<typeof store.getState>;
