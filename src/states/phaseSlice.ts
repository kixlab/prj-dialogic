import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { rootState } from './state';

const phaseSlice = createSlice({
  name: 'phase',
  initialState: rootState.phase,
  reducers: {
    initPhase: (state) => {
      state.phase = 0;
      state.next = false;
      state.done = false;
    },
    donePhase: (state) => {
      state.done = true;
      state.next = false;
    },
    nextPhase: (state) => {
      state.done = false;
      if (state.phase < 3) state.phase++;
    },
    doneTask: (state) => {
      state.next = true;
    },
    initTask: (state) => {
      state.next = false;
    },
    updateMagic: (state, action: PayloadAction<boolean>) => {
      state.magic = action.payload
    }
  }
})

export const { initPhase, nextPhase, donePhase, doneTask, initTask, updateMagic } = phaseSlice.actions;
export default phaseSlice.reducer;