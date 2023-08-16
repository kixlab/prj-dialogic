import { createSlice } from '@reduxjs/toolkit';
import { rootState } from './state';

const phaseSlice = createSlice({
  name: 'phase',
  initialState: rootState.phase,
  reducers: {
    initPhase: (state) => {
      state.phase = 0;
      state.done = false;
    },
    donePhase: (state) => {
      state.done = true;
    },
    nextPhase: (state) => {
      state.done = false;
      if (state.phase < 3) state.phase++;
    }
  }
})

export const { initPhase, nextPhase, donePhase } = phaseSlice.actions;
export default phaseSlice.reducer;