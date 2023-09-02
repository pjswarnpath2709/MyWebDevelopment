import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: StateType = {
  loading: false,
  words: [],
  result: [],
};

const rootSlice = createSlice({
  name: "root",
  initialState: initialState,
  reducers: {
    getWordsRequest: (state) => {
      state.loading = true;
    },
    getWordsSuccess: (state, action: PayloadAction<WordType[]>) => {
      state.loading = false;
      state.words = action.payload;
    },
    getWordsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    saveResult: (state, action: PayloadAction<string[]>) => {
      state.result = action.payload;
    },
    clearState: (state) => {
      state.loading = false;
      state.error = "";
      state.words = [];
      state.result = [];
    },
  },
});
export const {
  getWordsFailure,
  getWordsRequest,
  getWordsSuccess,
  saveResult,
  clearState,
} = rootSlice.actions;
export default rootSlice.reducer;
