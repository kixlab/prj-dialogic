import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { rootState } from "./state";

const authorSlice = createSlice({
  name: 'author',
  initialState: rootState.author,
  reducers: {
    initAuthor: (state) => {
      state.focus = null;
    },
    updateFocus: (state, action: PayloadAction<string>) => {
      state.focus = action.payload;
    },
    initFocus: (state) => {
      state.focus = null;
    }
  }
})

export const { initAuthor, updateFocus, initFocus } = authorSlice.actions;
export default authorSlice.reducer;