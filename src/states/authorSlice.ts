import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { rootState } from "./state";

const authorSlice = createSlice({
  name: 'author',
  initialState: rootState.author,
  reducers: {
    updateFocus: (state, action: PayloadAction<string>) => {
      state.focus = action.payload;
    },
    initFocus: (state) => {
      state.focus = null;
    }
  }
})

export const { updateFocus, initFocus } = authorSlice.actions;
export default authorSlice.reducer;