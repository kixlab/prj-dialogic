import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { rootState } from './state';

const genSlice = createSlice({
  name: 'gen',
  initialState: rootState.gen,
  reducers: {
    updateVideo: (state, action: PayloadAction<string>) => {
      state.video = action.payload;
    },
    initVideo: (state) => {
      state.video = null;
    },
  }
})

export const { updateVideo, initVideo } = genSlice.actions;
export default genSlice.reducer;