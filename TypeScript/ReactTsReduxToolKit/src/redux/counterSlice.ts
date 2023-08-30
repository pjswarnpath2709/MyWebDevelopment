import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CounterSliceStateType {
  count: number;
}

const initialState: CounterSliceStateType = {
  count: 0,
};

const countSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    incrementByValue: (state, action: PayloadAction<number>) => {
      state.count += action.payload;
    },
  },
});

export const { increment, decrement, incrementByValue } = countSlice.actions;
export const countReducer = countSlice.reducer;