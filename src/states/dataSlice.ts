import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { rootState } from './state';


const dataSlice = createSlice({
  name: 'data',
  initialState: rootState.data,
  reducers: {
    initData: (state) => {
      state.video = null;
      state.fullVideo = null;
      state.description = 'Sample Description';
      state.magicItem = null;
    },
    updateVideo: (state, action: PayloadAction<string>) => {
      state.video = action.payload;
    },
    initVideo: (state) => {
      state.video = null;
      state.fullVideo = null;
    },
    updateFullVideo: (state, action: PayloadAction<string>) => {
      state.fullVideo = action.payload;
    },

    updateDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    initDescription: (state) => {
      state.description = 'Sample Description';
    },
    updateMagicItem: (state, action: PayloadAction<number>) => {
      state.magicItem = action.payload;
    },
    initMagicItem: (state) => {
      state.magicItem = null;
    }


  }
})

export const { updateMagicItem, initMagicItem, initData, updateVideo, updateFullVideo, initVideo, initDescription, updateDescription } = dataSlice.actions;
export default dataSlice.reducer;