import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { rootState } from './state';
import { Selection } from '@/pages/task/gen/utils';

const userDataSlice = createSlice({
  name: 'userData',
  initialState: rootState.userData,
  reducers: {
    initUserData: (state) => {
      state.script = null;
      state.fullScript = null;
      state.selections = [];
      state.targets = [];
      state.scenario = {
        tutee: 1,
        context: '',
        scenario: '',
      };
      state.rubric = null;
      state.reasons = ['', ''];
    },
    updateScript: (state, action: PayloadAction<string>) => {
      state.script = action.payload;
    },
    updateFullScript: (state, action: PayloadAction<string>) => {
      state.fullScript = action.payload;
    },
    updateSelections: (state, action: PayloadAction<Selection[]>) => {
      state.selections = action.payload;
    },
    updateScenario: (state, action: PayloadAction<{ tutee: number, context: string, scenario: string }>) => {
      state.scenario = action.payload;
    },
    updateRubric: (state, action: PayloadAction<string>) => {
      state.rubric = action.payload;
    },
    updateTargets: (state, action: PayloadAction<number[]>) => {
      state.targets = action.payload;
    },
    updateReasons: (state, action: PayloadAction<{ idx: number, reason: string }>) => {
      const { idx, reason } = action.payload;
      state.reasons[idx] = reason;
    }
  }
})

export const { updateReasons, initUserData, updateScript, updateFullScript, updateSelections, updateScenario, updateRubric, updateTargets } = userDataSlice.actions;
export default userDataSlice.reducer;