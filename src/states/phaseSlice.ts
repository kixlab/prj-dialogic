import { createSlice } from '@reduxjs/toolkit';
import { rootState } from './state';

const phaseSlice = createSlice({
  name: 'phase',
  initialState: rootState.phase,
  reducers: {
    initPhase: (state) => {
      state.phase = 0;
    },
    nextPhase: (state) => {
      if (state.phase < 3) state.phase++;
    }
  }
})

export const { initPhase, nextPhase } = phaseSlice.actions;
export default phaseSlice.reducer;